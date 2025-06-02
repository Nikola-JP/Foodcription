import React from 'react';

const MealHeader = ({ meal, selectedDay, fromDashboard }) => {
  const handleAddToMenu = () => {
    // Ako se ne zna dan, ne radi ništa
    if (!selectedDay) return;

    // 🛠️ Ovo se odkomentira kada backend endpoint bude spreman
    /*
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.token;

    fetch('http://localhost:8080/api/user/meals', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        day: selectedDay,
        mealId: meal.id
      })
    })
    .then(res => {
      if (!res.ok) throw new Error("Greška pri dodavanju jela");
      return res.json();
    })
    .then(data => {
      console.log('Jelo dodano:', data);
      // Možeš ovdje preusmjeriti ili pokazati notifikaciju
    })
    .catch(err => {
      console.error("Greška:", err.message);
    });
    */

    alert(`Jelo "${meal.naziv}" dodano za dan ${selectedDay}`);
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

        {fromDashboard && (
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
