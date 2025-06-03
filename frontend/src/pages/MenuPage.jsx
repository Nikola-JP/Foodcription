import React, { useEffect, useState } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

const DAYS = [
  "Ponedjeljak",
  "Utorak",
  "Srijeda",
  "Četvrtak",
  "Petak",
  "Subota",
  "Nedjelja"
];

const MenuPage = () => {
  const [meals, setMeals] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const fromDashboard = searchParams.get("fromDashboard") === "true";
  const navigate = useNavigate();
  const [selectedMeals, setSelectedMeals] = useState([]); // id-evi jela koje je korisnik odabrao
  const [user, setUser] = useState(null);
  const [selectedDay, setSelectedDay] = useState(""); // <-- dodano
  const [selectedMealsByDay, setSelectedMealsByDay] = useState({});

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    setUser(userData);
    const token = userData?.token;

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

  const handleMealClick = (mealId) => {
    if (fromDashboard && selectedDay) {
      navigate(`/meal/${mealId}?fromDashboard=true&day=${selectedDay}`);
    } else {
      navigate(`/meal/${mealId}`);
    }
  };

  const plan = (user?.plan || user?.pretplata?.tipPretplate || "").toLowerCase();
  const maxMeals = plan === "premium" ? 7 : 5;

  const handleAddMeal = async (meal) => {
    if (!selectedDay) {
      alert("Molimo odaberite dan za koji dodajete jelo.");
      return;
    }
    const mealsForDay = selectedMealsByDay[selectedDay] || [];
    if (mealsForDay.length >= maxMeals) {
      alert(`Dosegli ste maksimalan broj jela za svoj plan (${maxMeals}).`);
      return;
    }
    if (mealsForDay.includes(meal.id)) return;

    // 1. Ažuriraj lokalni meni
    const updatedMealsForDay = [...mealsForDay, meal.id];
    const updated = { ...selectedMealsByDay, [selectedDay]: updatedMealsForDay };
    setSelectedMealsByDay(updated);
    localStorage.setItem("selectedMealsByDay", JSON.stringify(updated));

    // 2. Pripremi payload za backend: SVE dane i SVA jela
    const menuToSend = [];
    for (const [day, mealIds] of Object.entries(updated)) {
      mealIds.forEach(mealId => {
        menuToSend.push({ day, mealId });
      });
    }

    // 3. Pošalji cijeli meni na backend
    const token = user?.token;
    try {
      await fetch("http://localhost:8080/api/user/meals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(menuToSend),
      });
    } catch (err) {
      alert("Greška pri slanju na server.");
    }
  };

  if (loading) return <div>Učitavanje...</div>;
  if (error) return <div>Greška: {error}</div>;
  if (!user) return <div>Učitavanje korisnika...</div>;

  return (
    <div className="bg-white min-h-screen">
      <main className="max-w-6xl mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">
          Pregled ovog mjesečnog menija
        </h1>

        {/* Izbornik za dan */}
        <div className="mb-6">
          <label className="mr-2 font-semibold">Odaberi dan:</label>
          <select
            value={selectedDay}
            onChange={e => setSelectedDay(e.target.value)}
            className="border rounded px-2 py-1"
          >
            <option value="">-- Odaberi dan --</option>
            {DAYS.map(day => (
              <option key={day} value={day}>{day}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          {meals.map(meal => {
            const mealsForDay = selectedMealsByDay[selectedDay] || [];
            return (
              <div key={meal.id} className="text-center group">
                <div onClick={() => handleMealClick(meal.id)}>
                  <div className="relative w-[230px] h-[290px] mx-auto">
                    <img
                      src={encodeURI(meal.image)}
                      alt={meal.naziv}
                      className="w-full h-full rounded-[53px] object-cover border-2 border-[#14AE5C] shadow-md transition-transform duration-300 group-hover:rotate-1 group-hover:scale-105 group-hover:shadow-lg"
                    />
                  </div>
                </div>
                <p className="mt-2 font-semibold text-gray-700">{meal.naziv}</p>
                {/* Dodaj gumb za dodavanje */}
                {user && (
                  <button
                    className="mt-2 bg-green-600 text-white px-4 py-1 rounded"
                    disabled={mealsForDay.length >= maxMeals || mealsForDay.includes(meal.id)}
                    onClick={() => handleAddMeal(meal)}
                  >
                    {mealsForDay.includes(meal.id) ? "Dodano" : "Dodaj u jelovnik"}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MenuPage;
