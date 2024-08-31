'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useState, useEffect } from 'react';

export default function Home() {
  const [session, setSession] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClientComponentClient();

  useEffect(() => {
    async function getSession() {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setIsLoading(false);
    }

    getSession();
  }, [supabase]);

  if (isLoading) {
    return <h1 className="text-4xl font-bold text-center mt-20">Loading...</h1>;
  }

  return (
    <main className='flex min-h-screen flex-col items-center justify-center p-24'>
      <h1 className="text-6xl font-bold mb-8 text-center">
        {session ? "There's a session" : "There's no session"}
      </h1>
      
      {session && (
        <div className="mt-4 text-center">
          <p className="text-xl">Logged in as: {session.user.email}</p>
        </div>
      )}

      <div className="mt-8 text-center">
        <h2 className="text-2xl font-semibold mb-4">Session Status:</h2>
        <p className="text-lg">
          {session 
            ? 'You are logged in. You can now access protected resources.'
            : 'You are not logged in. Please sign in to access all features.'}
        </p>
      </div>
    </main>
  );
}
