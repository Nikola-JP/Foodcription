import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const MenuPage = () => {
  const [meals, setMeals] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;

  if (!token) {
    setError("User not authenticated.");
    setLoading(false);
    return;
  }

  fetch("http://localhost:8080/api/meals/count", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => {
      if (!res.ok) throw new Error("Greška pri dohvatu broja jela");
      return res.json();
    })
    .then(data => {
      setCount(data.count);
      return fetch("http://localhost:8080/api/meals", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });
    })
    .then(res => {
      if (!res.ok) throw new Error("Greška pri dohvatu jela");
      return res.json();
    })
    .then(data => {
      const formattedMeals = data.map(item => ({
        id: item.id,
        naziv: item.naziv,
        image: item.imgPath
      }));
      setMeals(formattedMeals);
      setLoading(false);
    })
    .catch(err => {
      setError(err.message);
      setLoading(false);
    });
}, []);

  if (loading) return <div>Učitavanje...</div>;
  if (error) return <div>Greška: {error}</div>;

  return (
    <div className="bg-white min-h-screen">
      <main className="max-w-6xl mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">
          Pregled ovog mjesečnog menija
        </h1>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          {meals.map(meal => (
            <div key={meal.id} className="text-center group">
              <Link to={`/meal/${meal.id}`}>
                <div className="relative w-[230px] h-[290px] mx-auto">
                  <img
                    src={encodeURI(meal.image)}
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
