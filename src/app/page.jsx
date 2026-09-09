import LuxuryNavbar from '../components/landing/Navbar';
import HeroSection from '../components/landing/Hero';
import Introduction from '@/components/landing/Introduction';
import RecipientSection from '@/components/landing/ResidencesLanding';
import VisionSection from '@/components/landing/VisionSection';
import Footer from '@/components/landing/Footer';

export default function Home() {
  return (
    <main className="bg-[#0B0D12] min-h-screen text-[#F4F1EA]">
      <LuxuryNavbar />
      <HeroSection />
      <Introduction/>
      <RecipientSection/>
      <VisionSection/>
      <Footer/>
    </main>
  );
}