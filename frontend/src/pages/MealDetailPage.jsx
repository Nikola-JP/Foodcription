// MealDetailPage.jsx
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import MealHeader from '../components/MealHeader';
import MealNutrition from '../components/MealNutrition';
import MealReviews from '../components/MealReviews';
import NewsletterSection from '../components/NewsletterSection';
import Footer from '../components/Footer';

const MealDetailPage = () => {
  const { id } = useParams();
  const [meal, setMeal] = useState(null);

  useEffect(() => {
    // 👉 TODO: Backend fetch zamijeniti kad bude dostupno
    setMeal({
      id,
      naziv: 'Salata sa pilećim medaljonima',
      opis: `Hrskavi pileći medaljoni, sočna rajčica i svježa sezonska salata...`,
      slika: '/images/piletinasalata.jpg',
      kategorija: 'Salate',
      nutrijenti: {
        proteini: 32,
        ugljikohidrati: 14,
        masti: 8
      },
      recenzije: [
        { autor: 'Maja', grad: 'Zagreb', tekst: 'Odlična salata!' },
        { autor: 'Ivan, 35', grad: 'Rijeka', tekst: 'Medaljoni top, svježa rajčica, super dressing.' },
        { autor: 'Lucija, 24', grad: 'Split', tekst: 'Nešto fino bez grižnje savjesti.' }
      ]
    });
  }, [id]);

  if (!meal) return <p className="text-center mt-10">Učitavanje podataka o jelu...</p>;

  return (
    <div className="bg-white min-h-screen">
      <MealHeader meal={meal} />
      <MealNutrition nutrijenti={meal.nutrijenti} />
      <MealReviews recenzije={meal.recenzije} />
      <NewsletterSection />
      <Footer />
    </div>
  );
};

export default MealDetailPage;
