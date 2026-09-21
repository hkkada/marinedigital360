'use client';

import Link from 'next/link';
import { ServiceData, getServiceHref } from '@/lib/services';
import * as LucideIcons from 'lucide-react';
import { Card, CardTitle, CardBody, IconBox } from '@/components/shared';

interface ServiceCardProps {
  service: ServiceData;
  index: number;
}

export function ServiceCard({ service, index }: ServiceCardProps) {
  const Icon = LucideIcons[service.iconName as keyof typeof LucideIcons] as React.FC<{ className?: string }>;
  const href = service.isVisible ? getServiceHref(service) : '/#services';

  // flex-1 (not h-full) so a sibling child link can share the grid cell
  // without the card pushing it out of the menu.
  return (
    <Link href={href} className="flex-1 min-h-0">
      <Card
        variant="light"
        size="sm"
        className="h-full flex flex-col"
        variants={{
          hidden: { opacity: 0, y: 10 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { delay: index * 0.05 },
          },
        }}
        aria-label={`Learn more about ${service.title}`}
      >
        <IconBox icon={Icon} size="sm" className="mb-3" />
        <CardTitle className="mb-1">{service.title}</CardTitle>
        <CardBody className="line-clamp-2 sm:min-h-[2.5rem]">{service.tagline}</CardBody>
      </Card>
    </Link>
  );
}
