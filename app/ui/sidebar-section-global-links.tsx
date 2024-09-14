'use client';

import { LightBulbIcon, QuestionMarkCircleIcon, SparklesIcon } from '@heroicons/react/16/solid';
import {
  SidebarItem,
  SidebarItemPlaceholder,
  SidebarLabel,
  SidebarSection,
} from '@/components/sidebar';
import { ThemeToggle } from '@/app/ui/theme-toggle';
import { usePathname } from 'next/navigation';

export default function SidebarSectionGlobalLinks() {
  const pathname = usePathname();
  return (
    <SidebarSection>
      <SidebarItem href="mailto:contact@rankflow.ai">
        <QuestionMarkCircleIcon />
        <SidebarLabel>Support</SidebarLabel>
      </SidebarItem>
      <SidebarItem href="/changelog" current={pathname === '/changelog'}>
        <SparklesIcon />
        <SidebarLabel>Changelog</SidebarLabel>
      </SidebarItem>
      <SidebarItem href="/share-feedback" current={pathname === '/share-feedback'}>
        <LightBulbIcon />
        <SidebarLabel>Share Feedback</SidebarLabel>
      </SidebarItem>
      <SidebarItemPlaceholder>
        <ThemeToggle />
      </SidebarItemPlaceholder>
    </SidebarSection>
  );
}
