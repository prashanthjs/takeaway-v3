import type { ReactNode } from 'react';
import { Footer } from './footer';
import { Header } from './header';
import { Sidebar } from './sidebar';

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen w-screen flex-row">
      <Sidebar />
      <div className="flex flex-auto flex-col">
        <Header />
        <main className="flex flex-grow">{children}</main>
        <Footer />
      </div>
    </div>
  );
}
