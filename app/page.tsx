"use client";

// UI
import { Text } from "../components/text";
import { Button } from "../components/button";
import {
  LockClosedIcon,
  FolderIcon,
  ChartBarIcon,
} from "@heroicons/react/20/solid";
import { useState } from "react";
import { LoginForm } from "../components/composed/login-form";
import { SignUpForm } from "../components/composed/sign-up-form";

export default function Home() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");

  const openAuth = (mode: "login" | "signup") => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  const closeAuth = () => {
    setIsAuthOpen(false);
  };

  const handleAuthSuccess = () => {
    closeAuth();
    // Add any additional logic for successful authentication
  };

  return (
    <div className="flex flex-col items-center text-center">
      <h1 className="mb-6 text-6xl font-bold leading-tight text-zinc-900 dark:text-white">
        Welcome to RankFlow.
        <br />
        Your AI Copilot for Webflow.
      </h1>
      <Text className="mb-8 max-w-md text-xl text-zinc-700 dark:text-zinc-300">
        RankFlow connects with your Webflow CMS to give you AI superpowers that
        will help your content rank higher in search engine results.
      </Text>
      <div className="mb-8 w-full max-w-3xl">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="flex flex-col items-center text-center">
            <LockClosedIcon className="mb-4 h-8 w-8 text-blue-500" />
            <Text className="text-sm font-bold text-zinc-900 dark:text-zinc-50">
              Step 1:
            </Text>
            <Text className="text-sm">Connect your site</Text>
          </div>
          <div className="flex flex-col items-center text-center">
            <FolderIcon className="mb-4 h-8 w-8 text-blue-500" />
            <Text className="text-sm font-bold text-zinc-900 dark:text-zinc-50">
              Step 2:
            </Text>
            <Text className="text-sm">Sync collections</Text>
          </div>
          <div className="flex flex-col items-center text-center">
            <ChartBarIcon className="mb-4 h-8 w-8 text-blue-500" />
            <Text className="text-sm font-bold text-zinc-900 dark:text-zinc-50">
              Step 3:
            </Text>
            <Text className="text-sm">Start AIditing</Text>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <Button color="blue" onClick={() => openAuth("signup")}>
          Get Started for Free
        </Button>
        <Button plain onClick={() => openAuth("login")}>
          Log in
        </Button>
      </div>

      {authMode === "login" && (
        <LoginForm
          isOpen={isAuthOpen}
          onClose={closeAuth}
          onSuccess={handleAuthSuccess}
        />
      )}
      {authMode === "signup" && (
        <SignUpForm
          isOpen={isAuthOpen}
          onClose={closeAuth}
          onSuccess={handleAuthSuccess}
        />
      )}
    </div>
  );
}
