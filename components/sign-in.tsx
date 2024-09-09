'use client';

import { Button, ButtonProps } from '@/components/ui/button';
import { DropdownItem } from '@/components/ui/dropdown';
import { forwardRef } from 'react';

type SignInProps = ButtonProps & {
  onSignIn: () => Promise<void>;
  cta?: string;
};

const SignIn = forwardRef<HTMLButtonElement, SignInProps>(function SignIn(
  { onSignIn, cta = 'Sign In', children, ...props },
  ref
) {
  return (
    <Button
      ref={ref}
      onClick={() => {
        onSignIn();
      }}
      {...props}
    >
      {children || cta}
    </Button>
  );
});

export const SignInDropdownItem = function SignInDropdownItem({
  onSignIn,
  cta = 'Sign In',
  children,
  ...props
}: SignInProps) {
  return (
    <DropdownItem
      onClick={() => {
        onSignIn();
      }}
      {...props}
    >
      {children || cta}
    </DropdownItem>
  );
};

export default SignIn;
