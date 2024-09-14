import { getLogtoContext, signIn } from '@logto/next/server-actions';
import { logtoConfig } from '@/app/logto';
import {
  Dropdown,
  DropdownButton,
  DropdownMenu,
  DropdownItem,
  DropdownLabel,
  DropdownDivider,
} from '@/components/dropdown';
import { ChevronDownIcon, Cog8ToothIcon, PlusIcon } from '@heroicons/react/16/solid';
import { SidebarItem, SidebarLabel } from '@/components/sidebar';
import { headers } from 'next/headers';
import { SignInDropdownItem } from '@/ui/sign-in';
import { Site } from '@/lib/definitions';
import prisma from '@/lib/prisma';

export default async function SitesDropdown() {
  const { isAuthenticated, userInfo } = await getLogtoContext(logtoConfig);
  const headersList = headers();
  const pathname = headersList.get('x-pathname');

  // grab current site id from pathname
  const currentSiteId = pathname?.split('/')[2];

  let sites: Site[] = [];
  let currentSite: Site | null = null;

  if (isAuthenticated && userInfo?.sub) {
    sites = (await prisma.site.findMany({ where: { userId: userInfo.sub } })) as Site[];
    currentSite = sites.find((site: Site) => site.id === currentSiteId) || sites[0] || null;
  }

  return (
    <Dropdown>
      <DropdownButton as={SidebarItem}>
        {isAuthenticated ? (
          <SidebarLabel>{currentSite ? currentSite.name : 'Select a site'}</SidebarLabel>
        ) : (
          <SidebarLabel>Select a site</SidebarLabel>
        )}
        <ChevronDownIcon />
      </DropdownButton>

      <DropdownMenu className="min-w-80 lg:min-w-64" anchor="bottom start">
        {isAuthenticated ? (
          <>
            {currentSite && (
              <>
                <DropdownItem href={`/sites/${currentSite.id}`}>
                  <Cog8ToothIcon />
                  <DropdownLabel>Site Settings</DropdownLabel>
                </DropdownItem>
                <DropdownDivider />
              </>
            )}

            {sites.map((site: Site) => (
              <DropdownItem key={site.id} href={`/sites/${site.id}`}>
                <DropdownLabel>{site.name}</DropdownLabel>
              </DropdownItem>
            ))}

            <DropdownDivider />

            <DropdownItem href="/sites/new">
              <PlusIcon />
              <DropdownLabel>Connect a new site</DropdownLabel>
            </DropdownItem>
          </>
        ) : (
          <SignInDropdownItem
            onSignIn={async () => {
              'use server';
              await signIn(logtoConfig);
            }}
          >
            <PlusIcon />
            <DropdownLabel>Sign Up to create a site</DropdownLabel>
          </SignInDropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  );
}
