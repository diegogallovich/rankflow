import { getLogtoContext, signIn, signOut } from '@logto/next/server-actions';
import { logtoConfig } from '@/app/logto';
import { Navbar, NavbarSpacer, NavbarSection } from '@/components/ui/navbar';
import {
  Dropdown,
  DropdownButton,
  DropdownMenu,
  DropdownItem,
  DropdownLabel,
  DropdownDivider,
} from '@/components/ui/dropdown';
import { Avatar } from '@/components/ui/avatar';
import {
  ArrowRightStartOnRectangleIcon,
  LightBulbIcon,
  ShieldCheckIcon,
  UserCircleIcon,
} from '@heroicons/react/16/solid';
import { SignOutDropdownItem } from '@/components/sign-out';

export default async function SidebarNavbar() {
  const { isAuthenticated } = await getLogtoContext(logtoConfig);

  return (
    <Navbar>
      <NavbarSpacer />
      <NavbarSection>
        {isAuthenticated ? (
          <Dropdown>
            <DropdownButton>
              <Avatar initials={'AU'} />
            </DropdownButton>
            <DropdownMenu className="min-w-64" anchor={'bottom end'}>
              <DropdownItem href="/account">
                <UserCircleIcon />
                <DropdownLabel>My account</DropdownLabel>
              </DropdownItem>
              <DropdownDivider />
              <DropdownItem href="/privacy-policy">
                <ShieldCheckIcon />
                <DropdownLabel>Privacy policy</DropdownLabel>
              </DropdownItem>
              <DropdownItem href="/share-feedback">
                <LightBulbIcon />
                <DropdownLabel>Share feedback</DropdownLabel>
              </DropdownItem>
              <DropdownDivider />
              <SignOutDropdownItem
                onSignOut={async () => {
                  'use server';
                  await signOut(logtoConfig);
                }}
              >
                <ArrowRightStartOnRectangleIcon />
                <DropdownLabel>Sign out</DropdownLabel>
              </SignOutDropdownItem>
            </DropdownMenu>
          </Dropdown>
        ) : (
          <Dropdown>
            <DropdownButton>
              <Avatar initials="GU" />
            </DropdownButton>
            <DropdownMenu>
              <DropdownItem
                onClick={async () => {
                  'use server';
                  await signIn(logtoConfig);
                }}
              >
                <UserCircleIcon />
                <DropdownLabel>Sign Up</DropdownLabel>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        )}
      </NavbarSection>
    </Navbar>
  );
}
