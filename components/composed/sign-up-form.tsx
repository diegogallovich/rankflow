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
import { account, ID } from "@/app/appwrite";
import { SignUpFormSchema, FormState } from "@/app/lib/definitions";

interface SignUpFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function SignUpForm({ isOpen, onClose, onSuccess }: SignUpFormProps) {
  const [formState, setFormState] = useState<FormState>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setFormState(undefined);

    const formData = new FormData(event.currentTarget);

    const validatedFields = SignUpFormSchema.safeParse({
      name: formData.get("name"),
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

    const { name, email, password } = validatedFields.data;

    try {
      await account.create(ID.unique(), email, password, name);
      await account.createSession(email, password);
      onSuccess();
    } catch (error: any) {
      if (error.code === 400) {
        setFormState({
          errors: { email: ["Email already exists"] },
        });
      } else {
        setFormState({
          message: "An error occurred. Please try again.",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Sign Up</DialogTitle>
      <DialogDescription>
        <Text className="text-zinc-700 dark:text-zinc-300">
          Create an account to get started with RankFlow.
        </Text>
      </DialogDescription>
      <DialogBody>
        <form onSubmit={handleSubmit}>
          <Fieldset>
            <Field>
              <Label>Name</Label>
              <Input
                type="text"
                name="name"
                required
              />
              {formState?.errors?.name && <ErrorMessage>{formState.errors.name[0]}</ErrorMessage>}
            </Field>
            <Field>
              <Label>Email</Label>
              <Input
                type="email"
                name="email"
                required
              />
              {formState?.errors?.email && <ErrorMessage>{formState.errors.email[0]}</ErrorMessage>}
            </Field>
            <Field>
              <Label>Password</Label>
              <Input
                type="password"
                name="password"
                required
              />
              {formState?.errors?.password && <ErrorMessage>{formState.errors.password[0]}</ErrorMessage>}
            </Field>
          </Fieldset>
          {formState?.message && <ErrorMessage>{formState.message}</ErrorMessage>}
          <DialogActions>
            <Button
              type="submit"
              color="blue"
              disabled={isLoading}
            >
              {isLoading ? "Signing Up..." : "Sign Up"}
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