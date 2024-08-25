import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const token = request.cookies.get("webflow_access_token")?.value;

  if (!token) {
    return NextResponse.json(
      { error: "No access token found" },
      { status: 401 },
    );
  }

  try {
    const response = await fetch(
      "https://api.webflow.com/v2/token/authorized_by",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error("Failed to fetch user data");
    }

    const userData = await response.json();
    return NextResponse.json(userData);
  } catch (error) {
    console.error("Error fetching Webflow user data:", error);
    return NextResponse.json(
      { error: "Failed to fetch user data" },
      { status: 500 },
    );
  }
}
