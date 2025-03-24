"use client";
import React, { useState } from "react";
import { signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation"; // Get email from URL

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
import { LoginSchema } from "../../../schema/loginSchema";
import { CardWrapper } from "./CardWrapper";
import { FormError } from "../formComponents/FormError";
import { FormSuccess } from "../formComponents/FormSuccess";

export const LoginForm = () => {
  // const apiUrl = process.env.BACKEND_API_URL;
  const [loading, setLoading] = useState(false); // Track loading state
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
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
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, rememberMe }),
        credentials: "include",
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Login failed");
      }

      setSuccessMessage("Login successful! Redirecting...");
      setTimeout(() => router.push("/dashboard"), 1500);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRememberChange = () => {
    setRememberMe(!rememberMe);
  };

  const handleGoogleSignIn = async () => {
    try {
      ("use server");
      await signIn("google");
    } catch (error) {
      console.error("Login error:", error);
      document.cookie = "next-auth.state=; Max-Age=0; path=/;"; // Clear state cookie
      window.location.reload();
    }
  };

  const handleGoogleSignOut = async () => {
    try {
      ("use server");
      await signOut("google");
    } catch (error) {
      console.error("Login error:", error);
      document.cookie = "next-auth.state=; Max-Age=0; path=/;"; // Clear state cookie
      window.location.reload();
    }
  };

  // const handleCredentialsSignIn = async (e) => {
  //   e.preventDefault();
  //   const formData = new FormData(e.target);
  //   const email = formData.get("email");
  //   const password = formData.get("password");

  //   const result = await signIn("credentials", {
  //     redirect: false,
  //     email,
  //     password,
  //   });

  //   if (result.error) {
  //     setError(result.error);
  //   } else {
  //     window.location.href = "/dashboard";
  //   }
  // };

  return (
    <CardWrapper
      headerTitle="Sign in"
      headerLabel="Welcome Back"
      backButtonLabel="Don't have an account?"
      backButtonHref="/auth/register"
      // showSocial // Not working currently
      showSignUpLink
    >
      <Box sx={{ mt: 4 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Email"
            placeholder="your@email.com"
            autoComplete="email"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
            fullWidth
            autoFocus
            disabled={loading} // Disable field when loading
            sx={{ mb: 2 }}
          />
          <TextField
            label="Password"
            type="password"
            placeholder="••••••"
            autoComplete="current-password"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
            fullWidth
            disabled={loading} // Disable field when loading
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
            disabled={loading} // Disable button when loading
            startIcon={loading ? <CircularProgress size={20} /> : null} // Show spinner
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
          <Button onClick={handleGoogleSignIn}>Google Test</Button>
          <Button onClick={handleGoogleSignOut}>Sign Out</Button>
        </form>
      </Box>
    </CardWrapper>
  );
};
