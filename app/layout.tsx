import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/app/globals.css';
import { ThemeProvider } from '@/ui/theme-provider';
import { SidebarLayout } from '@/components/sidebar-layout';
import SidebarNavbar from '@/ui/sidebar-navbar';
import {
  Sidebar,
  SidebarBody,
  SidebarFooter,
  SidebarHeader,
  SidebarSpacer,
} from '@/components/sidebar';
import SitesDropdown from '@/ui/sites-dropdown';
import CollectionsSidebarSection from '@/ui/collections-sidebar-section';
import { SidebarAccountDropdown } from '@/ui/sidebar-account-dropdown';
import JsonLd from '@/ui/json-ld';
import SidebarSectionGlobalLinks from '@/ui/sidebar-section-global-links';
import { SidebarLogo } from '@/ui/sidebar-logo';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: "RankFlow | Use AI with Webflow's CMS",
    template: '%s | RankFlow',
  },
  description:
    "RankFlow is a tool that allows you to use AI with Webflow's CMS to get better search results.",
  keywords: ['RankFlow', 'AI', 'Webflow', 'CMS', 'SEO', 'Content Optimization'],
  authors: [{ name: 'RankFlow Team' }],
  creator: 'RankFlow',
  publisher: 'RankFlow',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://www.rankflow.ai'),
  alternates: {
    canonical: 'https://www.rankflow.ai',
  },
  openGraph: {
    title: "RankFlow | Use AI with Webflow's CMS",
    description:
      "RankFlow is a tool that allows you to use AI with Webflow's CMS to get better search results.",
    url: 'https://www.rankflow.ai',
    siteName: 'RankFlow',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'RankFlow - AI-powered Webflow CMS optimization',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  // TODO: Add Twitter card
  // twitter: {
  //   card: 'summary_large_image',
  //   title: "RankFlow | Use AI with Webflow's CMS",
  //   description: "RankFlow is a tool that allows you to use AI with Webflow's CMS to get better search results.",
  //   images: ['/twitter-image.png'],
  //   creator: '@rankflow',
  // },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png' }],
    // TODO: Add mask icon
    // other: [
    //   {
    //     rel: 'mask-icon',
    //     url: '/safari-pinned-tab.svg',
    //   },
    // ],
  },
  manifest: '/manifest.json',
  other: {
    'msapplication-TileColor': '#363636',
    'theme-color': '#363636',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <JsonLd />
      </head>
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

                  <SidebarSectionGlobalLinks />
                </SidebarBody>

                <SidebarFooter className="max-lg:hidden">
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
