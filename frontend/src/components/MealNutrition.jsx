import React from 'react';

const MealNutrition = ({ nutrijenti }) => (
  <div className="max-w-6xl mx-auto px-4 py-8">
    <h3 className="font-semibold mb-2 text-lg">Nutritivne vrijednosti (na porciju)</h3>
    <ul className="list-disc ml-6 text-gray-600">
      <li>Proteini: {nutrijenti.proteini}g</li>
      <li>Ugljikohidrati: {nutrijenti.ugljikohidrati}g</li>
      <li>Masti: {nutrijenti.masti}g</li>
    </ul>
  </div>
);

export default MealNutrition;
