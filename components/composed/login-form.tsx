"use client";

import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogDescription,
  DialogBody,
  DialogActions,
} from "../dialog";
import { Fieldset, Field, Label, ErrorMessage } from "../fieldset";
import { Button } from "../button";
import { Input } from "../input";
import { Text } from "../text";
import { account } from "@/app/appwrite";
import { LoginFormSchema, FormState } from "@/app/lib/definitions";

interface LoginFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (email: string, password: string) => Promise<void>;
  formState: { message?: string };
}

export function LoginForm({
  isOpen,
  onClose,
  onSuccess,
  formState: initialFormState,
}: LoginFormProps) {
  const [localFormState, setLocalFormState] =
    useState<FormState>(initialFormState);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setLocalFormState({});

    const formData = new FormData(event.currentTarget);

    const validatedFields = LoginFormSchema.safeParse({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    if (!validatedFields.success) {
      setLocalFormState({
        errors: validatedFields.error.flatten().fieldErrors,
      });
      setIsLoading(false);
      return;
    }

    const { email, password } = validatedFields.data;

    try {
      // Directly call onSuccess, which will use the login function from AuthContext
      await onSuccess(email, password);
      onClose(); // Close the form after successful login
    } catch (error: any) {
      console.error("Login error:", error);
      setLocalFormState({
        message: error.message || "Invalid email or password. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Log In</DialogTitle>
      <DialogDescription>
        <Text className="text-zinc-700 dark:text-zinc-300">
          Log in to your RankFlow account.
        </Text>
      </DialogDescription>
      <DialogBody>
        <form onSubmit={handleSubmit}>
          <Fieldset>
            <Field>
              <Label>Email</Label>
              <Input type="email" name="email" required />
              {localFormState?.errors?.email && (
                <ErrorMessage>{localFormState.errors.email[0]}</ErrorMessage>
              )}
            </Field>
            <Field>
              <Label>Password</Label>
              <Input type="password" name="password" required />
              {localFormState?.errors?.password && (
                <ErrorMessage>{localFormState.errors.password[0]}</ErrorMessage>
              )}
            </Field>
          </Fieldset>
          {localFormState?.message && (
            <ErrorMessage>{localFormState.message}</ErrorMessage>
          )}
          <DialogActions>
            <Button type="submit" color="blue" disabled={isLoading}>
              {isLoading ? "Logging In..." : "Log In"}
            </Button>
            <Button type="button" color="white" onClick={onClose}>
              Cancel
            </Button>
          </DialogActions>
        </form>
      </DialogBody>
    </Dialog>
  );
}
