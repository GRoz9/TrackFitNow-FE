import { NextResponse } from "next/server";

export async function UpdateProteinAPI(proteinAmount) {
  try {
    const response = await fetch(
      "http://localhost:8080/api/logs/updateProtein",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ proteinAmount }),
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
