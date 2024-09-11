'use server';

import { getAccessTokenRSC } from '@logto/next/server-actions';
import { logtoConfig } from '@/app/logto';
import { ProfileUpdateFormSchema, ProfileUpdateFormState } from '@/lib/definitions';
import { getEnvVariable } from '@/utils/get-env-variable';

export async function updateProfile(
  prevState: ProfileUpdateFormState,
  formData: FormData
): Promise<ProfileUpdateFormState> {
  console.log('Starting updateProfile action');
  const userId = formData.get('userId') as string;
  console.log('User ID:', userId);

  const validatedFields = ProfileUpdateFormSchema.safeParse({
    name: formData.get('name'),
    primaryEmail: formData.get('primaryEmail'),
    avatar: formData.get('avatar'),
  });

  if (!validatedFields.success) {
    console.error('Validation failed:', validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const updatedFields = validatedFields.data;
  console.log('Validated fields:', updatedFields);

  try {
    console.log('Attempting to get access token');
    const accessToken = await getAccessTokenRSC(logtoConfig);
    console.log('Access token obtained');

    const url = `${getEnvVariable('LOGTO_ENDPOINT')}/api/users/${userId}`;
    console.log('Sending PATCH request to:', url);

    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: updatedFields.name,
        primaryEmail: updatedFields.primaryEmail,
        avatar: updatedFields.avatar,
      }),
    });

    console.log('Response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error response:', errorText);
      throw new Error(`Failed to update profile: ${response.status} ${errorText}`);
    }

    console.log('Profile updated successfully');
    return { message: 'Profile updated successfully' };
  } catch (error) {
    console.error('Error in updateProfile:', error);
    return {
      message: `Failed to update profile: ${
        error instanceof Error ? error.message : 'Unknown error'
      }`,
    };
  }
}
