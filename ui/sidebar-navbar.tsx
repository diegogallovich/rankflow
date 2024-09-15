import { getLogtoContext, signIn, signOut } from '@logto/next/server-actions';
import { logtoConfig } from '@/lib/logto';
import { Navbar, NavbarSpacer, NavbarSection, NavbarItem } from '@/components/navbar';
import {
  Dropdown,
  DropdownButton,
  DropdownMenu,
  DropdownItem,
  DropdownLabel,
  DropdownDivider,
} from '@/components/dropdown';
import { Avatar } from '@/components/avatar';
import {
  ArrowRightStartOnRectangleIcon,
  LightBulbIcon,
  ShieldCheckIcon,
  UserCircleIcon,
} from '@heroicons/react/16/solid';
import { SignOutDropdownItem } from '@/ui/sign-out';
import { SignInDropdownItem } from '@/ui/sign-in';

export default async function SidebarNavbar() {
  const { isAuthenticated } = await getLogtoContext(logtoConfig);

  return (
    <Navbar>
      <NavbarSpacer />
      <NavbarSection>
        <Dropdown>
          <DropdownButton as={NavbarItem}>
            <Avatar initials={isAuthenticated ? 'AU' : 'GU'} square />
          </DropdownButton>
          <DropdownMenu className="min-w-64" anchor={'bottom end'}>
            {isAuthenticated ? (
              <>
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
              </>
            ) : (
              <>
                <SignInDropdownItem
                  onSignIn={async () => {
                    'use server';
                    await signIn(logtoConfig);
                  }}
                >
                  <UserCircleIcon />
                  <DropdownLabel>Sign Up</DropdownLabel>
                </SignInDropdownItem>
                <SignInDropdownItem
                  onSignIn={async () => {
                    'use server';
                    await signIn(logtoConfig);
                  }}
                >
                  <UserCircleIcon />
                  <DropdownLabel>Log in</DropdownLabel>
                </SignInDropdownItem>
              </>
            )}
          </DropdownMenu>
        </Dropdown>
      </NavbarSection>
    </Navbar>
  );
}
