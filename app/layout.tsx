import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import CursorProvider from '@/components/CursorProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Jerome David — Virtual Assistant & Automation Specialist',
  description:
    "Jerome David's portfolio showcasing expertise in virtual assistance, automation, and workflow optimization.",
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
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