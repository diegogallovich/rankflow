import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { Text } from '@/components/ui/text';
import { redirect } from 'next/navigation';

export default async function Profile() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <div className="mx-auto mt-10 max-w-2xl">
      <Text className="mb-6 text-3xl font-bold">Welcome to your account profile, {user.email}</Text>
    </div>
  );
}
