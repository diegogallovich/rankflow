import { NextRequest, NextResponse } from "next/server";

const CLIENT_ID = process.env.WF_CLIENT_ID!;
const CLIENT_SECRET = process.env.WF_CLIENT_SECRET!;
const REDIRECT_URI = `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/webflow/callback`;

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.redirect(
      "/error?message=No authorization code received",
    );
  }

  try {
    // Exchange the authorization code for an access token
    const tokenResponse = await fetch(
      "https://api.webflow.com/oauth/access_token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
          code: code,
          grant_type: "authorization_code",
          redirect_uri: REDIRECT_URI,
        }),
      },
    );

    if (!tokenResponse.ok) {
      throw new Error("Failed to obtain access token");
    }

    const tokenData = await tokenResponse.json();

    // Fetch user data
    const userResponse = await fetch(
      "https://api.webflow.com/v2/token/authorized_by",
      {
        headers: {
          Authorization: `Bearer ${tokenData.access_token}`,
        },
      },
    );

    if (!userResponse.ok) {
      throw new Error("Failed to fetch user data");
    }

    const userData = await userResponse.json();

    // Store the access token in a secure HTTP-only cookie
    const response = NextResponse.redirect("/auth");
    response.cookies.set("webflow_access_token", tokenData.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: tokenData.expires_in,
    });

    // Store user data in a cookie for the auth page
    response.cookies.set("webflow_user_data", JSON.stringify(userData), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 5, // 5 minutes
    });

    return response;
  } catch (error) {
    console.error("Error in OAuth process:", error);
    return NextResponse.redirect(`/error?message=Authentication failed`);
  }
}
