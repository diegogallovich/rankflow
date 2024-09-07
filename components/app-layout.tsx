'use client';

// React & Next imports
import { usePathname } from 'next/navigation';
import { useState } from 'react';
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

function AccountDropdownMenu({ anchor }: { anchor: 'top start' | 'bottom end' }) {
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
      <DropdownItem href='#'>
        <ArrowRightStartOnRectangleIcon />
        <DropdownLabel>Sign out</DropdownLabel>
      </DropdownItem>
    </DropdownMenu>
  );
}

type User = {
  name: string;
  email: string;
  initials: string;
} | null;

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
  sites,
  user,
}: {
  children: React.ReactNode;
  user: User | null;
  sites: Array<Site> | null;
}) {
  const pathname = usePathname();

  const [currentSite, setCurrentSite] = useState<Site | null>(null);

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
                <AccountDropdownMenu anchor='bottom end' />
              </Dropdown>
            ) : (
              <Dropdown>
                <DropdownButton>
                  <Avatar initials='GU' />
                </DropdownButton>
                <DropdownMenu>
                  <DropdownItem>
                    <UserCircleIcon />
                    <DropdownLabel>Sign Up</DropdownLabel>
                  </DropdownItem>
                  <DropdownItem>
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
                <AccountDropdownMenu anchor='top start' />
              ) : (
                <DropdownMenu>
                  <DropdownItem>
                    <UserCircleIcon />
                    <DropdownLabel>Sign Up</DropdownLabel>
                  </DropdownItem>
                  <DropdownItem>
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
