"use client";
import React, { useState } from "react";
import Link from "next/link";
import MobileMenuButton from "@/components/navbarComponents/MobileMenuButton";
// import LogIn from "../components/navbar/LogIn";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

export const NavBar = () => {
  //   const [userSignedIn, setUserSignedIn] = useState(false);
  return (
    <nav className="bg-sky-500">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between mb-16">
          {/* Mobile/Hamburger Menu */}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button - Temporarly disabled to test out bottom nav instead of hamburger nav*/}
            {/* <MobileMenuButton
            currentRoute={currentRoute}
            isToggleNavBar={toggleNavBar}
            funcMobileMenu={mobileMenuToggle}
            /> */}
          </div>
          {/* Nav Bar */}
          <div className="flex flex-1 items-center">
            <Link href="/dashboard">
              <Button variant="text" sx={{ color: `primary.contrastText` }}>
                TrackFitNow!
              </Button>
            </Link>
            <div className="hidden sm:flex sm:w-full sm:justify-center">
              {/* Nav Links */}
              {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
              <div className="flex space-x-4 cursor-pointer">
                {/* <NavBarLinks name="Dashboard" />
                <NavBarLinks name="Weight" />
                <NavBarLinks name="Calories" />
                <NavBarLinks name="Water" /> */}
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
                {/* <NavLinks
                  class="rounded-md px-3 py-2 text-sm font-medium"
                  currentRoute={currentRoute}
                  name="Discounts"
                  nameRounte="/Discounts"
                /> */}
              </div>
            </div>
          </div>
          {/* Login/SignUp Future */}
          <div className="relative">
            <Button variant="text" sx={{ color: `primary.contrastText` }}>
              Log In
            </Button>

            {/* {usersignedIn ? (
              <SignedIn
                isProfileToggled={toggleProfileMenu}
                ProfileDropDown={profileDropDown}
              />
            ) : (
              <LogIn />
            )} */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
