import { getLogtoContext, signIn, signOut } from '@logto/next/server-actions';
import { logtoConfig } from '@/lib/logto';
import {
  Dropdown,
  DropdownButton,
  DropdownMenu,
  DropdownItem,
  DropdownLabel,
  DropdownDivider,
} from '@/components/dropdown';
import { SidebarItem } from '@/components/sidebar';
import { Avatar } from '@/components/avatar';
import { ChevronUpIcon } from '@heroicons/react/16/solid';
import {
  UserCircleIcon,
  ShieldCheckIcon,
  LightBulbIcon,
  ArrowRightStartOnRectangleIcon,
} from '@heroicons/react/16/solid';
import { SignInDropdownItem } from '@/ui/sign-in';
import { SignOutDropdownItem } from '@/ui/sign-out';

export async function SidebarAccountDropdown() {
  const { isAuthenticated } = await getLogtoContext(logtoConfig);

  if (isAuthenticated) {
    return (
      <Dropdown>
        <DropdownButton as={SidebarItem}>
          <span className="flex min-w-0 items-center gap-3">
            <Avatar initials="AU" className="size-10" square alt="" />
            <span className="min-w-0">
              <span className="block truncate text-sm/5 font-medium text-zinc-950 dark:text-white">
                Authenticated User
              </span>
              <span className="block truncate text-xs/5 font-normal text-zinc-500 dark:text-zinc-400">
                authenticated@example.com
              </span>
            </span>
          </span>
          <ChevronUpIcon />
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
    );
  }

  return (
    <Dropdown>
      <DropdownButton as={SidebarItem}>
        <div className="flex items-center gap-3">
          <Avatar initials="GU" className="size-10" square alt="" />
          <div>
            <span className="block truncate text-sm/5 font-medium text-zinc-950 dark:text-white">
              Guest User
            </span>
            <span className="block truncate text-xs/5 font-normal text-zinc-500 dark:text-zinc-400">
              guest@example.com
            </span>
          </div>
        </div>
        <ChevronUpIcon />
      </DropdownButton>
      <DropdownMenu className="min-w-64" anchor={'bottom end'}>
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
          <ArrowRightStartOnRectangleIcon />
          <DropdownLabel>Log In</DropdownLabel>
        </SignInDropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
