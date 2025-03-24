"use client";
import React, { useState } from "react";
import {
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Box,
  CircularProgress,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "../../../schema/registerSchema";
import { CardWrapper } from "./CardWrapper";
import { FormError } from "../formComponents/FormError";
import { FormSuccess } from "../formComponents/FormSuccess";
import { useRouter } from "next/navigation";

export const RegisterForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false); // Track loading state
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const form = useForm({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
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

    try {
      const response = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, rememberMe }),
        credentials: "include",
      });

      const text = await response.text();

      if (!response.ok) {
        throw new Error(result.error || "Registration failed");
      }

      setSuccessMessage("Registration successful! Redirecting...");
      setTimeout(() => {
        router.push(
          `/auth/profile-setup?email=${encodeURIComponent(data.email)}`
        );
      }, 1500);
    } catch (error) {
      console.error("Error in registration:", error.message);
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRememberChange = () => {
    setRememberMe(!rememberMe);
  };

  return (
    <CardWrapper
      headerTitle="Sign up"
      headerLabel="Create an account"
      backButtonLabel="Already have an account?"
      backButtonHref="/auth/login"
      // showSocial // Not working currently
      showSignUpLink
    >
      <Box sx={{ mt: 4 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Name"
            placeholder="Your Name"
            autoComplete="name"
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name?.message}
            fullWidth
            autoFocus // Keep autoFocus here
            disabled={loading}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Email"
            placeholder="your@email.com"
            autoComplete="email"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
            fullWidth
            disabled={loading} // Remove autoFocus here
            sx={{ mb: 2 }}
          />
          <TextField
            label="Password"
            type="password"
            placeholder="••••••"
            autoComplete="new-password"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
            fullWidth
            disabled={loading}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Confirm Password"
            type="password"
            placeholder="••••••"
            {...register("confirmPassword")}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
            fullWidth
            disabled={loading}
            sx={{ mb: 2 }}
          />
          <FormControlLabel
            control={
              <Checkbox
                value="remember"
                color="primary"
                disabled={loading}
                onChange={handleRememberChange}
              />
            }
            label="Remember me"
          />
          <FormError message={errorMessage} />
          <FormSuccess message={successMessage} />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} sx={{ color: "white" }} />
            ) : (
              "Create an account"
            )}
          </Button>
        </form>
      </Box>
    </CardWrapper>
  );
};
