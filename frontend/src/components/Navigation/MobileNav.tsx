'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, ChevronDown } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { getVisibleServices } from '@/lib/services';

interface MobileNavProps {
  isScrolled: boolean;
}

export function MobileNav({ isScrolled }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const services = getVisibleServices();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={`w-12 h-12 ${isScrolled ? 'text-gray-900' : 'text-white'} hover:bg-transparent`}
          aria-label="Open navigation menu"
          aria-expanded={open}
        >
          <Menu className="w-6 h-6" />
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="w-[85vw] max-w-[320px]">
        <SheetHeader>
          <SheetTitle className="text-xl">
            MARINE<span className="font-light"> DIGITAL 360</span>
          </SheetTitle>
        </SheetHeader>

        <nav className="flex flex-col gap-2 mt-8">
          {/* Services accordion */}
          <Collapsible open={servicesOpen} onOpenChange={setServicesOpen}>
            <CollapsibleTrigger className="flex items-center justify-between w-full py-3 px-4 text-base font-medium hover:bg-gray-100 rounded-lg transition-colors">
              Services
              <ChevronDown className={`w-4 h-4 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
            </CollapsibleTrigger>
            <CollapsibleContent className="pl-4 pt-2 space-y-1">
              {services.map((service) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  onClick={() => setOpen(false)}
                  className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  {service.title}
                </Link>
              ))}
            </CollapsibleContent>
          </Collapsible>

          {/* Other links */}
          {['Work', 'About', 'Contact'].map((link) => (
            <Link
              key={link}
              href={`/#${link.toLowerCase()}`}
              onClick={() => setOpen(false)}
              className="py-3 px-4 text-base font-medium hover:bg-gray-100 rounded-lg transition-colors"
            >
              {link}
            </Link>
          ))}

          {/* CTA */}
          <Link
            href="/#contact"
            onClick={() => setOpen(false)}
            className="mt-4 py-3 px-4 bg-gray-900 text-white text-center rounded-full font-medium hover:bg-gray-800 transition-colors"
          >
            Start a Project
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
