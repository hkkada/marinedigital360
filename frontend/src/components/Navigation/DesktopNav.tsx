'use client';

import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from '@/components/ui/navigation-menu';
import { ServicesMegaMenu } from './ServicesMegaMenu';

interface DesktopNavProps {
  isScrolled: boolean;
}

export function DesktopNav({ isScrolled }: DesktopNavProps) {
  const textColor = isScrolled ? 'text-gray-900' : 'text-white';

  return (
    <NavigationMenu viewport={false} className="static">
      <NavigationMenuList className="gap-8">
        {/* Services with mega menu */}
        <NavigationMenuItem className="static">
          <NavigationMenuTrigger
            className={`text-base font-medium ${textColor} bg-transparent hover:bg-transparent data-[state=open]:bg-transparent focus:bg-transparent`}
          >
            Services
          </NavigationMenuTrigger>
          <NavigationMenuContent className="!fixed !left-1/2 !-translate-x-1/2 !top-auto !mt-4 !w-auto !rounded-2xl !border-gray-200/60 !shadow-2xl !bg-transparent !p-0 overflow-visible">
            <ServicesMegaMenu />
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Simple anchor links */}
        {['Work', 'About', 'Contact'].map((link) => (
          <NavigationMenuItem key={link}>
            <NavigationMenuLink
              href={`/#${link.toLowerCase()}`}
              className={`text-base font-medium relative group ${textColor} px-0 py-2 hover:bg-transparent focus:bg-transparent data-[active=true]:bg-transparent`}
            >
              {link}
              {/* Hover underline animation */}
              <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-[var(--nav-link-blue)] transition-all duration-150 group-hover:w-full" />
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
