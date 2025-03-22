"use client";
import React from "react";
import { Box, Paper, Container, Divider } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import { Header } from "./Header";
import { Social } from "./Social";
import { BackButton } from "./BackButton";

export const CardWrapper = ({ children, ...props }) => {
  const handleSubmit = () => {
    console.log("Submit!");
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={10} sx={{ mt: 8, p: 4 }}>
        <Header title={props.headerTitle} subTitle={props.headerLabel} />
        {children}
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{
            mt: 4,
          }}
        >
          {(props.showSocial || props.showSignUpLink) && (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {props.showSocial && (
                <>
                  <Divider>or</Divider>
                  <Social
                    icon={GoogleIcon}
                    label="Sign in with Google"
                    provider="google"
                  />
                  <Social
                    icon={GitHubIcon}
                    label="Sign in with Github"
                    provider="github"
                  />
                </>
              )}
              {props.showSignUpLink && (
                <BackButton
                  label={props.backButtonLabel}
                  href={props.backButtonHref}
                  sx={{ mt: props.showSocial ? 2 : 4 }} // Adds spacing only when social is missing
                />
              )}
            </Box>
          )}
        </Box>
      </Paper>
    </Container>
  );
};
