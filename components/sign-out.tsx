'use client';

import { Button } from '@/components/ui/button';

type Props = {
    onSignOut: () => Promise<void>;
    cta: string;
}

export default function SignOut({ onSignOut, cta = 'Sign Out' }: Props) {
    return (
        <Button
            onClick={() => {
                onSignOut();
            }}
        >
            {cta}
        </Button>
    )
}