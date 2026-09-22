import dynamic from 'next/dynamic';
import { Hero } from '@/components/Hero';
import { Navigation } from '@/components/Navigation/Navigation';
import { ScrollToTop } from '@/components/ScrollToTop';
import { StructuredData } from '@/components/StructuredData';
import { Footer } from '@/components/Footer';

// Lazy-load below-fold components to reduce initial JS bundle (HTML still server-rendered for SEO)
const Experience = dynamic(() => import('@/components/Experience').then(mod => ({ default: mod.Experience })));
const Services = dynamic(() => import('@/components/Services').then(mod => ({ default: mod.Services })));
const Industries = dynamic(() => import('@/components/Industries').then(mod => ({ default: mod.Industries })));
const Portfolio = dynamic(() => import('@/components/Portfolio').then(mod => ({ default: mod.Portfolio })));
const About = dynamic(() => import('@/components/About').then(mod => ({ default: mod.About })));
const FAQ = dynamic(() => import('@/components/FAQ').then(mod => ({ default: mod.FAQ })));

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <StructuredData />
      <header>
        <Navigation />
      </header>
      <main>
        <Hero />
         <Services />
        <Experience />
        <Industries />

        {/* <Portfolio /> */}
        <About />
        {/* <FAQ /> */}
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
