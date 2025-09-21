import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Space_Grotesk, Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import Header from '@/components/header';
import { SoundProvider } from '@/components/sound-provider';
import dynamic from 'next/dynamic';

// Dynamically import the AppLoader to avoid hydration issues
const AppLoaderClient = dynamic(() => import('./AppLoader'), { ssr: false });

// Space Grotesk font similar to bjornflow.com
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

// Inter as secondary font
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Sufail Ahammed N - Full Stack Developer',
  description: 'Full Stack Developer specializing in Next.js, Tailwind CSS, and JavaScript',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${spaceGrotesk.variable} ${inter.variable} font-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <SoundProvider>
            {/* App Loader */}
            <AppLoaderClient />

            <Header />
            <main className="pt-16">
              {children}
            </main>
            <Toaster />
          </SoundProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}