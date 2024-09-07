'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleSignUp = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: 'example@email.com',
      password: 'example-password',
      options: {
        emailRedirectTo: `${location.origin}/api/auth/callback`,
      },
    });
    if (error) {
      console.error('Error signing up:', error);
    } else {
      router.push('/verify-email');
    }
    setLoading(false);
  };

  const handleSignIn = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: 'example@email.com',
      password: 'example-password',
    });
    if (error) {
      console.error('Error signing in:', error);
    } else {
      router.refresh();
    }
    setLoading(false);
  };

  return (
    <>
      <h1>Hello RankFlow</h1>
      <Button onClick={handleSignUp} disabled={loading}>Sign Up</Button>
      <Button onClick={handleSignIn} disabled={loading}>Log In</Button>
    </>
  );
}
