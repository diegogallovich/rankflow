'use client';

import { useState } from 'react';
import { Button } from '@/components/button';
import {
  Dialog,
  DialogTitle,
  DialogDescription,
  DialogBody,
  DialogActions,
} from '@/components/dialog';
import { Input } from '@/components/input';

export function NotifyUsDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          url: window.location.href,
          userAgent: navigator.userAgent,
        }),
      });

      if (response.ok) {
        alert('Thank you for your report. We will look into it.');
        setIsOpen(false);
      } else {
        throw new Error('Failed to send email');
      }
    } catch (error) {
      console.error('Error sending report:', error);
      alert('Sorry, there was an error sending your report. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)} plain className="mt-2 w-full">
        Notify Us
      </Button>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <DialogTitle>Report an Issue</DialogTitle>
        <DialogDescription>
          Let us know you're having trouble accessing the site. We'll look into it and get back to
          you.
        </DialogDescription>
        <DialogBody>
          <form onSubmit={handleSubmit}>
            <Input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mb-4"
            />
            <DialogActions>
              <Button
                type="button"
                onClick={() => setIsOpen(false)}
                outline
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" color="blue" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </Button>
            </DialogActions>
          </form>
        </DialogBody>
      </Dialog>
    </>
  );
}
