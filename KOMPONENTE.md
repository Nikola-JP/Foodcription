📁 src/components/Navbar.jsx

import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

function Navbar({ onSignIn, onRegister }) {
  return (
    <nav className="flex justify-between items-center p-4 bg-white shadow-md">
      <img src={logo} alt="Foodcription Logo" className="h-16 w-auto" />
      <ul className="flex space-x-6 text-gray-700 font-medium">
        <li><Link to="/">Plans</Link></li>
        <li><Link to="/menu">On Menu</Link></li>
        <li><Link to="/pretplata">Cijene</Link></li>
        <li>Kontakt</li>
        <li>
          <button onClick={onSignIn} className="px-4 py-2 rounded-full border border-green-500 text-green-500 hover:bg-green-500 hover:text-white transition">Sign in</button>
        </li>
        <li>
          <button onClick={onRegister} className="px-4 py-2 rounded-full bg-green-500 text-white hover:bg-green-600 transition">Register</button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
📁 src/components/Footer.jsx

const Footer = () => {
  return (
    <footer className="bg-[#14AE5C] text-white text-center py-4 text-sm">
      <div className="max-w-7xl mx-auto px-4">
        <p>⟵ Povratak na landing page</p>
        <p className="mt-1">Coded by Chase & Darkimundus</p>
      </div>
    </footer>
  );
};

export default Footer;
📁 src/pages/MenuPage.jsx

import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';

const MenuPage = () => {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    // OVO ODKOMENTIRATI KADA SE POSTAVI BAZA:
    // fetch('/api/jela')
    //   .then(res => res.json())
    //   .then(data => setMeals(data))
    //   .catch(err => console.error('Greška pri dohvaćanju jela:', err));

    setMeals([
      { id: 1, naziv: 'Štrukli sa sirom', image: '/images/shtrukli.jpg' },
      { id: 2, naziv: 'Goulash', image: '/images/goulash.jpg' },
      { id: 3, naziv: 'Voćna salata', image: '/images/fruit.jpg' },
      { id: 4, naziv: 'Miso Ramen', image: '/images/misosoup.jpg' },
      { id: 5, naziv: 'Pita od povrća', image: '/images/foodbowl.jpg' },
      { id: 6, naziv: 'Pesto pasta', image: '/images/pesto.jpg' },
      { id: 7, naziv: 'Pileća salata', image: '/images/piletinasalata.jpg' }
    ]);
  }, []);

  return (
    <div className="bg-white min-h-screen">
      <main className="max-w-6xl mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Pregled ovo mjesečnog menija</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          {meals.map(meal => (
            <div key={meal.id} className="text-center group transform transition duration-300 ease-in-out hover:rotate-1 hover:scale-105">
              <img
                src={meal.image}
                alt={meal.naziv}
                className="w-[230px] h-[290px] rounded-[53px] mx-auto object-cover border-2 border-[#14AE5C] shadow-md group-hover:shadow-lg"
              />
              <p className="mt-2 font-semibold text-gray-700">{meal.naziv}</p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MenuPage;


📁 src/pages/MealDetailPage.jsx (Skeleton – prilagodi po potrebi)

import { useParams } from 'react-router-dom';
import Footer from '../components/Footer';

const MealDetailPage = () => {
  const { id } = useParams();
  const meal = {
    naziv: 'Salata sa pilećim medaljonima',
    opis: 'Hrskavi pileći medaljoni, sočna rajčica i svježa sezonska salata...',
    slika: '/images/medaljoni.jpg',
    nutrijenti: {
      proteini: 32,
      ugljikohidrati: 14,
      masti: 8
    },
    recenzije: [
      { autor: 'Maja', grad: 'Zagreb', tekst: 'Super ukusno!' }
    ]
  };

  // OVO ODKOMENTIRATI KADA SE SPOJI BACKEND:
  // useEffect(() => {
  //   fetch(`/api/jela/${id}`)
  //     .then(res => res.json())
  //     .then(data => setMeal(data));
  // }, []);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto py-12 px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
        <img src={meal.slika} alt={meal.naziv} className="rounded-lg w-full object-cover" />
        <div>
          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">Salate</span>
          <h1 className="text-3xl font-bold mt-2">{meal.naziv}</h1>
          <p className="mt-4 text-gray-700">{meal.opis}</p>
          <div className="mt-6">
            <h3 className="font-semibold mb-2">Nutritivne vrijednosti (na porciju)</h3>
            <ul className="list-disc ml-6 text-gray-600">
              <li>Proteini: {meal.nutrijenti.proteini}g</li>
              <li>Ugljikohidrati: {meal.nutrijenti.ugljikohidrati}g</li>
              <li>Masti: {meal.nutrijenti.masti}g</li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MealDetailPage;

📄 App.jsx → Dodaj rute
jsx
Kopiraj
Uredi
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import AuthModal from './components/AuthModal';
import useAuthModal from './hooks/useAuthModal';

import MenuPage from './pages/MenuPage';
import SubscriptionPage from './pages/SubscriptionPage';
import MealDetailPage from './pages/MealDetailPage';
// (landing components ovdje...)

function App() {
  const { isOpen, mode, openModal, closeModal } = useAuthModal();

  return (
    <Router>
      <Navbar onSignIn={() => openModal('login')} onRegister={() => openModal('register')} />
      <AuthModal isOpen={isOpen} mode={mode} onClose={closeModal} />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/pretplata" element={<SubscriptionPage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/meal/:id" element={<MealDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;