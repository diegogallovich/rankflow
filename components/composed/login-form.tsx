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
  onSuccess: () => void;
}

export function LoginForm({ isOpen, onClose, onSuccess }: LoginFormProps) {
  const [formState, setFormState] = useState<FormState>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setFormState(undefined);

    const formData = new FormData(event.currentTarget);

    const validatedFields = LoginFormSchema.safeParse({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    if (!validatedFields.success) {
      setFormState({
        errors: validatedFields.error.flatten().fieldErrors,
      });
      setIsLoading(false);
      return;
    }

    const { email, password } = validatedFields.data;

    try {
      await account.createSession(email, password);
      onSuccess();
    } catch (error: any) {
      setFormState({
        message: "Invalid email or password. Please try again.",
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
              <Input
                type="email"
                name="email"
                required
              />
              {formState?.errors?.email && (
                <ErrorMessage>{formState.errors.email[0]}</ErrorMessage>
              )}
            </Field>
            <Field>
              <Label>Password</Label>
              <Input
                type="password"
                name="password"
                required
              />
              {formState?.errors?.password && (
                <ErrorMessage>{formState.errors.password[0]}</ErrorMessage>
              )}
            </Field>
          </Fieldset>
          {formState?.message && (
            <ErrorMessage>{formState.message}</ErrorMessage>
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