"use client";

import { Inter } from "next/font/google";
import "./globals.css";
// UI Imports
import { Avatar } from "@/components/avatar";
import { ThemeProvider } from "next-themes";
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
  SidebarItemPlaceholder,
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
import LogoLight from "../public/logotype-light.svg";
import LogoDark from "../public/logotype-dark.svg";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { account } from "@/app/appwrite";
import { LoginForm } from "@/components/composed/login-form";
import { SignUpForm } from "@/components/composed/sign-up-form";
import { Button } from "@/components/button";
import { AuthProvider } from "@/app/context/AuthContext";
import { useAuth } from "@/app/hooks/useAuth";

const ThemeToggle = dynamic(
  () =>
    import("@/components/composed/theme-toggle").then((mod) => mod.ThemeToggle),
  {
    ssr: false,
  },
);

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isAuthenticated, user } = useAuth();
  const userName = user?.name || "Guest";

  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");

  const openAuth = (mode: "login" | "signup") => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthProvider>
            <SidebarLayout
              navbar={
                <Navbar>
                  <NavbarSpacer />
                  <NavbarSection>
                    {isAuthenticated ? (
                      <Dropdown>
                        <DropdownButton as={NavbarItem}>
                          <Avatar initials={userName.charAt(0)} square />
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
                    ) : (
                      <>
                        <Button plain onClick={() => openAuth("login")}>
                          Log in
                        </Button>
                        <Button color="blue" onClick={() => openAuth("signup")}>
                          Sign up
                        </Button>
                      </>
                    )}
                  </NavbarSection>
                </Navbar>
              }
              sidebar={
                <Sidebar>
                  <SidebarHeader>
                    <div className="flex w-full items-start justify-start pb-6 pt-2">
                      <Image
                        src={LogoDark}
                        alt="RankFlow Logo"
                        className="max-h-5 w-auto dark:hidden"
                        layout="intrinsic"
                      />
                      <Image
                        src={LogoLight}
                        alt="RankFlow Logo"
                        className="hidden max-h-5 w-auto dark:block"
                        layout="intrinsic"
                      />
                    </div>

                    <Dropdown>
                      <DropdownButton as={SidebarItem} className="lg:mb-2.5">
                        <Avatar initials="WS" />
                        <SidebarLabel>
                          {isAuthenticated ? "flowfully.webflow.io" : "Demo Site"}
                        </SidebarLabel>
                        <ChevronDownIcon />
                      </DropdownButton>
                      <DropdownMenu
                        className="min-w-80 lg:min-w-64"
                        anchor="bottom start"
                      >
                        {isAuthenticated ? (
                          <>
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
                              <DropdownLabel>
                                Connect new site&hellip;
                              </DropdownLabel>
                            </DropdownItem>
                          </>
                        ) : (
                          <DropdownItem onClick={() => openAuth("signup")}>
                            <PlusIcon />
                            <DropdownLabel>
                              Sign up to connect your site
                            </DropdownLabel>
                          </DropdownItem>
                        )}
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
                      {isAuthenticated ? (
                        <>
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
                        </>
                      ) : (
                        <SidebarItem onClick={() => openAuth("signup")}>
                          <PlusIcon className="h-5 w-5" />
                          <SidebarLabel>Sign up to sync collections</SidebarLabel>
                        </SidebarItem>
                      )}
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
                      <SidebarItemPlaceholder>
                        <ThemeToggle />
                      </SidebarItemPlaceholder>
                    </SidebarSection>
                  </SidebarBody>
                  <SidebarFooter>
                    <Dropdown>
                      <DropdownButton as={SidebarItem}>
                        <span className="flex min-w-0 items-center gap-3">
                          <Avatar
                            initials={isAuthenticated ? userName.charAt(0) : "G"}
                            className="size-10"
                            square
                            alt=""
                          />
                          <span className="min-w-0">
                            <span className="block truncate text-sm/5 font-medium text-zinc-950 dark:text-white">
                              {isAuthenticated ? userName : "Guest"}
                            </span>
                            <span className="block truncate text-xs/5 font-normal text-zinc-500 dark:text-zinc-400">
                              {isAuthenticated
                                ? `${userName.toLowerCase()}@example.com`
                                : "Not signed in"}
                            </span>
                          </span>
                        </span>
                        <ChevronUpIcon />
                      </DropdownButton>
                      <DropdownMenu className="min-w-64" anchor="top start">
                        {isAuthenticated ? (
                          <>
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
                          </>
                        ) : (
                          <>
                            <DropdownItem onClick={() => openAuth("login")}>
                              <UserIcon />
                              <DropdownLabel>Log in</DropdownLabel>
                            </DropdownItem>
                            <DropdownItem onClick={() => openAuth("signup")}>
                              <PlusIcon />
                              <DropdownLabel>Sign up</DropdownLabel>
                            </DropdownItem>
                          </>
                        )}
                      </DropdownMenu>
                    </Dropdown>
                  </SidebarFooter>
                </Sidebar>
              }
            >
              {children}
            </SidebarLayout>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
