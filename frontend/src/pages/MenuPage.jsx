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

const fetchUserMenu = async (token) => {
  const res = await fetch("http://localhost:8080/api/user/meals", {
    headers: { Authorization: `Bearer ${token}` }
  });
  return await res.json(); // [{ dan: "Ponedjeljak", jeloId: 3 }, ...]
};

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

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    const token = userData?.token;

    if (!token) return;

    fetchUserMenu(token)
      .then(data => {
        // data je npr. [{ day: "Ponedjeljak", mealId: 3 }, ...]
        // Pretvori u objekt za lakše ažuriranje
        const byDay = {};
        data.forEach(item => {
          if (!byDay[item.day]) byDay[item.day] = [];
          byDay[item.day].push(item.mealId);
        });
        setSelectedMealsByDay(byDay);
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

  // Funkcija za provjeru je li dan zaključan za basic korisnika
  const isDayLocked = (day) => {
    if (plan === "premium") return false;
    return day === "Subota" || day === "Nedjelja";
  };

  const handleAddMeal = async (meal) => {
    if (!selectedDay) {
      alert("Molimo odaberite dan za koji dodajete jelo.");
      return;
    }
    const token = user?.token;
    // 1. Dohvati postojeći meni s backend-a
    let currentMenu = await fetchUserMenu(token);

    // 2. Pretvori u objekt za lakše ažuriranje
    const menuByDay = {};
    currentMenu.forEach(item => {
      menuByDay[item.dan] = item.jeloId;
    });

    // 3. Ažuriraj ili dodaj novo jelo za odabrani dan
    menuByDay[selectedDay] = meal.id;

    // 4. Pripremi payload za backend: SVE dane i SVA jela
    const menuToSend = Object.entries(menuByDay).map(([dan, jeloId]) => ({ dan, jeloId }));

    // 5. Pošalji cijeli meni na backend
    try {
      await fetch("http://localhost:8080/api/user/meals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(menuToSend),
      });
      // Osvježi lokalno stanje
      setSelectedMealsByDay(prev => ({ ...prev, [selectedDay]: [meal.id] }));
      localStorage.setItem("selectedMealsByDay", JSON.stringify({ ...menuByDay, [selectedDay]: meal.id }));
    } catch (err) {
      alert("Greška pri slanju na server.");
    }
  };

  const handleAddOrUpdateMeal = async (meal) => {
    if (!selectedDay) {
      alert("Molimo odaberite dan za koji dodajete jelo.");
      return;
    }
    const token = user?.token;
    try {
      await fetch(`http://localhost:8080/api/user/meals/${selectedDay}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ mealId: meal.id }),
      });
      // Osvježi prikaz menija
      const updatedMenu = await fetchUserMenu(token);
      const byDay = {};
      updatedMenu.forEach(item => {
        byDay[item.dan] = item.jeloId;
      });
      setSelectedMealsByDay(byDay);
    } catch (err) {
      alert("Greška pri spremanju jela.");
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
              <option
                key={day}
                value={day}
                disabled={isDayLocked(day)}
                style={isDayLocked(day) ? { color: "#aaa" } : {}}
              >
                {day}
                {isDayLocked(day) ? " (nije dostupno za basic)" : ""}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          {meals.map(meal => {
            const mealIdForDay = selectedMealsByDay[selectedDay];
            // Gumb je onemogućen samo ako nije odabran dan ili je dan zaključan
            const disabled = !selectedDay || isDayLocked(selectedDay);
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
                {user && (
                  <button
                    className={`mt-2 px-4 py-1 rounded text-white ${
                      disabled
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-green-600 hover:bg-green-700"
                    }`}
                    disabled={disabled}
                    onClick={() => handleAddOrUpdateMeal(meal)}
                    title={
                      isDayLocked(selectedDay)
                        ? "Ovaj dan nije dostupan za basic pretplatu"
                        : ""
                    }
                  >
                    {mealIdForDay === meal.id
                      ? "Dodano"
                      : isDayLocked(selectedDay)
                      ? "Nije dostupno"
                      : "Dodaj u jelovnik"}
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
