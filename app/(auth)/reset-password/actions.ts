'use server';

import { z } from 'zod';
import { createClient } from '@/utils/supabase/server';

const ResetPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export async function resetPassword(prevState: any, formData: FormData) {
  const validatedFields = ResetPasswordSchema.safeParse({
    email: formData.get('email'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Invalid email address. Please check your input.',
    };
  }

  const { email } = validatedFields.data;
  const supabase = createClient();

  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback?next=/update-password`,
    });

    if (error) {
      return { message: error.message };
    }

    return { success: true };
  } catch (error) {
    return { message: 'An unexpected error occurred. Please try again.' };
  }
}