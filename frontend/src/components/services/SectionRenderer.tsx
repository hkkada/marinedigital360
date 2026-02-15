'use client';

import type { ServiceSection } from '@/lib/service-pages/types';
import { ServiceHero } from './ServiceHero';
import { ServiceOverview } from './ServiceOverview';
import { ProcessTimeline } from './ProcessTimeline';
import { ServiceFAQ } from './ServiceFAQ';
import { ServiceCTA } from './ServiceCTA';
import { TransformationShowcase } from './TransformationShowcase';
import { DeliverablesGrid } from './DeliverablesGrid';
import { ClientSegments } from './ClientSegments';
import { DisciplineBreakdown } from './DisciplineBreakdown';
import { MetricsResults } from './MetricsResults';
import { TechStack } from './TechStack';
import { PortfolioShowcase } from './PortfolioShowcase';
import { PricingTiers } from './PricingTiers';
import { PlatformCoverage } from './PlatformCoverage';
import { PartnerNetwork } from './PartnerNetwork';

interface SectionRendererProps {
  sections: ServiceSection[];
  serviceName: string;
  iconName: string;
}

export function SectionRenderer({ sections, serviceName, iconName }: SectionRendererProps) {
  return (
    <>
      {sections.map((section, index) => {
        switch (section.type) {
          case 'service-hero':
            return (
              <ServiceHero
                key={index}
                data={section.data}
                serviceName={serviceName}
                iconName={iconName}
              />
            );
          case 'service-overview':
            return <ServiceOverview key={index} data={section.data} />;
          case 'process-timeline':
            return <ProcessTimeline key={index} data={section.data} />;
          case 'service-faq':
            return <ServiceFAQ key={index} data={section.data} />;
          case 'service-cta':
            return <ServiceCTA key={index} data={section.data} />;
          case 'transformation-showcase':
            return <TransformationShowcase key={index} data={section.data} />;
          case 'deliverables-grid':
            return <DeliverablesGrid key={index} data={section.data} />;
          case 'client-segments':
            return <ClientSegments key={index} data={section.data} />;
          case 'discipline-breakdown':
            return <DisciplineBreakdown key={index} data={section.data} />;
          case 'metrics-results':
            return <MetricsResults key={index} data={section.data} />;
          case 'tech-stack':
            return <TechStack key={index} data={section.data} />;
          case 'portfolio-showcase':
            return <PortfolioShowcase key={index} data={section.data} />;
          case 'pricing-tiers':
            return <PricingTiers key={index} data={section.data} />;
          case 'platform-coverage':
            return <PlatformCoverage key={index} data={section.data} />;
          case 'partner-network':
            return <PartnerNetwork key={index} data={section.data} />;
          default:
            return null;
        }
      })}
    </>
  );
}
