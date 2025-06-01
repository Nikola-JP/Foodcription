import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
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

  const buttons = [
    { label: "UREDI PROFIL", path: "/profil" },
    { label: "IZMIJENI JELOVNIK", path: "/jelovnik" },
    { label: "IZMIJENI PRETPLATU", path: "/pretplata" },
    { label: "IZMIJENI NARUDŽBU", path: "/narudzba" },
  ];

  const adminButtons = [
    { label: "LISTA KORISNIKA", path: "/korisnici" },
    { label: "LISTA JELOVNIKA", path: "/jelovnici" },
    { label: "LISTA AKTIVNIH PRETPLATI", path: "/pretplate" },
    { label: "LISTA AKTIVNIH NARUDŽBI", path: "/narudzbe" },
  ];

  if (!user) return null;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Dobrodošli, {user.imeKorisnika}
      </h2>
      <div className="grid gap-4">
        {[...buttons, ...(user.role === "admin" ? adminButtons : [])].map((btn) => (
          <button
            key={btn.path}
            onClick={() => navigate(btn.path)}
            className="bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          >
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
