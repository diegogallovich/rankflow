import React from "react";
import { redirect } from "next/navigation";
import { account, databases } from "../appwrite";
import { ID } from "appwrite";
import { cookies } from "next/headers";

async function handleSubmit(formData: FormData) {
  "use server";

  const cookieStore = cookies();
  const webflowUserDataCookie = cookieStore.get("webflow_user_data");
  const webflowToken = cookieStore.get("webflow_access_token")?.value;

  if (!webflowUserDataCookie || !webflowToken) {
    throw new Error("Webflow user data or token not found");
  }

  const webflowUser = JSON.parse(webflowUserDataCookie.value);
  const password = formData.get("password") as string;

  try {
    // Create user in Appwrite
    const user = await account.create(
      ID.unique(),
      webflowUser.email,
      password,
      webflowUser.name,
    );

    // Store Webflow token and user info in Appwrite database
    await databases.createDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      "webflow_tokens",
      ID.unique(),
      {
        user_id: user.$id,
        access_token: webflowToken,
        webflow_user_id: webflowUser._id,
      },
    );

    // Log in the user
    await account.createSession(webflowUser.email, password);

    // Redirect to dashboard or home page
    redirect("/dashboard");
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}

export default async function AuthPage() {
  const cookieStore = cookies();
  const webflowUserDataCookie = cookieStore.get("webflow_user_data");

  if (!webflowUserDataCookie) {
    return <div>Error: Webflow user data not found</div>;
  }

  const webflowUser = JSON.parse(webflowUserDataCookie.value);

  return (
    <div>
      <h1>Set Your Password</h1>
      <p>
        Welcome, {webflowUser.name}! Please set a password for your account.
      </p>
      <form action={handleSubmit}>
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          required
        />
        <button type="submit">Create Account</button>
      </form>
    </div>
  );
}
