"use client";
import { WeightTracker } from "../../../components/dashboardComponents/WeightTracker";
import { ProteinTracker } from "../../../components/dashboardComponents/ProteinTracker";
import { CalorieTracker } from "../../../components/dashboardComponents/CalorieTracker";
import { useUser } from "../context/UserContext";

export default function Home() {
  const { user, loading, error } = useUser();
  return (
    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div className="flex max-lg:flex-col gap-8">
        <div className="lg:w-2/4 w-full">
          <WeightTracker />
        </div>
        <div className="flex flex-col gap-8 lg:w-2/4 max-lg:w-full w-fit">
          <CalorieTracker />
          <ProteinTracker proteinTarget={user?.protein} />
        </div>
      </div>
    </div>
  );
}
