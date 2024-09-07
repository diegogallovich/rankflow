'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogDescription, DialogBody, DialogActions } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TextLink } from '@/components/ui/text';
import { Fieldset, Field, FieldGroup, Label } from '@/components/ui/fieldset';

type AuthMode = 'login' | 'signup';

interface AuthDialogProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode: AuthMode;
}

export function AuthDialog({ isOpen, onClose, initialMode }: AuthDialogProps) {
  const [mode, setMode] = useState<AuthMode>(initialMode);

  // Reset mode when dialog opens or initialMode changes
  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
    }
  }, [isOpen, initialMode]);

  const toggleMode = () => {
    setMode(mode === 'login' ? 'signup' : 'login');
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>{mode === 'login' ? 'Log In' : 'Sign Up'}</DialogTitle>
      <DialogDescription>
        {mode === 'login'
          ? 'Log in to your account to access your dashboard.'
          : 'Create a new account to get started.'}
      </DialogDescription>
      <DialogBody>
        <form className='space-y-6'>
          <Fieldset>
            <FieldGroup>
              {mode === 'signup' && (
                <Field>
                  <Label>Full Name</Label>
                  <Input name='fullName' type='text' autoComplete='name' required />
                </Field>
              )}
              <Field>
                <Label>Email</Label>
                <Input name='email' type='email' autoComplete='email' required />
              </Field>
              <Field>
                <Label>Password</Label>
                <Input
                  name='password'
                  type='password'
                  autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                  required
                />
              </Field>
            </FieldGroup>
          </Fieldset>
        </form>
      </DialogBody>
      <DialogActions className='flex-col items-center justify-center gap-2'>
        <div className='flex flex-col gap-2 w-full'>
          <Button type='submit' color='blue' className='w-full'>
            {mode === 'login' ? 'Log In' : 'Sign Up'}
          </Button>
          <TextLink onClick={toggleMode} className='w-full text-center' href='#'>
            {mode === 'login' ? 'Need an account? Sign up' : 'Already have an account? Log in'}
          </TextLink>
        </div>
      </DialogActions>
    </Dialog>
  );
}
