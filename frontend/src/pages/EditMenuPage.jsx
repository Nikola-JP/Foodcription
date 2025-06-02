import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const sampleMeals = [
  { id: 2, day: 'Ponedjeljak', name: 'Štrukli sa sirom', delivered: true },
  { id: 3, day: 'Utorak', name: 'Goulash', delivered: false },
  { id: 4, day: 'Srijeda', name: 'Voćna salata', delivered: false },
  { id: 5, day: 'Četvrtak', name: 'Pesto pasta', delivered: false },
  { id: 6, day: 'Petak', name: 'Juha od dinje', delivered: false },
  { id: 7, day: 'Subota', name: 'Štrukli sa sirom', delivered: false },
  { id: 8, day: 'Nedjelja', name: 'Goulash', delivered: false },
]; //DODATI IDeve koji trebaju biti za njih 

const EditMenuPage = ({ userName = 'Korisnik', subscriptionType = 'basic' }) => {
  const [meals, setMeals] = useState(sampleMeals);
  const [removedMeals, setRemovedMeals] = useState({}); // Praćenje koji su dani uklonjeni

  const removeMeal = (day) => {
    // Označi jelo za taj dan kao uklonjeno
    setRemovedMeals(prev => ({ ...prev, [day]: true }));
  };

  // Prikaz dana ovisno o pretplati
  const filteredMeals = subscriptionType === 'premium'
    ? meals
    : meals.filter(meal => [
        'Ponedjeljak',
        'Utorak',
        'Srijeda',
        'Četvrtak',
        'Petak'
      ].includes(meal.day));

  const today = new Date();
  const firstDay = new Date(today.setDate(today.getDate() - today.getDay() + 1));
  const lastDay = new Date(firstDay);
  lastDay.setDate(firstDay.getDate() + (subscriptionType === 'premium' ? 6 : 4));

  const formatDate = (date) =>
    `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}.`;

  return (
    <>
      
      <div className="p-8 text-center">
        <h1 className="text-3xl font-bold mb-6">Dobro došli {userName}</h1>
        <h2 className="text-xl font-semibold mb-2">Vaša odabrana jela za nadolazeći tjedan</h2>
        <p className="mb-6 font-medium">
          {formatDate(firstDay)} - {formatDate(lastDay)} Tjedan:
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {filteredMeals.map((meal, index) => (
            <div key={index} className="border p-4 rounded-xl">
              <p className="font-semibold mb-1">{meal.day}</p>

              {removedMeals[meal.day] ? (
                // Ako je uklonjeno, prikaži gumb za dodavanje
                <Link to={`/meal/${meal.id}?fromDashboard=true&day=${meal.day}`}>
                  <button className="bg-blue-500 text-white px-3 py-1 rounded-full">➕ Dodaj jelo</button>
                </Link>
              ) : (
                <>
                  <img
                    src={`/images/${encodeURIComponent(meal.name)}.jpg`}
                    alt={meal.name}
                    className="rounded mb-2"
                  />
                  <div className="bg-green-100 p-2 rounded-xl mb-2">{meal.name}</div>

                  {/* 🛠️ Backend kolega: ovdje dohvatiti status dostave iz API-ja */}
                  {/* Primjer: fetch(`/api/delivery-status?user=123&day=${meal.day}`) */}
                  {meal.delivered ? (
                    <span className="text-sm text-gray-500">🚚 Dostavljeno</span>
                  ) : (
                    <div className="space-x-2">
                      <button
                        onClick={() => removeMeal(meal.day)}
                        className="bg-green-600 text-white px-3 py-1 rounded-full"
                      >
                        Ukloni
                      </button>
                      <button className="bg-green-600 text-white px-3 py-1 rounded-full">
                        Zamijeni jelo
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>

        <button className="mt-8 bg-green-600 text-white px-6 py-2 rounded-full">
          💾 Spremi izmjene
        </button>
      </div>
      <Footer />
    </>
  );
};

export default EditMenuPage;
