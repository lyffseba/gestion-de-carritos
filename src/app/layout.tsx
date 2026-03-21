import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { CartDrawer } from '@/components/ui/CartDrawer';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1, // Prevents iOS input zoom on forms
  userScalable: false,
  themeColor: '#000000', // Ensures the iPhone 15 dynamic island/status bar blends perfectly
};

export const metadata: Metadata = {
  title: 'KR_NODE // CORE',
  description: 'Sistema de control y monitoreo de flota. Telemetría en tiempo real.',
  appleWebApp: {
    capable: true,
    title: 'KR_NODE',
    statusBarStyle: 'black-translucent',
  },
  formatDetection: {
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <Header />
        <main className="flex-1 flex flex-col">{children}</main>
        <Footer />
        <CartDrawer />
      </body>
    </html>
  );
}
