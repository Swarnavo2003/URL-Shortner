import FeaturesSection from "@/components/FeaturesSection";
import FooterSection from "@/components/FooterSection";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";

const LandingPage = () => {
  return (
    <div>
      <Header />
      <HeroSection />
      <FeaturesSection />
      <div className="border-t bg-white dark:bg-transparent">
        <FooterSection />
      </div>
    </div>
  );
};

export default LandingPage;
