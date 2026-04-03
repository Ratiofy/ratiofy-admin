import type { ReactNode } from 'react';
import { Toaster } from 'sonner';
import Sidebar from './Sidebar';

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 ml-64 p-10">{children}</main>
      <Toaster position="bottom-right" theme="dark" closeButton richColors />
    </div>
  );
}
