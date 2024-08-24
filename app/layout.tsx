import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// UI Imports
import { Avatar } from "@/components/avatar";
import {
  Dropdown,
  DropdownButton,
  DropdownDivider,
  DropdownItem,
  DropdownLabel,
  DropdownMenu,
} from "@/components/dropdown";
import {
  Navbar,
  NavbarItem,
  NavbarSection,
  NavbarSpacer,
} from "@/components/navbar";
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
} from "@/components/sidebar";
import { SidebarLayout } from "@/components/sidebar-layout";
import {
  ArrowRightStartOnRectangleIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  CircleStackIcon,
  Cog8ToothIcon,
  LightBulbIcon,
  ShieldCheckIcon,
  UserIcon,
} from "@heroicons/react/16/solid";
import {
  QuestionMarkCircleIcon,
  SparklesIcon,
  PlusIcon,
} from "@heroicons/react/20/solid";
import Image from "next/image";
import Logo from "../public/logotype-light.svg";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RankFlow | AI For Webflow CMS",
  description:
    "Connect your Webflow CMS to an AI powered editor that can help you rank your content on search engines faster and better.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SidebarLayout
          navbar={
            <Navbar>
              <NavbarSpacer />
              <NavbarSection>
                <Dropdown>
                  <DropdownButton as={NavbarItem}>
                    <Avatar initials="WC" square />
                  </DropdownButton>
                  <DropdownMenu className="min-w-64" anchor="bottom end">
                    <DropdownItem href="/my-profile">
                      <UserIcon />
                      <DropdownLabel>My profile</DropdownLabel>
                    </DropdownItem>
                    <DropdownItem href="/settings">
                      <Cog8ToothIcon />
                      <DropdownLabel>Settings</DropdownLabel>
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
                    <DropdownItem href="/logout">
                      <ArrowRightStartOnRectangleIcon />
                      <DropdownLabel>Sign out</DropdownLabel>
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </NavbarSection>
            </Navbar>
          }
          sidebar={
            <Sidebar>
              <SidebarHeader>
                <div className="flex w-full items-start justify-start pb-6 pt-2">
                  <Image
                    src={Logo}
                    alt="RankFlow Logo"
                    className="max-h-5 w-auto"
                    layout="intrinsic"
                  />
                </div>

                <Dropdown>
                  <DropdownButton as={SidebarItem} className="lg:mb-2.5">
                    <Avatar initials="WS" />
                    <SidebarLabel>flowfully.webflow.io</SidebarLabel>
                    <ChevronDownIcon />
                  </DropdownButton>
                  <DropdownMenu
                    className="min-w-80 lg:min-w-64"
                    anchor="bottom start"
                  >
                    <DropdownItem href="/sites/1">
                      <Avatar slot="icon" initials="S1" />
                      <DropdownLabel>pixar.webflow.io</DropdownLabel>
                    </DropdownItem>
                    <DropdownItem href="/sites/2">
                      <Avatar slot="icon" initials="S2" />
                      <DropdownLabel>apple.webflow.io</DropdownLabel>
                    </DropdownItem>
                    <DropdownDivider />
                    <DropdownItem href="/sites/connect">
                      <PlusIcon />
                      <DropdownLabel>Connect new site&hellip;</DropdownLabel>
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </SidebarHeader>
              <SidebarBody>
                <SidebarSection>
                  <SidebarHeading>
                    <CircleStackIcon
                      className="mr-2 inline-block h-4 w-4"
                      aria-hidden="true"
                      strokeWidth={1.5}
                    />
                    Collections
                  </SidebarHeading>
                  <SidebarItem href="/collections/1">
                    <SidebarLabel>Blog Posts</SidebarLabel>
                  </SidebarItem>
                  <SidebarItem href="/collections/2">
                    <SidebarLabel>Products</SidebarLabel>
                  </SidebarItem>
                  <SidebarItem href="/collections/3">
                    <SidebarLabel>Team Members</SidebarLabel>
                  </SidebarItem>
                  <SidebarItem href="/collections/sync" className="mt-2">
                    <PlusIcon className="h-5 w-5" />
                    <SidebarLabel>Sync collection</SidebarLabel>
                  </SidebarItem>
                </SidebarSection>
                <SidebarSpacer />
                <SidebarSection>
                  <SidebarItem href="/support">
                    <QuestionMarkCircleIcon />
                    <SidebarLabel>Support</SidebarLabel>
                  </SidebarItem>
                  <SidebarItem href="/changelog">
                    <SparklesIcon />
                    <SidebarLabel>Changelog</SidebarLabel>
                  </SidebarItem>
                </SidebarSection>
              </SidebarBody>
              <SidebarFooter>
                <Dropdown>
                  <DropdownButton as={SidebarItem}>
                    <span className="flex min-w-0 items-center gap-3">
                      <Avatar initials="DG" className="size-10" square alt="" />
                      <span className="min-w-0">
                        <span className="block truncate text-sm/5 font-medium text-zinc-950 dark:text-white">
                          Diego
                        </span>
                        <span className="block truncate text-xs/5 font-normal text-zinc-500 dark:text-zinc-400">
                          diego@flowfully.io
                        </span>
                      </span>
                    </span>
                    <ChevronUpIcon />
                  </DropdownButton>
                  <DropdownMenu className="min-w-64" anchor="top start">
                    <DropdownItem href="/my-profile">
                      <UserIcon />
                      <DropdownLabel>My profile</DropdownLabel>
                    </DropdownItem>
                    <DropdownItem href="/settings">
                      <Cog8ToothIcon />
                      <DropdownLabel>Settings</DropdownLabel>
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
                    <DropdownItem href="/logout">
                      <ArrowRightStartOnRectangleIcon />
                      <DropdownLabel>Sign out</DropdownLabel>
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </SidebarFooter>
            </Sidebar>
          }
        >
          {children}
        </SidebarLayout>
      </body>
    </html>
  );
}
