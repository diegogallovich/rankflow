'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { AuthDialog } from '@/components/auth-dialog';

export default function Home() {
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);
  const [authDialogMode, setAuthDialogMode] = useState<'login' | 'signup'>('login');

  const openAuthDialog = (mode: 'login' | 'signup') => {
    setAuthDialogMode(mode);
    setIsAuthDialogOpen(true);
  };

  return (
    <>
      <h1>Hello RankFlow</h1>
      <Button onClick={() => openAuthDialog('signup')}>Sign Up</Button>
      <Button onClick={() => openAuthDialog('login')}>Log In</Button>
      <AuthDialog
        isOpen={isAuthDialogOpen}
        onClose={() => setIsAuthDialogOpen(false)}
        initialMode={authDialogMode}
      />
    </>
  );
}
