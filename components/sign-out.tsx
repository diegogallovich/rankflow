'use client';

import { Button, ButtonProps } from '@/components/ui/button';
import { DropdownItem } from '@/components/ui/dropdown';
import { forwardRef } from 'react';

type SignOutProps = ButtonProps & {
  onSignOut: () => Promise<void>;
  cta?: string;
};

const SignOut = forwardRef<HTMLButtonElement, SignOutProps>(function SignOut(
  { onSignOut, cta = 'Sign Out', children, ...props },
  ref
) {
  return (
    <Button
      ref={ref}
      onClick={() => {
        onSignOut();
      }}
      {...props}
    >
      {children || cta}
    </Button>
  );
});

export const SignOutDropdownItem = function SignOutDropdownItem({
  onSignOut,
  cta = 'Sign Out',
  children,
  ...props
}: SignOutProps) {
  return (
    <DropdownItem
      onClick={() => {
        onSignOut();
      }}
      {...props}
    >
      {children || cta}
    </DropdownItem>
  );
};

export default SignOut;
