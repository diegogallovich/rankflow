import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { Text } from '@/components/ui/text';
import { redirect } from 'next/navigation';

export default async function Profile() {
  const supabase = createServerComponentClient({ cookies });
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <Text className="text-3xl font-bold mb-6">Welcome to your account profile, {user.email}</Text>
    </div>
  );
}