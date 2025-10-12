"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userProfileResponse = await fetch(
          "http://localhost:8080/api/user/me",
          {
            method: "GET",
            credentials: "include",
          }
        );

        const weeklyLogsResponse = await fetch(
          "http://localhost:8080/api/logs/weeklyLogs",
          {
            method: "GET",
            credentials: "include", // cookie-based auth
          }
        );

        if (!userProfileResponse.ok)
          throw new Error("Failed to fetch user data");

        const userProfileData = await userProfileResponse.json();
        const weeklyLogs = await weeklyLogsResponse.json();

        setUser({ UserProfile: userProfileData, WeeklyLogs: weeklyLogs });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return (
    <UserContext.Provider value={{ user, loading, error }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
