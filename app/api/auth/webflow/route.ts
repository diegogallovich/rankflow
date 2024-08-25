import { NextResponse } from "next/server";
import { WebflowClient } from "webflow-api";
import crypto from "crypto";

const CLIENT_ID = process.env.WF_CLIENT_ID!;
const REDIRECT_URI = `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/webflow/callback`;

export async function GET() {
  const state = crypto.randomBytes(16).toString("hex");

  const authorizeUrl = WebflowClient.authorizeURL({
    state,
    scope: [
      "sites:read",
      "sites:write",
      "pages:read",
      "pages:write",
      "cms:read",
      "cms:write",
      "authorized_user:read"
    ],
    clientId: CLIENT_ID,
    redirectUri: REDIRECT_URI,
  });

  return NextResponse.redirect(authorizeUrl);
}
