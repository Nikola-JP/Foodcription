import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import SubscriptionPlans from "./SubscriptionPlans";
import FAQs from "./Faq";
import Footer from "./Footer";

const SubscriptionPage = () => {
  return (
    <>
      <HeroSection
        title="Pretplati se već danas"
        subtitle="Zdravi i ukusni obroci dostavljeni na tvoja vrata"
        backgroundImage="/src/assets/HeroImage.jpg"
        primaryButton="Odaberi plan"
        secondaryButton="Kontaktiraj nas"
      />
      <SubscriptionPlans />
      <FAQs />
      <Footer />
    </>
  );
};

export default SubscriptionPage;
