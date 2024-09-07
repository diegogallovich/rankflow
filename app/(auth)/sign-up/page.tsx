import { signUp } from './actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Text, TextLink } from '@/components/ui/text'
import { Fieldset, Field, Label, FieldGroup } from '@/components/ui/fieldset'

export default function SignUpPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
      <form action={signUp} className="w-full max-w-md">
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
          <Button type="submit" className="w-full mt-6">Sign up</Button>
        </Fieldset>
      </form>
      <Text className="mt-4">
        Already have an account? <TextLink href="/login">Log in</TextLink>
      </Text>
    </div>
  )
}
