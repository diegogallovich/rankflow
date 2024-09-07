"use client";

import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { Text } from '@/components/ui/text';
import { createClient } from '@/utils/supabase/client';

export default function Profile() {
  const [email, setEmail] = useState<string | null>(null);
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    async function getUser() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setEmail(user.email ?? null);
      } else {
        router.push('/login');
      }
    }
    getUser();
  }, [router, supabase.auth]);

  if (!email) {
    return <Text>Loading...</Text>;
  }

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <Text className="text-3xl font-bold mb-6">Welcome to your account profile, {email}</Text>
    </div>
  );
}