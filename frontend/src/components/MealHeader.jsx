import React from 'react';
import { useNavigate } from "react-router-dom";

const MealHeader = ({ meal, selectedDay, fromDashboard }) => {
  const navigate = useNavigate();

  const handleAddToMenu = () => {
    const pendingMenu = JSON.parse(localStorage.getItem("pendingMenu")) || {};
    // Mapiraj polja na očekivana imena u EditMenuPage
    pendingMenu[selectedDay] = {
      id: meal.id,
      name: meal.naziv, // OVO je bitno!
      image: meal.slika || meal.imgPath, // Ovisno kako se zove polje
      delivered: false
    };
    localStorage.setItem("pendingMenu", JSON.stringify(pendingMenu));
    navigate("/jelovnik");
  };

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 grid md:grid-cols-2 gap-8">
      <img
        src={meal.slika}
        alt={meal.naziv}
        className="rounded-lg w-full object-cover"
      />

      <div>
        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
          {meal.kategorija}
        </span>
        <h1 className="text-3xl font-bold mt-2">{meal.naziv}</h1>

        {fromDashboard && selectedDay && (
          <button
            onClick={handleAddToMenu}
            className="mt-4 mb-6 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          >
            ➕ Dodaj u jelovnik za {selectedDay}
          </button>
        )}

        <div className="bg-gray-50 p-4 rounded-lg">
          <h2 className="font-semibold mb-1">Opis jela</h2>
          <p className="text-gray-700 whitespace-pre-line">{meal.opis}</p>
        </div>
      </div>
    </div>
  );
};

export default MealHeader;
