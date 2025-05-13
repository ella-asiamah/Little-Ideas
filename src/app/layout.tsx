import type {Metadata} from 'next';
import { Inter } from 'next/font/google'; // Using Inter as a common, cheerful font. Geist is also fine.
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { cn } from '@/lib/utils';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter', // Changed from geist to inter for example, can revert if geist preferred
});

export const metadata: Metadata = {
  title: 'KindredGo - Spread Kindness!',
  description: 'An app to perform good deeds and rack up points, inspired by real-time interactive experiences.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.variable, "font-sans antialiased")}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
