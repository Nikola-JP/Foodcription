import { useParams, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import MealHeader from '../components/MealHeader';
import MealNutrition from '../components/MealNutrition';
import MealReviews from '../components/MealReviews';
import NewsletterSection from '../components/NewsletterSection';
import Footer from '../components/Footer';

function parseNutritivneVrijednosti(nutritivneString) {
  const lines = nutritivneString.split('\n');
  const nutrijenti = {};

  lines.forEach(line => {
    const match = line.match(/-?(\w+):\s*(\d+)g?/i);
    if (match) {
      const key = match[1].toLowerCase();
      const value = parseInt(match[2], 10);
      nutrijenti[key] = value;
    }
  });

  return nutrijenti;
}

const MealDetailPage = () => {
  const { id } = useParams(); // za pristup preko ID-a
  const [searchParams] = useSearchParams(); // za pristup preko ?meal=...&day=...

  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const mealNameFromParams = searchParams.get("meal");
  const selectedDay = searchParams.get("day");
  const fromDashboard = searchParams.get("fromDashboard") === "true";

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.token;

    if (!token) {
      setError("User not authenticated.");
      setLoading(false);
      return;
    }

    // Ako imamo meal name iz search parametara
    const endpoint = id
      ? `http://localhost:8080/api/meals/${id}`
      : `http://localhost:8080/api/meals/naziv/${encodeURIComponent(mealNameFromParams)}`;

    fetch(endpoint, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => {
        if (!res.ok) throw new Error('Jelo nije pronađeno');
        return res.json();
      })
      .then(data => {
        const nutrijenti = parseNutritivneVrijednosti(data.nutritivneVrijednosti);
        setMeal({
          id: data.id,
          naziv: data.naziv,
          opis: data.opis,
          slika: data.imgPath,
          kategorija: data.kategorija,
          nutrijenti,
          recenzije: [
            { autor: 'Maja', grad: 'Zagreb', tekst: 'Odlična salata!' },
            { autor: 'Ivan', grad: 'Rijeka', tekst: 'Medaljoni top, svježa rajčica, super dressing.' },
            { autor: 'Lucija', grad: 'Split', tekst: 'Nešto fino bez grižnje savjesti.' }
          ]
        });
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [id, mealNameFromParams]);

  if (loading) return <p className="text-center mt-10">Učitavanje podataka o jelu...</p>;
  if (error) return <p className="text-center mt-10 text-red-600">Greška: {error}</p>;

  return (
    <div className="bg-white min-h-screen">
      <MealHeader meal={meal} selectedDay={selectedDay} fromDashboard={fromDashboard} />
      <MealNutrition nutrijenti={meal.nutrijenti} />
      <MealReviews recenzije={meal.recenzije} />
      <NewsletterSection />
      <Footer />
    </div>
  );
};

export default MealDetailPage;
