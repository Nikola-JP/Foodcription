import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
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
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const { isOpen, mode, openModal, closeModal } = useAuthModal();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const handleCloseAuthModal = () => {
    closeModal();
    const stored = localStorage.getItem("user");
    if (stored) {
      setUser(JSON.parse(stored)); // Update state after login
    }
  };

  return (
    <Router>
      <Navbar
        user={user}
        onLogout={handleLogout}
        onSignIn={() => openModal("login")}
        onRegister={() => openModal("register")}
      />
      <AuthModal isOpen={isOpen} mode={mode} onClose={handleCloseAuthModal} />

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
        <Route path="/menu" element={<ProtectedRoute onRequireLogin={() => openModal("login")}><MenuPage /></ProtectedRoute>} />
        <Route path="/meal/:id" element={<ProtectedRoute onRequireLogin={() => openModal("login")}><MealDetailPage /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute onRequireLogin={() => openModal("login")}><Dashboard /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
