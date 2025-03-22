"use client";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@mui/material";

export const Social = (props) => {
  const handleOAuthSignIn = async () => {
    try {
      ("use server");
      await signIn(props.provider);
    } catch (error) {
      console.error("Login error:", error);
      document.cookie = "next-auth.state=; Max-Age=0; path=/;"; // Clear state cookie
      window.location.reload();
    }
  };
  return (
    <Button
      fullWidth
      variant="outlined"
      onClick={handleOAuthSignIn}
      startIcon={<props.icon />}
    >
      {props.label}
    </Button>
  );
};
