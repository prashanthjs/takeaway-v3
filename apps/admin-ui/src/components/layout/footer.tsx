import { MaxWidthWrapper } from '@/components/max-width-wrapper';
import { siteConfig } from '@/config/site';

export function Footer() {
  return (
    <header className="sticky bottom-0 z-50 bg-content1 text-sm text-default-400 inset-x-0">
      <MaxWidthWrapper className="h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <p className="text-md text">
            {new Date().getFullYear()} {siteConfig.company}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <a href="/">About</a>
          <a href="/">Help</a>
          <a href="/">Contact us</a>
        </div>
      </MaxWidthWrapper>
    </header>
  );
}
