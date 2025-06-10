import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/login");
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, [navigate]);

  const buttons = [
    { label: "Uredi profil", path: "/profil", color: "from-green-400 to-green-200" },
    { label: "Izmijeni jelovnik", path: "/jelovnik", color: "from-yellow-400 to-yellow-200" },
    { label: "Izmijeni pretplatu", path: "/pretplata", color: "from-blue-400 to-blue-200" },
    { label: "Izmijeni narudžbu", path: "/narudzba", color: "from-pink-400 to-pink-200" },
  ];

  const adminButtons = [
    { label: "Lista korisnika", path: "/korisnici", color: "from-purple-400 to-purple-200" },
    { label: "Lista jelovnika", path: "/jelovnici", color: "from-orange-400 to-orange-200" },
    { label: "Lista aktivnih pretplati", path: "/pretplate", color: "from-teal-400 to-teal-200" },
    { label: "Lista aktivnih narudžbi", path: "/narudzbe", color: "from-red-400 to-red-200" },
  ];

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex flex-col items-center px-4 py-8">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="bg-white rounded-3xl shadow-lg p-8 mb-8 text-center animate-fade-in">
          <h2 className="text-4xl font-extrabold mb-2 text-green-800 drop-shadow">
            Dobrodošli, {user.imeKorisnika || user.ime}!
          </h2>
          <p className="text-green-700 text-lg">
            {user.emailKorisnika || user.email}
          </p>
        </div>

        {/* User info table */}
        <div className="bg-white rounded-2xl shadow p-6 mb-10 animate-fade-in">
          <h3 className="text-xl font-semibold text-green-700 mb-4 text-left">Vaši podaci</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full border-separate border-spacing-y-2">
              <tbody>
                <tr>
                  <td className="font-semibold text-green-800 pr-4 py-2">Ime:</td>
                  <td className="bg-green-50 rounded-lg px-4 py-2">{user.imeKorisnika || user.ime}</td>
                </tr>
                <tr>
                  <td className="font-semibold text-green-800 pr-4 py-2">Prezime:</td>
                  <td className="bg-green-50 rounded-lg px-4 py-2">{user.prezimeKorisnika || user.prezime}</td>
                </tr>
                <tr>
                  <td className="font-semibold text-green-800 pr-4 py-2">Email:</td>
                  <td className="bg-green-50 rounded-lg px-4 py-2">{user.emailKorisnika || user.email}</td>
                </tr>
                <tr>
                  <td className="font-semibold text-green-800 pr-4 py-2">Broj mobitela:</td>
                  <td className="bg-green-50 rounded-lg px-4 py-2">{user.broj || user.mobKorisnika || user.phone || "-"}</td>
                </tr>
                <tr>
                  <td className="font-semibold text-green-800 pr-4 py-2">Uloga:</td>
                  <td className="bg-green-50 rounded-lg px-4 py-2 capitalize">{user.role?.toLowerCase() || "korisnik"}</td>
                </tr>
                {user.plan && (
                  <tr>
                    <td className="font-semibold text-green-800 pr-4 py-2">Pretplata:</td>
                    <td className="bg-green-50 rounded-lg px-4 py-2">{user.plan}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Action cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 animate-fade-in">
          {[...buttons, ...(user.role?.toLowerCase() === "admin" ? adminButtons : [])].map((btn) => (
            <button
              key={btn.path}
              onClick={() => navigate(btn.path)}
              className={`flex flex-col items-center justify-center bg-gradient-to-br ${btn.color} rounded-2xl shadow-lg px-8 py-10 hover:scale-105 hover:shadow-2xl transition-all border border-green-100 group`}
            >
              <span className="text-2xl font-bold text-green-900 mb-2 group-hover:text-green-700 transition">
                {btn.label}
              </span>
              <span className="h-1 w-12 bg-green-200 rounded-full group-hover:bg-green-400 transition"></span>
            </button>
          ))}
        </div>
      </div>
      <style>
        {`
          .animate-fade-in {
            animation: fadeIn 0.7s;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px);}
            to { opacity: 1; transform: translateY(0);}
          }
        `}
      </style>
    </div>
  );
};

export default Dashboard;
