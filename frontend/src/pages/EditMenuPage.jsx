import { useState, useEffect } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import Footer from '../components/Footer';

const daysOrder = [
  'Ponedjeljak', 'Utorak', 'Srijeda', 'Četvrtak', 'Petak', 'Subota', 'Nedjelja'
];

const sampleMeals = daysOrder.map(day => ({ day, name: '', id: null, delivered: false }));

const EditMenuPage = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userName = user?.ime || "Korisnik";
  const subscriptionType = user?.plan?.toLowerCase() || "basic";
  const [meals, setMeals] = useState([]);
  const [allMeals, setAllMeals] = useState([]);
  const [searchParams] = useSearchParams();
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedMealsByDay, setSelectedMealsByDay] = useState({});
  const location = useLocation();

  // Dohvati sva jela iz baze na početku
  useEffect(() => {
    const token = user?.token;
    fetch("http://localhost:8080/api/meals", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => setAllMeals(data));
  }, []);

  // Dohvati korisnikov meni i spoji s allMeals
  const fetchAndSetMeals = () => {
    const token = user?.token;
    fetch("http://localhost:8080/api/user/meals", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => {
        // Napravi mapu dan -> jeloId za brzu provjeru
        const byDay = {};
        data.forEach(item => {
          byDay[item.dan] = item.jeloId;
        });
        setSelectedMealsByDay(byDay);

        // Pripremi prikaz za svaki dan
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
        setMeals(baseMeals);
      });
  };

  useEffect(() => {
    if (!allMeals || allMeals.length === 0) return;
    fetchAndSetMeals();
    // eslint-disable-next-line
  }, [location, allMeals]);

  // Ako postoji day u URL-u, postavi ga kao selectedDay
  useEffect(() => {
    const dayFromUrl = searchParams.get("day");
    if (dayFromUrl) setSelectedDay(dayFromUrl);
  }, [searchParams]);

  // PATCH za zamjenu/dodavanje jela
  const handleAddOrUpdateMeal = async (meal) => {
    if (!selectedDay) {
      alert("Molimo odaberite dan za koji dodajete jelo.");
      return;
    }
    const token = user?.token;
    // Provjeri postoji li već to jelo za taj dan
    const mealIdForDay = selectedMealsByDay[selectedDay];
    if (mealIdForDay === meal.id) {
      // već postoji to jelo za taj dan
      return;
    }

    await fetch(`http://localhost:8080/api/user/meals/${selectedDay}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ mealId: meal.id }),
    });
    fetchAndSetMeals();
  };

  // PATCH za zamjenu jela (ako imaš poseban gumb)
  const handleReplaceMeal = async (dan, noviMealId) => {
    const token = user?.token;
    await fetch(`http://localhost:8080/api/user/meals/${dan}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ mealId: noviMealId }),
    });
    fetchAndSetMeals();
  };

  // DELETE za uklanjanje jela
  const handleRemoveMeal = async (dan) => {
    const token = user?.token;
    await fetch(`http://localhost:8080/api/user/meals/${dan}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchAndSetMeals();
  };

  // Prikaz dana ovisno o pretplati
  const filteredMeals = subscriptionType === 'premium'
    ? meals
    : meals.filter(meal =>
        ['Ponedjeljak', 'Utorak', 'Srijeda', 'Četvrtak', 'Petak'].includes(meal.day)
      );

  const today = new Date();
  const firstDay = new Date(today.setDate(today.getDate() - today.getDay() + 1));
  const lastDay = new Date(firstDay);
  lastDay.setDate(firstDay.getDate() + (subscriptionType === 'premium' ? 6 : 4));

  const formatDate = (date) =>
    `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}.`;

  // Spremi cijeli meni (POST)
  const handleSaveChanges = async () => {
    const token = user?.token;
    // Pripremi podatke za backend
    const menuToSend = meals
      .filter(meal => meal.id)
      .map(meal => ({ dan: meal.day, jeloId: meal.id }));

    await fetch("http://localhost:8080/api/user/meals", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(menuToSend),
    });

    alert("Izmjene spremljene!");
    fetchAndSetMeals();
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <main className="flex-1 max-w-6xl mx-auto py-12 px-4">
        <h1 className="text-4xl font-extrabold mb-4 text-green-700 text-center drop-shadow">
          Dobro došli {userName}
        </h1>
        <h2 className="text-2xl font-semibold mb-2 text-center text-gray-700">
          Vaša odabrana jela za nadolazeći tjedan
        </h2>
        <p className="mb-8 font-medium text-center text-gray-500">
          {formatDate(firstDay)} - {formatDate(lastDay)} Tjedan:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
          {filteredMeals.map((meal, index) => (
            <div
              key={index}
              className="bg-white border-2 border-green-200 shadow-xl rounded-3xl p-6 flex flex-col items-center transition-transform hover:scale-105 hover:shadow-2xl"
            >
              <p className="font-bold mb-2 text-lg text-green-700">{meal.day}</p>
              {!meal.name ? (
                <div className="flex flex-col items-center justify-center h-full w-full">
                  <div className="w-full h-48 flex items-center justify-center bg-gray-100 rounded-3xl mb-4 text-gray-400 text-lg">
                    Nema jela
                  </div>
                  <Link to={`/menu?fromDashboard=true&day=${meal.day}`}>
                    <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full font-semibold shadow transition">
                      Dodaj jelo
                    </button>
                  </Link>
                </div>
              ) : (
                <>
                  <div className="relative w-56 h-56 mb-4">
                    <img
                      src={meal.image ? meal.image : `/images/${encodeURIComponent(meal.name)}.jpg`}
                      alt={meal.name}
                      className="w-full h-full rounded-3xl object-cover border-2 border-green-400 shadow-md transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="bg-green-100 text-green-800 p-2 rounded-xl mb-3 font-semibold text-center w-full">
                    {meal.name}
                  </div>
                  <div className="flex gap-2 w-full justify-center">
                    <button
                      onClick={() => handleRemoveMeal(meal.day)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-full font-medium shadow transition"
                    >
                      Ukloni
                    </button>
                    <Link to={`/menu?fromDashboard=true&day=${meal.day}`}>
                      <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded-full font-medium shadow transition">
                        Zamijeni jelo
                      </button>
                    </Link>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default EditMenuPage;
