import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import FeatureGrid from "./components/FeatureGrid";
import InfoGrid from "./components/InfoGrid";
import PromoBanner from "./components/PromoBanner";
import AuthModal from "./components/AuthModal";
import SubscriptionPage from "./components/SubscriptionPage";
import useAuthModal from "./hooks/useAuthModal";

function App() {
  const { isOpen, mode, openModal, closeModal } = useAuthModal();

  return (
    <Router>
      <Navbar
        onSignIn={() => openModal("login")}
        onRegister={() => openModal("register")}
      />
      <AuthModal isOpen={isOpen} mode={mode} onClose={closeModal} />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <HeroSection
                title="Pretplati se već danas"
                subtitle="Zdravi i ukusni obroci dostavljeni na tvoja vrata"
                backgroundImage="/src/assets/HeroImage.jpg"
                primaryButton="Odaberi plan"
                secondaryButton="Kontaktiraj nas"
              />
              <FeatureGrid />
              <InfoGrid />
              <PromoBanner />
            </>
          }
        />
        <Route path="/pretplata" element={<SubscriptionPage />} />
      </Routes>
    </Router>
  );
}

export default App;
