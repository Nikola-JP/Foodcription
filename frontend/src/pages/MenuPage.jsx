import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const MenuPage = () => {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    // 👉 TODO: Zamijeniti s fetch kad backend bude spojen
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
            <div key={meal.id} className="text-center group">
              <Link to={`/meal/${meal.id}`}>
                <div className="relative w-[230px] h-[290px] mx-auto">
                  <img
                    src={meal.image}
                    alt={meal.naziv}
                    className="w-full h-full rounded-[53px] object-cover border-2 border-[#14AE5C] shadow-md transition-transform duration-300 group-hover:rotate-1 group-hover:scale-105 group-hover:shadow-lg"
                  />
                </div>
              </Link>
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
