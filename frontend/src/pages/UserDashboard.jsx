import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useNavigate } from "react-router-dom";
import Footer from '../components/Footer';
import ChangePasswordModal from '../components/ChangePasswordModal';

const UserDashboard = ({ weeklyRecommendation = 'Zdrava preporuka tjedna' }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Pull user from localStorage or sessionStorage
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/login"); // Redirect if not logged in
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, [navigate]);

  if (!user) return null;

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* 📦 Glavni sadržaj u gridu */}
      <main className="flex-1 px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 items-center justify-center gap-8 max-w-7xl mx-auto">
          {/* 🎥 Lijevi video */}
          <div className="hidden lg:block w-full h-[480px] rounded-xl overflow-hidden shadow-lg border-2 border-green-500">
            <video src="/videos/chef1.mp4" autoPlay muted loop playsInline className="w-full h-full object-cover" />
          </div>

          {/* 🍪 Srednji sadržaj */}
          <div className="text-center space-y-6">
            <h2 className="text-2xl font-bold">{weeklyRecommendation}</h2>
            <img
              src="/images/Macrons.jpg"
              alt="Preporuka"
              className="w-80 h-[480px] mx-auto rounded-xl border-2 border-green-500 object-cover shadow-md hover:shadow-xl transition"
            />
          </div>

          {/* 🎥 Desni video */}
          <div className="hidden lg:block w-full h-[480px] rounded-xl overflow-hidden shadow-lg border-2 border-green-500">
            <video src="/videos/chef2.mp4" autoPlay muted loop playsInline className="w-full h-full object-cover" />
          </div>
        </div>

        {/* 👋 Pozdrav i gumbi ispod */}
        <div className="text-center mt-12 space-y-8">
          <h1 className="text-3xl font-bold">Pozdrav, {user.imeKorisnika}!</h1>
          <div>
            <h2 className="text-2xl font-bold mb-2">Poruka tjedna:</h2>
            <p className="text-xl font-semibold">Tko rano rani, dvije sreće grabi!</p>
          </div>
          <div className="flex flex-col md:flex-row gap-6 justify-center">
            <Link to="/uredi-profil">
              <button className="bg-green-600 text-white text-xl px-10 py-4 rounded-full shadow-lg hover:bg-green-700 hover:scale-105 transition">
                ✏️ Uredi profil
              </button>
            </Link>

            <Link to="/jelovnik">
              <button className="bg-green-600 text-white text-xl px-10 py-4 rounded-full shadow-lg hover:bg-green-700 hover:scale-105 transition">
                🍽️ Promijeni jelovnik
              </button>
            </Link>

            {/* Only show this button if user is admin */}
            {user.role === 'admin' && (
              <Link to="/tablica">
                <button className="bg-green-600 text-white text-xl px-10 py-4 rounded-full shadow-lg hover:bg-green-700 hover:scale-105 transition">
                  👥 Pregled korisnika
                </button>
              </Link>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default UserDashboard;
