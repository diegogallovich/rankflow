'use client';

// React & Next imports
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
// 3rd party imports
import {
  UserCircleIcon,
  ShieldCheckIcon,
  LightBulbIcon,
  ArrowRightStartOnRectangleIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  Cog8ToothIcon,
  PlusIcon,
  QuestionMarkCircleIcon,
  SparklesIcon,
} from '@heroicons/react/16/solid';

// UI Imports
import {
  Dropdown,
  DropdownButton,
  DropdownMenu,
  DropdownItem,
  DropdownLabel,
  DropdownDivider,
} from '@/components/ui/dropdown';
import { SidebarLayout } from '@/components/ui/sidebar-layout';
import {
  Sidebar,
  SidebarBody,
  SidebarFooter,
  SidebarHeader,
  SidebarHeading,
  SidebarItem,
  SidebarLabel,
  SidebarSection,
  SidebarSpacer,
} from '@/components/ui/sidebar';
import { Avatar } from '@/components/ui/avatar';
import { Navbar, NavbarSection, NavbarSpacer } from '@/components/ui/navbar';
import { SidebarItemPlaceholder } from '@/components/ui/sidebar';
// Components
import { ThemeToggle } from '@/components/theme-toggle';

import { User as SupabaseUser } from '@supabase/supabase-js';

type User = SupabaseUser & {
  name?: string;
  initials?: string;
};

type Collection = {
  id: string;
  name: string;
};

type Site = {
  id: string;
  name: string;
  collections: Array<Collection>;
};

