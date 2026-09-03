import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Manifesto from '@/components/Manifesto';
import HowIWork from '@/components/HowIWork';
import StatsBar from '@/components/StatsBar';
import Services from '@/components/Services';
import CaseStudies from '@/components/CaseStudies';
import Testimonials from '@/components/Testimonials';
import CTA from '@/components/CTA';
import Certifications from '@/components/Certifications';
import Footer from '@/components/Footer';
import BackToTop from '@/components/backToTop';

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Manifesto />
      <HowIWork />
      <StatsBar />
      <Services />
      <CaseStudies />
      <Testimonials />
      <CTA />
      <Certifications />
      <Footer />

      <BackToTop />
    </>
  );
}