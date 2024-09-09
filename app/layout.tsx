import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/app/globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { SidebarLayout } from '@/components/ui/sidebar-layout';
import SidebarNavbar from '@/components/sidebar-navbar';
import { Sidebar, SidebarBody, SidebarFooter, SidebarHeader, SidebarItem, SidebarItemPlaceholder, SidebarLabel, SidebarLogo, SidebarSection, SidebarSpacer } from '@/components/ui/sidebar';
import SitesDropdown from '@/components/sites-dropdown';
import CollectionsSidebarSection from '@/components/collections-sidebar-section';
import { headers } from 'next/headers';
import { LightBulbIcon, QuestionMarkCircleIcon, SparklesIcon } from '@heroicons/react/16/solid';
import { ThemeToggle } from '@/components/theme-toggle';
import { SidebarAccountDropdown } from '@/components/sidebar-account-dropdown';

const inter = Inter({ subsets: ['latin'] });


export const metadata: Metadata = {
  title: "RankFlow | Use AI with Webflow's CMS",
  description: "RankFlow is a tool that allows you to use AI with Webflow's CMS to get better search results.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const headersList = headers();
  const pathname = headersList.get('x-pathname');

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SidebarLayout
            navbar={<SidebarNavbar />}
            sidebar={
              <Sidebar>
          <SidebarHeader>
            <SidebarLogo />
            
            <SidebarSpacer />

            <SitesDropdown />
          </SidebarHeader>

          <SidebarBody>
            <CollectionsSidebarSection />

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
            <SidebarAccountDropdown />
          </SidebarFooter>
        </Sidebar>
            }
          >
            {children}
          </SidebarLayout>
          </ThemeProvider>
        </body>
    </html>
  );
}
