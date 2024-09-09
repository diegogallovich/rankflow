'use client';

import { Button } from '@/components/ui/button';

type SignInProps = {
    onSignIn: () => Promise<void>;
    cta?: string;
};

export default function SignIn({ onSignIn, cta = 'Sign In' }: SignInProps) {
    return (
        <Button
            onClick={() => { onSignIn() }}
        >
            {cta}
        </Button>
    );
}