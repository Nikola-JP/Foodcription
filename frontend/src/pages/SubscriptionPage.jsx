import HeroSection from "../components/HeroSection";
import SubscriptionPlans from "../components/SubscriptionPlans";
import FAQs from "../components/Faq";
import Footer from "../components/Footer";

const SubscriptionPage = () => {
  return (
    <>
      <HeroSection
        title="Pretplati se već danas"
        subtitle="Zdravi i ukusni obroci dostavljeni na tvoja vrata"
        backgroundImage="public/images/HeroImage.jpg"
      />
      <SubscriptionPlans />
      <FAQs />
      <Footer />
    </>
  );
};

export default SubscriptionPage;
