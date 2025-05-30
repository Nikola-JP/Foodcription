import React from 'react';

const MealReviews = ({ recenzije }) => (
  <div className="max-w-6xl mx-auto px-4 py-12">
    <h2 className="text-2xl font-bold mb-6">Recenzije hrane</h2>
    <div className="grid md:grid-cols-3 gap-6">
      {recenzije.map((r, idx) => (
        <div key={idx} className="bg-white p-4 rounded shadow border">
          <div className="text-green-600 mb-2">★★★★★</div>
          <p className="text-gray-700 text-sm">{r.tekst}</p>
          <div className="mt-4 text-sm text-gray-500 font-semibold">{r.autor}</div>
          <div className="text-xs text-gray-400">{r.grad}</div>
        </div>
      ))}
    </div>
  </div>
);

export default MealReviews;