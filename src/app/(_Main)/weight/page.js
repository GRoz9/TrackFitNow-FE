"use client";
import React from "react";
import { useUser } from "../context/UserContext";
import Skeleton from "@mui/material/Skeleton";

export default function Home() {
  const { user, loading, error } = useUser();

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <Skeleton variant="rectangular" height={500} />
      </div>
    );
  }

  if (error) {
    return <p>Error: {error}</p>;
  }
  console.log("All User Data: ", user);

  return (
    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div className="flex max-lg:flex-col gap-8">
        <main>Weight</main>
      </div>
    </div>
  );
}
