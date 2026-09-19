import dynamic from 'next/dynamic';
import { Hero } from '@/components/Hero';
import { Navigation } from '@/components/Navigation/Navigation';
import { ScrollToTop } from '@/components/ScrollToTop';
import { StructuredData } from '@/components/StructuredData';

// Lazy-load below-fold components to reduce initial JS bundle (HTML still server-rendered for SEO)
const Intro = dynamic(() => import('@/components/Intro').then(mod => ({ default: mod.Intro })));
const Experience = dynamic(() => import('@/components/Experience').then(mod => ({ default: mod.Experience })));
const Services = dynamic(() => import('@/components/Services').then(mod => ({ default: mod.Services })));
const Portfolio = dynamic(() => import('@/components/Portfolio').then(mod => ({ default: mod.Portfolio })));
const About = dynamic(() => import('@/components/About').then(mod => ({ default: mod.About })));
const FAQ = dynamic(() => import('@/components/FAQ').then(mod => ({ default: mod.FAQ })));
const Contact = dynamic(() => import('@/components/Contact').then(mod => ({ default: mod.Contact })));

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <StructuredData />
      <header>
        <Navigation />
      </header>
      <main>
        <Hero />
        <Intro />
         <Services />
        <Experience />

        {/* <Portfolio /> */}
        <About />
        {/* <FAQ /> */}
      </main>
      <Contact />
      <ScrollToTop />
    </div>
  );
}
