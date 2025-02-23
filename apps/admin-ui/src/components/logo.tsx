import Image from 'next/image';
import logoIcon from '@admin-ui/assets/images/logo-icon.png';
import logo from '@admin-ui/assets/images/logo.png';
import { cn } from '@admin-ui/lib/utils';

type LogoProps = {
  className?: string;
  isIconOnly?: boolean;
};

export function Logo({ className, isIconOnly }: LogoProps) {
  return <Image alt="logo" src={isIconOnly ? logoIcon : logo} className={cn('', className)} />;
}
