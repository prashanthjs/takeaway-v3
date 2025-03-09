import Image from 'next/image';
import logoIcon from '@/assets/images/logo-icon.png';
import logo from '@/assets/images/logo.png';
import { cn } from '@/utils/common';

type LogoProps = {
  className?: string;
  isIconOnly?: boolean;
};

export function Logo({ className, isIconOnly }: LogoProps) {
  return <Image alt="logo" src={isIconOnly ? logoIcon : logo} className={cn('', className)} />;
}
