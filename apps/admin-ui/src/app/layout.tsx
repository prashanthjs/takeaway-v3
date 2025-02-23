import { Metadata, Viewport } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import clsx from 'clsx';
import { fontSans } from '@admin-ui/config/fonts';
import { siteConfig } from '@admin-ui/config/site';
import '@admin-ui/styles/globals.css';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: siteConfig.favicon,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();
  const messages = await getMessages();
  return (
    <html suppressHydrationWarning lang={locale}>
      <head />
      <body className={clsx('relative h-full w-full font-sans antialiased', fontSans.variable)}>
        <main className="relative flex min-h-screen w-screen flex-col">
          <NextIntlClientProvider messages={messages}>
            <Providers themeProps={{ attribute: 'class', defaultTheme: 'dark' }}>{children}</Providers>
          </NextIntlClientProvider>
        </main>
      </body>
    </html>
  );
}
