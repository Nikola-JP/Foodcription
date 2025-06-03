import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Footer from '../components/Footer';

const daysOrder = [
  'Ponedjeljak', 'Utorak', 'Srijeda', 'Četvrtak', 'Petak', 'Subota', 'Nedjelja'
];

const sampleMeals = [
  { day: 'Ponedjeljak', name: '', id: null, delivered: false },
  { day: 'Utorak', name: '', id: null, delivered: false },
  { day: 'Srijeda', name: '', id: null, delivered: false },
  { day: 'Četvrtak', name: '', id: null, delivered: false },
  { day: 'Petak', name: '', id: null, delivered: false },
  { day: 'Subota', name: '', id: null, delivered: false },
  { day: 'Nedjelja', name: '', id: null, delivered: false },
];

const EditMenuPage = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userName = user?.ime || "Korisnik";
  const subscriptionType = user?.plan?.toLowerCase() || "basic";
  const [meals, setMeals] = useState([]);
  const [removedMeals, setRemovedMeals] = useState({});
  const [allMeals, setAllMeals] = useState([]);
  const location = useLocation();

  // Dohvati sva jela iz baze na početku
  useEffect(() => {
    fetch("http://localhost:8080/api/meals")
      .then(res => res.json())
      .then(data => setAllMeals(data));
  }, []);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.token;

    // Ako allMeals nije još stigao, čekaj!
    if (!allMeals || allMeals.length === 0) return;

    fetch("http://localhost:8080/api/user/meals", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => {
        let baseMeals = sampleMeals.map(dayObj => {
          const found = data.find(item => item.dan === dayObj.day);
          if (found && found.jeloId) {
            const mealInfo = allMeals.find(m => m.id === found.jeloId);
            return {
              ...dayObj,
              id: found.jeloId,
              name: mealInfo ? mealInfo.naziv : "",
              image: mealInfo ? mealInfo.imgPath : "",
              delivered: false
            };
          }
          return dayObj;
        });

        const pendingMenu = JSON.parse(localStorage.getItem("pendingMenu")) || {};
        const mergedMeals = baseMeals.map(meal => {
          if (pendingMenu.hasOwnProperty(meal.day)) {
            if (pendingMenu[meal.day] === null) {
              return { ...meal, name: "", id: null, image: "" };
            }
            return { ...meal, ...pendingMenu[meal.day] };
          }
          return meal;
        });

        setMeals(mergedMeals);
      });
  }, [location, allMeals]);

  const removeMeal = (day) => {
    setRemovedMeals(prev => ({ ...prev, [day]: true }));

    // Ažuriraj pendingMenu u localStorage
    const pendingMenu = JSON.parse(localStorage.getItem("pendingMenu")) || {};
    pendingMenu[day] = null; // ili {} ako ti je lakše za provjeru
    localStorage.setItem("pendingMenu", JSON.stringify(pendingMenu));

    // Ažuriraj meals state (opcionalno, ako želiš odmah prikazati promjenu)
    setMeals(prevMeals =>
      prevMeals.map(meal =>
        meal.day === day ? { ...meal, name: "", id: null } : meal
      )
    );
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

  const handleSaveChanges = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.token;

    // Pripremi podatke za backend
    const menuToSend = meals.map(meal => ({
      day: meal.day,
      mealId: meal.id || null
    }));

    await fetch("http://localhost:8080/api/user/meals", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(menuToSend),
    });

    localStorage.removeItem("pendingMenu");
    alert("Izmjene spremljene!");
  };

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

              {removedMeals[meal.day] || !meal.name ? (
                // Ako je uklonjeno, prikaži gumb za dodavanje
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="w-full h-24 flex items-center justify-center bg-gray-100 rounded mb-2 text-gray-400">
                    Nema jela
                  </div>
                  <Link to={`/menu?fromDashboard=true&day=${meal.day}`}>
                    <button className="bg-green-600 text-white px-3 py-1 rounded-full">
                      Dodaj jelo
                    </button>
                  </Link>
                </div>
              ) : (
                <>
                  <img
                    src={meal.image ? meal.image : `/images/${encodeURIComponent(meal.name)}.jpg`}
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
                      <Link to={`/menu?fromDashboard=true&day=${meal.day}`}>
                        <button className="bg-green-600 text-white px-3 py-1 rounded-full">
                          Zamijeni jelo
                        </button>
                      </Link>
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>

        <button onClick={handleSaveChanges} className="mt-8 bg-green-600 text-white px-6 py-2 rounded-full">
          💾 Spremi izmjene
        </button>
      </div>
      <Footer />
    </>
  );
};

export default EditMenuPage;
