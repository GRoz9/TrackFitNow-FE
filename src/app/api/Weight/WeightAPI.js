import { NextResponse } from "next/server";

export async function UpdateWeightAPI(weight) {
  try {
    const response = await fetch(
      "http://localhost:8080/api/logs/updateWeight",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ weight }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update protein amount");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error updating protein:", error);
    throw error;
  }
}
