import React from 'react';

const MealHeader = ({ meal }) => (
  <div className="max-w-6xl mx-auto py-12 px-4 grid md:grid-cols-2 gap-8">
    <img src={meal.slika} alt={meal.naziv} className="rounded-lg w-full object-cover" />

    <div>
      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">{meal.kategorija}</span>
      <h1 className="text-3xl font-bold mt-2">{meal.naziv}</h1>
      <button className="mt-4 mb-6 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
        Dodaj u jelovnik
      </button>

      <div className="bg-gray-50 p-4 rounded-lg">
        <h2 className="font-semibold mb-1">Opis jela</h2>
        <p className="text-gray-700 whitespace-pre-line">{meal.opis}</p>
      </div>
    </div>
  </div>
);

export default MealHeader;