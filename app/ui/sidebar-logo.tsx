'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { SidebarItemPlaceholder } from '@/components/sidebar';
import Link from 'next/link';
import Image from 'next/image';

export function SidebarLogo() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <SidebarItemPlaceholder>
      <Link href="/">
        {mounted && (
          <Image
            src={resolvedTheme === 'dark' ? '/logotype-light.svg' : '/logotype-dark.svg'}
            alt="Rankflow Logo"
            width={120}
            height={28}
            priority
          />
        )}
      </Link>
    </SidebarItemPlaceholder>
  );
}
