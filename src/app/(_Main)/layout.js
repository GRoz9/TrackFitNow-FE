import { Geist, Geist_Mono } from "next/font/google";
import React from "react";

import { UserProvider } from "./context/UserContext";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../../ui/Theme";

import NavBar from "../../ui/NavBar";
import { Footer } from "../../ui/Footer";
import BottomNav from "../../ui/BottomNav";

export const metadata = {
  title: "Dashboard - MyApp",
  description: "Track your progress on the dashboard.",
};

export default function DashboardLayout({ children }) {
  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        <UserProvider>
          <nav>
            <NavBar />
          </nav>
          {children}
          <footer>
            <Footer />
          </footer>
          <footer className="sm:hidden">
            <BottomNav />
          </footer>
        </UserProvider>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
