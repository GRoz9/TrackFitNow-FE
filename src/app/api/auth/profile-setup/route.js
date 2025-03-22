import { NextResponse } from "next/server";

export async function POST(req) {
  // const token = localStorage.getItem("token");
  try {
    const profileData = await req.json();

    const response = await fetch("http://localhost:8080/api/profile/setup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profileData),
    });

    if (!response.ok) {
      const errorText = await response.text(); // Read as text instead of JSON
      console.error("Backend Error:", errorText);

      return NextResponse.json(
        { error: errorText || "Profile setup failed" },
        { status: response.status }
      );
    }

    return NextResponse.json(
      { message: "Profile setup completed!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in API route:", error);
    return NextResponse.json(
      { error: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
