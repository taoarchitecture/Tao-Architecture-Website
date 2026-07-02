'use client';

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SmoothScroll from '@/components/layout/SmoothScroll';

interface AppShellProps {
  children: ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');

  if (isAdminRoute) {
    return <>{children}</>;
  }

  return (
    <SmoothScroll>
      <Navbar />
      {children}
      <Footer />
    </SmoothScroll>
  );
}