export default function AppLayout({
  children,
  user,
  sites,
}: {
  children: React.ReactNode;
  user: User | null;
  sites: Array<Site> | null;
}) {
  const router = useRouter();
  const supabase = createClientComponentClient();

  const pathname = usePathname();

  const [currentSite, setCurrentSite] = useState<Site | null>(null);

  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);
  const [authDialogMode, setAuthDialogMode] = useState<'login' | 'signup'>('login');

  const openAuthDialog = (mode: 'login' | 'signup') => {
    setAuthDialogMode(mode);
    setIsAuthDialogOpen(true);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/login');
    router.refresh();
  };

  function AccountDropdownMenu({ anchor, handleSignOut }: { anchor: 'top start' | 'bottom end', handleSignOut: () => Promise<void> }) {
    return (
      <DropdownMenu className='min-w-64' anchor={anchor}>
        <DropdownItem href='/account'>
          <UserCircleIcon />
          <DropdownLabel>My account</DropdownLabel>
        </DropdownItem>
        <DropdownDivider />
        <DropdownItem href='/privacy-policy'>
          <ShieldCheckIcon />
          <DropdownLabel>Privacy policy</DropdownLabel>
        </DropdownItem>
        <DropdownItem href='/share-feedback'>
          <LightBulbIcon />
          <DropdownLabel>Share feedback</DropdownLabel>
        </DropdownItem>
        <DropdownDivider />
        <DropdownItem onClick={handleSignOut}>
          <ArrowRightStartOnRectangleIcon />
          <DropdownLabel>Sign out</DropdownLabel>
        </DropdownItem>
      </DropdownMenu>
    );
  }

  return (
    <SidebarLayout
      navbar={
        <Navbar>
          <NavbarSpacer />
          <NavbarSection>
            {user ? (
              <Dropdown>
                <DropdownButton>
                  <Avatar initials={user.initials} />
                </DropdownButton>
                <AccountDropdownMenu anchor='bottom end' handleSignOut={handleSignOut} />
              </Dropdown>
            ) : (
              <Dropdown>
                <DropdownButton>
                  <Avatar initials='GU' />
                </DropdownButton>
                <DropdownMenu>
                  <DropdownItem href="/sign-up">
                    <UserCircleIcon />
                    <DropdownLabel>Sign Up</DropdownLabel>
                  </DropdownItem>
                  <DropdownItem href="/login">
                    <UserCircleIcon />
                    <DropdownLabel>Log In</DropdownLabel>
                  </DropdownItem>
                  <DropdownDivider />
                  <DropdownItem href='/privacy-policy'>
                    <ShieldCheckIcon />
                    <DropdownLabel>Privacy policy</DropdownLabel>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            )}
          </NavbarSection>
        </Navbar>
      }
      sidebar={
        <Sidebar>
          <SidebarHeader>
            <Dropdown>
              <DropdownButton as={SidebarItem}>
                <SidebarLabel>{currentSite?.name ?? 'Select a site'}</SidebarLabel>
                <ChevronDownIcon />
              </DropdownButton>

              <DropdownMenu className='min-w-80 lg:min-w-64' anchor='bottom start'>
                {currentSite && (
                  <>
                    <DropdownItem href={`/sites/${currentSite.id}`}>
                      <Cog8ToothIcon />
                      <DropdownLabel>Site Settings</DropdownLabel>
                    </DropdownItem>

                    <DropdownDivider />

                    {sites?.map((site) => (
                      <DropdownItem
                        key={site.id}
                        href={`/sites/${site.id}`}
                        onClick={() => setCurrentSite(site)}
                      >
                        <DropdownLabel>{site.name}</DropdownLabel>
                      </DropdownItem>
                    ))}

                    <DropdownDivider />
                  </>
                )}

                <DropdownItem href={user ? '/sites/new' : '/sign-up'}>
                  <PlusIcon />
                  <DropdownLabel>{user ? 'New Site' : 'Sign Up to create a site'}</DropdownLabel>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </SidebarHeader>

          <SidebarBody>
            <SidebarSection className='max-lg:hidden'>
              <SidebarHeading>Collections</SidebarHeading>

              {currentSite?.collections.map((collection) => (
                <SidebarItem
                  key={collection.id}
                  href={`/sites/${currentSite.id}/collections/${collection.id}`}
                  current={pathname === `/sites/${currentSite.id}/collections/${collection.id}`}
                >
                  {collection.name}
                </SidebarItem>
              ))}

              <SidebarItem href={user ? `/sites/${currentSite?.id}/collections/new` : '/sign-up'}>
                <PlusIcon />
                <SidebarLabel>{user ? 'Sync New Collection' : 'Sign Up to sync collections'}</SidebarLabel>
              </SidebarItem>
            </SidebarSection>

            <SidebarSpacer />

            <SidebarSection>
              <SidebarItem href='/support' current={pathname === '/support'}>
                <QuestionMarkCircleIcon />
                <SidebarLabel>Support</SidebarLabel>
              </SidebarItem>
              <SidebarItem href='/changelog' current={pathname === '/changelog'}>
                <SparklesIcon />
                <SidebarLabel>Changelog</SidebarLabel>
              </SidebarItem>
              <SidebarItem href='/share-feedback' current={pathname === '/share-feedback'}>
                <LightBulbIcon />
                <SidebarLabel>Share Feedback</SidebarLabel>
              </SidebarItem>
              <SidebarItemPlaceholder>
                <ThemeToggle />
              </SidebarItemPlaceholder>
            </SidebarSection>
          </SidebarBody>

          <SidebarFooter className='max-lg:hidden'>
            <Dropdown>
              <DropdownButton as={SidebarItem}>
                <span className='flex min-w-0 items-center gap-3'>
                  <Avatar initials={user?.initials ?? 'GU'} className='size-10' square alt='' />
                  <span className='min-w-0'>
                    <span className='block truncate text-sm/5 font-medium text-zinc-950 dark:text-white'>
                      {user?.name ?? 'Guest User'}
                    </span>
                    <span className='block truncate text-xs/5 font-normal text-zinc-500 dark:text-zinc-400'>
                      {user?.email ?? 'guest@example.com'}
                    </span>
                  </span>
                </span>
                <ChevronUpIcon />
              </DropdownButton>
              {user ? (
                <AccountDropdownMenu anchor='top start' handleSignOut={handleSignOut} />
              ) : (
                <DropdownMenu>
                  <DropdownItem href="/sign-up">
                    <UserCircleIcon />
                    <DropdownLabel>Sign Up</DropdownLabel>
                  </DropdownItem>
                  <DropdownItem href="/login">
                    <UserCircleIcon />
                    <DropdownLabel>Log In</DropdownLabel>
                  </DropdownItem>
                </DropdownMenu>
              )}
            </Dropdown>
          </SidebarFooter>
        </Sidebar>
      }
    >
      {children}
    </SidebarLayout>
  );
}
