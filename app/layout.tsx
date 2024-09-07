import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/app/globals.css';
import AppLayout from '@/components/app-layout';
import { ThemeProvider } from '@/components/theme-provider';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "RankFlow | Use AI with Webflow's CMS",
  description: "RankFlow is a tool that allows you to use AI with Webflow's CMS to get better search results.",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const supabase = createServerComponentClient({ cookies });
  const { data: { session } } = await supabase.auth.getSession();

  return (
    <html lang='en' suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
          <AppLayout user={session?.user ?? null} sites={null}>
            {children}
          </AppLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
