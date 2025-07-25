import { Geist, Geist_Mono } from 'next/font/google';

import './globals.css';
import type { Metadata } from 'next';

import ReactQueryClientProvider from '@/providers/ReactQueryClientProvider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  manifest: '/manifest.webmanifest',
  title: 'Medical Vocabulary Learning App',
  description: 'A web app for learning medical vocabulary',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-screen overflow-hidden`}
      >
        <ReactQueryClientProvider>{children}</ReactQueryClientProvider>
      </body>
    </html>
  );
}
