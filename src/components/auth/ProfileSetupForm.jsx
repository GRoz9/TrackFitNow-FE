"use client";
import React, { useState, useEffect } from "react";
import {
  TextField,
  MenuItem,
  Button,
  Box,
  CircularProgress,
  Tooltip,
  IconButton,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProfileSchema } from "../../../schema/profileSchema";
import { CardWrapper } from "./CardWrapper";
import { useRouter, useSearchParams } from "next/navigation"; // Get email from URL
import { FormError } from "../formComponents/FormError";
import { FormSuccess } from "../formComponents/FormSuccess";

export const ProfileSetupForm = () => {
  const apiUrl = process.env.BACKEND_API_URL;
  const router = useRouter();
  const searchParams = useSearchParams();

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const activityInfo = {
    Sedentary: "Little or no exercise",
    Light: "Exercise 1-3 days per week",
    Moderate: "Exercise 3-5 days per week",
    Active: "Daily exercise or intense exercise 3-4 times/week",
    "Very Active": "Hard exercise or a physical job",
  };

  const form = useForm({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      age: "",
      height: "",
      weight: "",
      gender: "",
      activityLevel: "",
      fitnessGoal: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = async (data) => {
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");
    const token = localStorage.getItem("token");
    console.log("Token: ", token);

    try {
      const response = await fetch(
        "http://localhost:8080/api/auth/profile-setup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token
          },
          body: JSON.stringify(data),
        }
      );

      const result = await response.text();
      if (!response.ok) throw new Error(result.error || "Profile setup failed");

      setSuccessMessage("Profile updated! Redirecting to dashboard...");
      setTimeout(() => router.push("/dashboard"), 1500);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <CardWrapper
      headerTitle="Sign up"
      headerLabel="Create an account"
      backButtonLabel="Already have an account?"
    >
      <Box sx={{ mt: 4 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Age"
            type="number"
            {...register("age")}
            error={!!errors.age}
            helperText={errors.age?.message}
            fullWidth
            disabled={loading}
            sx={{ mb: 2 }}
            inputProps={{
              inputMode: "numeric",
              pattern: "[0-9]",
              min: 13,
            }}
          />

          <TextField
            label="Height (cm)"
            type="number"
            {...register("height")}
            error={!!errors.height}
            helperText={errors.height?.message}
            fullWidth
            disabled={loading}
            sx={{ mb: 2 }}
            inputProps={{
              inputMode: "decimal",
              step: "0.1",
              min: 50,
              max: 250,
            }}
          />

          <TextField
            label="Weight (kg)"
            type="number"
            {...register("weight")}
            error={!!errors.weight}
            helperText={errors.weight?.message}
            fullWidth
            disabled={loading}
            sx={{ mb: 2 }}
            inputProps={{
              inputMode: "decimal",
              step: "0.1",
              min: 30,
              max: 300,
            }}
          />
          <TextField
            select
            label="Gender"
            {...register("gender")}
            error={!!errors.gender}
            helperText={errors.gender?.message}
            fullWidth
            disabled={loading}
            sx={{ mb: 2 }}
          >
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
          </TextField>
          <TextField
            select
            label="Activity Level"
            {...register("activityLevel")}
            error={!!errors.activityLevel}
            helperText={errors.activityLevel?.message}
            fullWidth
            disabled={loading}
            sx={{ mb: 2 }}
          >
            {Object.keys(activityInfo).map((value, i) => (
              <MenuItem value={value} key={i}>
                <div>
                  <strong>{value}</strong>
                  <p className="text-sm text-gray-500 whitespace-break-spaces">
                    {activityInfo[value]}
                  </p>
                </div>
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Fitness Goal"
            {...register("fitnessGoal")}
            error={!!errors.fitnessGoal}
            helperText={errors.fitnessGoal?.message}
            fullWidth
            disabled={loading}
            sx={{ mb: 2 }}
          >
            <MenuItem value="Lose Weight">Lose Weight</MenuItem>
            <MenuItem value="Gain Muscle">Gain Muscle</MenuItem>
            <MenuItem value="Stay Fit">Stay Fit</MenuItem>
          </TextField>
          <FormError message={errorMessage} />
          <FormSuccess message={successMessage} />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Save Profile"}
          </Button>
        </form>
      </Box>
    </CardWrapper>
  );
};
