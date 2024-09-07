import { resetPassword } from './actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Text, TextLink } from '@/components/ui/text'
import { Fieldset, Field, Label, FieldGroup } from '@/components/ui/fieldset'

export default function ResetPasswordPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Reset Password</h1>
      <form action={resetPassword} className="w-full max-w-md">
        <Fieldset>
          <FieldGroup>
            <Field>
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" required />
            </Field>
          </FieldGroup>
          <Button type="submit" className="w-full mt-6">Send Reset Link</Button>
        </Fieldset>
      </form>
      <Text className="mt-4">
        Remember your password? <TextLink href="/login">Log in</TextLink>
      </Text>
    </div>
  )
}
