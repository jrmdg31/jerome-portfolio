import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import CursorProvider from '@/components/CursorProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Jerome David — Virtual Assistant & Automation Specialist',
  description: 'Jerome David\'s portfolio showcasing expertise in virtual assistance, automation, and workflow optimization.',
  icons: [
    {
      rel: 'icon',
      type: 'image/x-icon',
      url: '/favicon.ico',
    },
    {
      rel: 'icon',
      type: 'image/png',
      url: '/favicon-32x32.png',
      sizes: '32x32',
    },
    {
      rel: 'icon',
      type: 'image/png',
      url: '/favicon-16x16.png',
      sizes: '16x16',
    },
    {
      rel: 'apple-touch-icon',
      url: '/apple-touch-icon.png',
    },
    {
      rel: 'manifest',
      url: '/site.webmanifest',
    },
    {
      rel: 'icon',
      type: 'image/png',
      url: '/android-chrome-192x192.png',
      sizes: '192x192',
    },
    {
      rel: 'icon',
      type: 'image/png',
      url: '/android-chrome-512x512.png',
      sizes: '512x512',
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} dark`} data-theme="dark">
        {/* Cursor effects client component */}
        <CursorProvider>{children}</CursorProvider>
      </body>
    </html>
  );
}