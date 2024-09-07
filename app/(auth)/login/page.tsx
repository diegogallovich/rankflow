'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Text, TextLink } from '@/components/ui/text';
import { Fieldset, Field, Label, FieldGroup } from '@/components/ui/fieldset';
import { signIn } from './actions';
import { Spinner } from '@/components/ui/spinner';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className="w-full mt-6" disabled={pending}>
      {pending ? <Spinner /> : 'Log In'}
    </Button>
  );
}

export default function LoginPage() {
  const [state, formAction] = useFormState(signIn, null);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Log In</h1>
      <form action={formAction} className="w-full max-w-md">
        <Fieldset>
          <FieldGroup>
            <Field>
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" required aria-describedby="email-error" />
              {state?.errors?.email && (
                <p id="email-error" className="text-red-500 text-sm mt-1">
                  {state.errors.email}
                </p>
              )}
            </Field>
            <Field>
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" required aria-describedby="password-error" />
              {state?.errors?.password && (
                <p id="password-error" className="text-red-500 text-sm mt-1">
                  {state.errors.password}
                </p>
              )}
            </Field>
          </FieldGroup>
          <SubmitButton />
        </Fieldset>
      </form>
      {state?.message && (
        <p className="text-red-500 mt-4">{state.message}</p>
      )}
      <Text className="mt-4">
        <TextLink href="/reset-password">Forgot your password?</TextLink>
      </Text>
      <Text className="mt-4">
        Don&apos;t have an account? <TextLink href="/sign-up">Sign up</TextLink>
      </Text>
    </div>
  );
}
