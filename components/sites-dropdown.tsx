import { getLogtoContext, signIn } from '@logto/next/server-actions';
import { logtoConfig } from '@/app/logto';
import {
  Dropdown,
  DropdownButton,
  DropdownMenu,
  DropdownItem,
  DropdownLabel,
  DropdownDivider,
} from '@/components/ui/dropdown';
import { ChevronDownIcon, Cog8ToothIcon, PlusIcon } from '@heroicons/react/16/solid';
import { SidebarItem, SidebarLabel } from '@/components/ui/sidebar';
import { headers } from 'next/headers';

const sitesMock = [
  {
    id: '1',
    name: 'Site 1',
  },
  {
    id: '2',
    name: 'Site 2',
  },
];

export default async function SitesDropdown() {
  const { isAuthenticated } = await getLogtoContext(logtoConfig);
  const headersList = headers();
  const pathname = headersList.get('x-pathname');

  // grab current site id from pathname
  const currentSiteId = pathname?.split('/')[2];
  const currentSite = sitesMock.find((site) => site.id === currentSiteId);

  // if it's authenticated, get the user's sites
  // if not then show nudge copy

  return (
    <Dropdown>
      <DropdownButton as={SidebarItem}>
        {isAuthenticated ? (
          <SidebarLabel>{currentSite ? currentSite.name : sitesMock[0].name}</SidebarLabel>
        ) : (
          <SidebarLabel>Select a site</SidebarLabel>
        )}
        <ChevronDownIcon />
      </DropdownButton>

      <DropdownMenu className="min-w-80 lg:min-w-64" anchor="bottom start">
        {isAuthenticated ? (
          <>
            <DropdownItem href={`/sites/1`}>
              <Cog8ToothIcon />
              <DropdownLabel>Site Settings</DropdownLabel>
            </DropdownItem>

            <DropdownDivider />

            {sitesMock?.map((site) => (
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
          <DropdownItem
            onClick={async () => {
              'use server';
              await signIn(logtoConfig);
            }}
          >
            <PlusIcon />
            <DropdownLabel>'Sign Up to create a site'</DropdownLabel>
          </DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  );
}
