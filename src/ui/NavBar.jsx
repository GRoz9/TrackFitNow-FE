"use client";
import React, { useState } from "react";
import Link from "next/link";
import MobileMenuButton from "@/components/navbarComponents/MobileMenuButton";
// import LogIn from "../components/navbar/LogIn";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Profile } from "@/components/profileComponents/Profile";

export const NavBar = () => {
  return (
    <nav className="bg-sky-500">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between mb-16">
          {/* Nav Bar */}
          <div className="flex flex-1 items-center">
            <Link href="/dashboard">
              <Button variant="text" sx={{ color: `primary.contrastText` }}>
                TrackFitNow!
              </Button>
            </Link>
            <div className="hidden sm:flex sm:w-full sm:justify-center">
              {/* Nav Links */}
              <div className="flex space-x-4 cursor-pointer">
                <Stack spacing={2} direction="row">
                  <Link href="/dashboard">
                    <Button
                      variant="text"
                      sx={{ color: `primary.contrastText` }}
                    >
                      Dashboard
                    </Button>
                  </Link>
                  <Link href="/weight">
                    <Button
                      variant="text"
                      sx={{ color: `primary.contrastText` }}
                    >
                      Weight
                    </Button>
                  </Link>
                  <Link href="/dashboard">
                    <Button
                      variant="text"
                      sx={{ color: `primary.contrastText` }}
                    >
                      Calories
                    </Button>
                  </Link>
                </Stack>
              </div>
            </div>
          </div>
          {/* Account Future */}
          <div className="relative">
            <Profile />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
