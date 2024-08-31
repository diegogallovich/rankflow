"use client";

// UI
import { Text } from "../components/text";
import { Button } from "../components/button";
import {
  LockClosedIcon,
  FolderIcon,
  ChartBarIcon,
  RocketLaunchIcon,
  LightBulbIcon,
  ChartPieIcon,
} from "@heroicons/react/20/solid";
import { useState, useEffect } from "react"; // Add useEffect here
import { LoginForm } from "../components/composed/login-form";
import { SignUpForm } from "../components/composed/sign-up-form";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/hooks/useAuth";

export default function Home() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const router = useRouter();
  const { login, signup, isAuthenticated } = useAuth();
  const [formState, setFormState] = useState<{ message?: string }>({});

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/overview");
    }
  }, [isAuthenticated, router]);

  const openAuth = (mode: "login" | "signup") => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  const closeAuth = () => {
    setIsAuthOpen(false);
  };

  const handleAuthSuccess = async (email: string, password: string) => {
    try {
      if (authMode === "signup") {
        await signup(email, password, email); // Assuming the name is the same as email for now
        closeAuth(); // Close the auth modal
        console.log("Signup successful, redirecting to onboarding");
        router.push("/onboarding");
      } else {
        await login(email, password);
        closeAuth(); // Close the auth modal
        console.log("Login successful, redirecting to overview");
        router.push("/overview");
      }
    } catch (error) {
      console.error("Authentication error:", error);
      setFormState({
        message: "An error occurred during authentication. Please try again.",
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center px-4 py-8 text-center">
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
      <div className="mb-16 flex flex-col gap-4">
        <Button color="blue" onClick={() => openAuth("signup")}>
          Get Started for Free
        </Button>
        <Button plain onClick={() => openAuth("login")}>
          Log in
        </Button>
      </div>
      {isAuthOpen && authMode === "login" && (
        <LoginForm
          isOpen={isAuthOpen}
          onClose={closeAuth}
          onSuccess={(email: string, password: string) => handleAuthSuccess(email, password)}
          formState={formState}
        />
      )}
      {isAuthOpen && authMode === "signup" && (
        <SignUpForm
          isOpen={isAuthOpen}
          onClose={closeAuth}
          onSuccess={(email: string, password: string) => handleAuthSuccess(email, password)}
        />
      )}
    </div>
  );
}
