import { login } from './actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Text, TextLink } from '@/components/ui/text'
import { Fieldset, Field, Label, FieldGroup } from '@/components/ui/fieldset'

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Log In</h1>
      <form action={login} className="w-full max-w-md">
        <Fieldset>
          <FieldGroup>
            <Field>
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" required />
            </Field>
            <Field>
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" required />
            </Field>
          </FieldGroup>
          <Button type="submit" className="w-full mt-6">Log in</Button>
        </Fieldset>
      </form>
      <Text className="mt-4">
        <TextLink href="/reset-password">Forgot your password?</TextLink>
      </Text>
      <Text className="mt-4">
        Don't have an account? <TextLink href="/sign-up">Sign up</TextLink>
      </Text>
    </div>
  )
}
