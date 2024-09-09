'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogDescription,
  DialogBody,
  DialogActions,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface WaitlistDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WaitlistDialog({ isOpen, onClose }: WaitlistDialogProps) {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement waitlist signup logic
    console.log('Waitlist signup:', email);
    setEmail('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Join the Self-Hosted Waitlist</DialogTitle>
      <DialogDescription>
        Be the first to know when our self-hosted option becomes available. Sign up for our waitlist
        to receive updates and early access.
      </DialogDescription>
      <DialogBody>
        <form onSubmit={handleSubmit}>
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mb-4"
          />
          <DialogActions>
            <Button type="button" onClick={onClose} plain>
              Cancel
            </Button>
            <Button type="submit">Join Waitlist</Button>
          </DialogActions>
        </form>
      </DialogBody>
    </Dialog>
  );
}

export default function SelfHostedWaitlistButton() {
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);

  const openWaitlist = () => setIsWaitlistOpen(true);
  const closeWaitlist = () => setIsWaitlistOpen(false);

  return (
    <>
      <Button onClick={openWaitlist}>Join Waitlist</Button>
      <WaitlistDialog isOpen={isWaitlistOpen} onClose={closeWaitlist} />
    </>
  );
}
