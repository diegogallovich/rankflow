'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function EmailListSubscriptionForm() {
  const [email, setEmail] = useState('');

  const handleEmailSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement email signup logic
    console.log('Email signup:', email);
    setEmail('');
  };

  return (
    <form onSubmit={handleEmailSignup} className="flex gap-4">
      <Input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Button type="submit">Subscribe</Button>
    </form>
  );
}
