export async function POST(req) {
  try {
    const body = await req.json();

    const response = await fetch("http://localhost:8080/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Backend Error:", errorText);
      return new Response(errorText, { status: response.status });
    }

    const data = await response.json();
    console.log("Backend Response:", data); // Debugging
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error("API Route Error:", error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
