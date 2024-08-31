"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/button";
import { Text } from "@/components/text";
import { useAuth } from "@/app/hooks/useAuth";

export default function Onboarding() {
  const [steps, setSteps] = useState([
    { id: 1, title: "Complete your profile", completed: false },
    { id: 2, title: "Connect your first webflow site", completed: false },
    { id: 3, title: "Sync your first collection", completed: false, disabled: true },
  ]);
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  const completeStep = (stepId: number) => {
    setSteps(steps.map(step => 
      step.id === stepId ? { ...step, completed: true } : step
    ));
    if (stepId === 2) {
      setSteps(steps.map(step => 
        step.id === 3 ? { ...step, disabled: false } : step
      ));
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6">Welcome to RankFlow</h1>
      <Text className="mb-8">Let's get you set up with a few quick steps:</Text>
      <ul className="space-y-6">
        {steps.map((step) => (
          <li key={step.id} className={`flex items-center justify-between p-4 border rounded ${step.completed ? 'bg-green-50' : ''}`}>
            <div>
              <Text className={`font-semibold ${step.completed ? 'line-through' : ''}`}>{step.title}</Text>
              {step.completed && <Text className="text-green-600">Completed</Text>}
            </div>
            <Button
              color="blue"
              disabled={step.disabled}
              onClick={() => {
                switch (step.id) {
                  case 1:
                    router.push("/account/profile");
                    break;
                  case 2:
                    router.push("/sites");
                    break;
                  case 3:
                    router.push("/sites");
                    break;
                }
              }}
            >
              {step.completed ? "View" : "Complete"}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}