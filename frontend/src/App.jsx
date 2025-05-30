import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import FeatureGrid from "./components/FeatureGrid";
import InfoGrid from "./components/InfoGrid";
import PromoBanner from "./components/PromoBanner";
import AuthModal from "./components/AuthModal";
import SubscriptionPage from "./pages/SubscriptionPage";
import useAuthModal from "./hooks/useAuthModal";
import Footer from "./components/Footer";
import MenuPage from './pages/MenuPage';
import MealDetailPage from './pages/MealDetailPage';


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
                backgroundImage="/images/HeroImage.jpg"
                primaryButton="Odaberi plan"
                secondaryButton="Kontaktiraj nas"
              />
              <FeatureGrid />
              <InfoGrid />
              <PromoBanner />
              <Footer />
            </>
          }
        />
        <Route path="/pretplata" element={<SubscriptionPage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/meal/:id" element={<MealDetailPage />} />
        
      </Routes>
    </Router>
  );
}

export default App;
