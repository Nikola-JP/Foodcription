🥗 Foodcription – Frontend Overview

Ovaj dokument opisuje frontend strukturu projekta Foodcription, koji koristi React + Vite + TailwindCSS. Trenutno se radi samo frontend – backend će biti spojen kasnije putem Spring Boot REST API-ja.

✅ Tehnologije

React

Vite

Tailwind CSS

React Router DOM (za routing)

@react-oauth/google (Google login)

Backend je planiran u Spring Boot + MariaDB (nije još spojen)

📁 Struktura projekta

frontend/
├── public/
│   └── images/              # slike jela za menu page i meal detail
├── src/
│   ├── assets/              # logotipi i ilustracije
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── AuthModal.jsx
│   │   ├── LoginForm.jsx
│   │   ├── RegisterForm.jsx
│   │   ├── FeatureGrid.jsx
│   │   ├── HeroSection.jsx
│   │   ├── PromoBanner.jsx
│   │   └── InfoGrid.jsx
│   ├── hooks/
│   │   └── useAuthModal.js
│   ├── pages/
│   │   ├── SubscriptionPage.jsx
│   │   ├── SubscriptionPlans.jsx
│   │   ├── Faq.jsx
│   │   ├── MenuPage.jsx
│   │   └── MealDetailPage.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── tailwind.config.js
├── vite.config.js
├── INSTALLGUIDE.md
└── README.md

🧭 Rute (App.jsx)

<Route path="/" element={<LandingPage />} />
<Route path="/pretplata" element={<SubscriptionPage />} />
<Route path="/menu" element={<MenuPage />} />
<Route path="/meal/:id" element={<MealDetailPage />} />

🔐 Google Login

Implementiran putem @react-oauth/google

Komponenta LoginForm.jsx sadrži <GoogleLogin />

Token se za sada samo console.log(), ali postoji credentialResponse za backend slanje

<GoogleLogin onSuccess={handleGoogleSuccess} onError={handleGoogleError} />

🥘 Menu Page

Prikazuje galeriju jela

Slike se nalaze u public/images

Hover efekti: scale, rotacija, sjena

Link vodi na /meal/:id

🍽️ Meal Detail Page

Dinamična ruta: /meal/:id

Prikazuje:

Slika i opis jela

Nutritivne vrijednosti (proteini, masti, ugljikohidrati)

Recenzije

Newsletter forma

📌 Backend Fetch (trenutno zakomentiran):

// useEffect(() => {
//   fetch(`http://localhost:8080/api/jela/${id}`)
//     .then(res => res.json())
//     .then(data => setMeal(data))
// }, [id]);

🧠 Backend Integracija (TODO)



✅ Sve komponente i hookovi su pripremljeni.

Ako želiš vidjeti sve .jsx sadržaje točno kakvi su sada u kodu, zatraži: daj sve kodove komponenti. Oni su već definirani u ovoj sesiji i mogu se grupno izvesti.

Za daljnji razvoj: spoji se na backend i odkmentiraj fetch() dijelove.

