"use client";
import { useUser } from "../context/UserContext";
import { WeightTracker } from "../../../components/dashboardComponents/WeightTrackerDash";

import { ProteinTracker } from "../../../components/dashboardComponents/ProteinTrackerDash";
import { CalorieTracker } from "../../../components/dashboardComponents/CalorieTrackerDash";
import Skeleton from "@mui/material/Skeleton";

export default function Home() {
  const { user, loading, error } = useUser();
  // const weeklyLogs = createOrGetDailyLog();
  // useEffect(() => {
  //   const createOrGetDailyLog = async () => {
  //     try {
  //       const response = await fetch("http://localhost:8080/api/logs/daily", {
  //         method: "POST",
  //         credentials: "include", // cookie-based auth
  //       });

  //       if (!response.ok) {
  //         console.warn("Failed to create/get daily log", response.status);
  //       }
  //     } catch (err) {
  //       console.error("Error creating/getting daily log:", err);
  //     }
  //   };

  //   if (user) {
  //     createOrGetDailyLog();
  //   }
  // }, [user]);

  // const createOrGetDailyLog = async () => {
  //   try {
  //     const response = await fetch(
  //       "http://localhost:8080/api/logs/weeklyLogs",
  //       {
  //         method: "GET",
  //         credentials: "include", // cookie-based auth
  //       }
  //     );

  //     console.log("weeklyLog Result: ", response);

  //     if (!response.ok) {
  //       console.warn("Failed to create/get daily log", response.status);
  //     }
  //   } catch (err) {
  //     console.error("Error creating/getting daily log:", err);
  //   }
  // };

  // const weeklyLogs = createOrGetDailyLog();

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="flex max-lg:flex-col gap-8">
          <div className="lg:w-2/4 w-full">
            <Skeleton variant="rectangular" width="100%" height="100%" />
          </div>
          <div className="flex flex-col gap-8 lg:w-2/4 max-lg:w-full w-fit">
            <Skeleton variant="rectangular" width="100%" height={200} />
            <Skeleton variant="rectangular" width="100%" height={200} />
          </div>
        </div>
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
        <div className="lg:w-2/4 w-full">
          <WeightTracker
            profile={user?.UserProfile}
            weeklyLogs={user?.WeeklyLogs}
          />
        </div>
        {/* <div className="lg:w-2/4 w-full">
          <WeightTrackerTest
            profile={user?.UserProfile}
            weeklyLogs={user?.WeeklyLogs}
          />
        </div> */}

        <div className="flex flex-col gap-8 lg:w-2/4 max-lg:w-full w-fit">
          <CalorieTracker
            maintenance={user?.UserProfile?.maintenance}
            weightLossLevel={user?.UserProfile?.weightLossLevel}
            weeklyLogs={user?.WeeklyLogs.slice(0, 7)} // optional: if you want to pass full logs
          />

          <ProteinTracker
            proteinTarget={user?.UserProfile?.protein}
            weeklyLogs={user?.WeeklyLogs} // optional: same here
          />
        </div>
      </div>
    </div>
  );
}
