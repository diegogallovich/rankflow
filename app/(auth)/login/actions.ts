'use server';

import { z } from 'zod';
import { createClient } from '@/utils/supabase/server';

const LoginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export async function signIn(prevState: any, formData: FormData) {
  const validatedFields = LoginSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Invalid fields. Please check your input.',
    };
  }

  const { email, password } = validatedFields.data;
  const supabase = createClient();

  try {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { message: error.message };
    }

    return { success: true };
  } catch (error) {
    return { message: 'An unexpected error occurred. Please try again.' };
  }
}

// Alias for backwards compatibility
export const login = signIn;