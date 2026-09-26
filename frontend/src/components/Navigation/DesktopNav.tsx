'use client';

import { usePathname } from 'next/navigation';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from '@/components/ui/navigation-menu';
import { ServicesMegaMenu } from './ServicesMegaMenu';

const LINKS = [
  { label: 'Industries', href: '/#industries' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact-us' },
];

/**
 * White links on the navy bar; the current section is cyan with a cyan rule
 * under it, and hovering any link draws the same rule in. The shadcn
 * primitives default to `accent` fills and near-black `accent-foreground` text
 * on hover/focus/open — built for a light surface — so each is overridden.
 */
const itemBase =
  'relative h-auto px-0 py-2 text-body font-medium text-white bg-transparent rounded-none transition-colors ' +
  'hover:bg-transparent hover:text-brand-cyan focus:bg-transparent focus:text-white focus-visible:text-brand-cyan ' +
  'after:absolute after:left-0 after:-bottom-1.5 after:h-0.5 after:w-full after:origin-left after:scale-x-0 ' +
  'after:rounded-full after:bg-brand-cyan after:transition-transform after:duration-200 hover:after:scale-x-100';

const activeClasses =
  'data-[active=true]:bg-transparent data-[active=true]:text-brand-cyan data-[active=true]:after:scale-x-100 ' +
  'data-[active=true]:hover:bg-transparent data-[active=true]:focus:bg-transparent data-[active=true]:focus:text-brand-cyan';

export function DesktopNav() {
  const pathname = usePathname();
  const servicesActive = pathname.startsWith('/services');

  return (
    <NavigationMenu viewport={false} className="static">
      <NavigationMenuList className="gap-6 xl:gap-10">
        {/* Services with mega menu */}
        <NavigationMenuItem className="static">
          <NavigationMenuTrigger
            data-active={servicesActive || undefined}
            className={`${itemBase} ${activeClasses} data-[state=open]:bg-transparent data-[state=open]:text-brand-cyan data-[state=open]:hover:bg-transparent data-[state=open]:focus:bg-transparent [&>svg]:size-4 [&>svg]:ml-1.5`}
          >
            Services
          </NavigationMenuTrigger>
          <NavigationMenuContent className="!fixed !left-1/2 !-translate-x-1/2 !top-auto !mt-4 !w-auto !rounded-2xl !border-gray-200/60 !shadow-2xl !bg-transparent !p-0 overflow-visible">
            <ServicesMegaMenu />
          </NavigationMenuContent>
        </NavigationMenuItem>

        {LINKS.map((link) => (
          <NavigationMenuItem key={link.label}>
            <NavigationMenuLink
              href={link.href}
              active={pathname === link.href}
              aria-current={pathname === link.href ? 'page' : undefined}
              className={`${itemBase} ${activeClasses} block`}
            >
              {link.label}
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
