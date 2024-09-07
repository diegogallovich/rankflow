'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { Spinner } from '@/components/ui/spinner';

export default function AccountPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const supabase = createClientComponentClient();

  useEffect(() => {
    async function getUser() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
      } else {
        router.push('/login');
      }
      setLoading(false);
    }
    getUser();
  }, [router, supabase.auth]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  if (!user) {
    return null; // This shouldn't happen as we redirect to login, but just in case
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white dark:bg-zinc-800 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6">Your Account</h1>
      
      <div className="mb-6">
        <Text className="text-lg font-semibold">Email:</Text>
        <Text>{user.email}</Text>
      </div>

      <div className="mb-6">
        <Text className="text-lg font-semibold">Account created:</Text>
        <Text>{new Date(user.created_at).toLocaleDateString()}</Text>
      </div>

      <div className="mb-6">
        <Text className="text-lg font-semibold">Last sign in:</Text>
        <Text>{new Date(user.last_sign_in_at).toLocaleDateString()}</Text>
      </div>

      <div className="space-y-4">
        <Button onClick={() => router.push('/account/change-password')}>
          Change Password
        </Button>
        <Button variant="outline" onClick={handleSignOut}>
          Sign Out
        </Button>
      </div>
    </div>
  );
}
