import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/app/globals.css';
import AppLayout from '@/components/app-layout';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "RankFlow | Use AI with Webflow's CMS",
  description: "RankFlow is a tool that allows you to use AI with Webflow's CMS to get better search results.",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AppLayout user={null} sites={null}>
            {children}
            <Toaster />
          </AppLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
