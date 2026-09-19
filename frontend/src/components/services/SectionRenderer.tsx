'use client';

import { Fragment } from 'react';
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
import { ContentBlock } from './ContentBlock';

interface SectionRendererProps {
  sections: ServiceSection[];
  serviceName: string;
  iconName: string;
}

function renderSection(section: ServiceSection, serviceName: string, iconName: string) {
  switch (section.type) {
    case 'service-hero':
      return <ServiceHero data={section.data} serviceName={serviceName} iconName={iconName} />;
    case 'service-overview':
      return <ServiceOverview data={section.data} />;
    case 'process-timeline':
      return <ProcessTimeline data={section.data} />;
    case 'service-faq':
      return <ServiceFAQ data={section.data} />;
    case 'service-cta':
      return <ServiceCTA data={section.data} />;
    case 'transformation-showcase':
      return <TransformationShowcase data={section.data} />;
    case 'deliverables-grid':
      return <DeliverablesGrid data={section.data} />;
    case 'client-segments':
      return <ClientSegments data={section.data} />;
    case 'discipline-breakdown':
      return <DisciplineBreakdown data={section.data} />;
    case 'metrics-results':
      return <MetricsResults data={section.data} />;
    case 'tech-stack':
      return <TechStack data={section.data} />;
    case 'portfolio-showcase':
      return <PortfolioShowcase data={section.data} />;
    case 'pricing-tiers':
      return <PricingTiers data={section.data} />;
    case 'platform-coverage':
      return <PlatformCoverage data={section.data} />;
    case 'partner-network':
      return <PartnerNetwork data={section.data} />;
    case 'content-block':
      return <ContentBlock data={section.data} />;
    default:
      return null;
  }
}

export function SectionRenderer({ sections, serviceName, iconName }: SectionRendererProps) {
  return (
    <>
      {sections.map((section, index) => {
        const content = renderSection(section, serviceName, iconName);

        // The anchor target is owned here, not by the section components, so
        // *any* section type becomes linkable by adding an `id` to the page
        // data — no per-component plumbing, and one place defining the scroll
        // offset (`scroll-mt-anchor`) for every one of them. The wrapper adds
        // no layout of its own.
        // No id: render as before, with no wrapper element at all.
        if (!section.id) {
          return <Fragment key={index}>{content}</Fragment>;
        }

        return (
          <div key={index} id={section.id} className="scroll-mt-anchor">
            {content}
          </div>
        );
      })}
    </>
  );
}
