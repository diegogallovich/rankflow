import { getLogtoContext, signIn, signOut } from "@logto/next/server-actions";
import { logtoConfig } from "@/app/logto";
import { Dropdown, DropdownButton, DropdownMenu, DropdownItem, DropdownLabel, DropdownDivider } from "@/components/ui/dropdown";
import { Avatar } from "@/components/ui/avatar";
import { ArrowRightStartOnRectangleIcon, LightBulbIcon, ShieldCheckIcon, UserCircleIcon } from "@heroicons/react/16/solid";
import { ChevronUpIcon } from "@heroicons/react/16/solid";
import { SidebarItem } from "@/components/ui/sidebar";

export async function SidebarAccountDropdown() { 
    const { isAuthenticated } = await getLogtoContext(logtoConfig);
    
    return (
        <Dropdown>
            <DropdownButton as={SidebarItem}>
                <span className='flex min-w-0 items-center gap-3'>
                  <Avatar initials={isAuthenticated ? 'AU' : 'GU'} className='size-10' square alt='' />
                  <span className='min-w-0'>
                    <span className='block truncate text-sm/5 font-medium text-zinc-950 dark:text-white'>
                      {isAuthenticated ? 'Authenticated User' : 'Guest User'}
                    </span>
                    <span className='block truncate text-xs/5 font-normal text-zinc-500 dark:text-zinc-400'>
                      {isAuthenticated ? 'authenticated@example.com' : 'guest@example.com'}
                    </span>
                  </span>
                </span>
                <ChevronUpIcon />
            </DropdownButton>
            {isAuthenticated ? (
                <DropdownMenu className='min-w-64' anchor={"bottom end"}>
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
                <DropdownItem
                  onClick={async () => { 
                    'use server';
                    await signOut(logtoConfig);
                  }}
                >
                  <ArrowRightStartOnRectangleIcon />
                  <DropdownLabel>Sign out</DropdownLabel>
                </DropdownItem>
              </DropdownMenu>
            ) : (
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
                  <DropdownItem
                    onClick={async () => {
                        'use server';
                        await signIn(logtoConfig);
                    }}
                  >
                    <ArrowRightStartOnRectangleIcon />
                    <DropdownLabel>Log In</DropdownLabel>
                  </DropdownItem>
                </DropdownMenu>
            )}
        </Dropdown>
    )
}