import { z } from 'zod';

/*
 * Profile Update Form Schema
 *
 * This schema is used to validate the profile update form.
 * It is used in the @/app/ui/profile-form.tsx file.
 */
export const ProfileUpdateFormSchema = z.object({
  avatar: z.string().optional(),
  name: z.string().min(2, 'Name must be at least 2 characters long'),
  primaryEmail: z.string().email('Invalid email address'),
});

export type ProfileUpdateFormState = {
  errors?: {
    name?: string[];
    primaryEmail?: string[];
    avatar?: string[];
  };
  message?: string;
};

export type ProfileUpdateData = z.infer<typeof ProfileUpdateFormSchema>;
