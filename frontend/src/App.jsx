import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import FeatureGrid from './components/FeatureGrid';
import InfoGrid from './components/InfoGrid';
import PromoBanner from './components/PromoBanner';
import AuthModal from './components/AuthModal';
import useAuthModal from './hooks/useAuthModal';

function App() {
  const { isOpen, mode, openModal, closeModal } = useAuthModal();
  return (
    <div>
      <Navbar onSignIn={() => openModal('login')} onRegister={() => openModal('register')}/>
      <HeroSection />
      <FeatureGrid />
      <InfoGrid />
      <PromoBanner />
      <AuthModal isOpen={isOpen} mode={mode} onClose={closeModal} />
    </div>
  );
}

export default App;
