# 🥗 Foodcription – Frontend Overview

This document describes the frontend structure of Foodcription, which uses React + Vite + Tailwind CSS. Currently, only the frontend is being developed—the backend will be connected later through a Spring Boot REST API.

## ✅ Technologies

- React
- Vite
- Tailwind CSS
- React Router DOM (for routing)
- @react-oauth/google (Google login)
- The backend is planned to use Spring Boot + MariaDB (not connected yet)

## 📁 Project Structure

```text
frontend/
├── public/
│   └── images/              # meal images for the menu and meal detail pages
├── src/
│   ├── assets/              # logos and illustrations
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
```

## 🧭 Routes (App.jsx)

```jsx
<Route path="/" element={<LandingPage />} />
<Route path="/pretplata" element={<SubscriptionPage />} />
<Route path="/menu" element={<MenuPage />} />
<Route path="/meal/:id" element={<MealDetailPage />} />
```

## 🔐 Google Login

- Implemented using `@react-oauth/google`.
- The `LoginForm.jsx` component contains `<GoogleLogin />`.
- The token is currently only logged using `console.log()`, but `credentialResponse` is available to send to the backend.

```jsx
<GoogleLogin onSuccess={handleGoogleSuccess} onError={handleGoogleError} />
```

## 🥘 Menu Page

- Displays a gallery of meals.
- Images are located in `public/images`.
- Hover effects include scaling, rotation, and shadows.
- Each link leads to `/meal/:id`.

## 🍽️ Meal Detail Page

Dynamic route: `/meal/:id`

Displays:

- A meal image and description
- Nutritional information (protein, fat, carbohydrates)
- Reviews
- A newsletter signup form

### 📌 Backend Fetch (Currently Commented Out)

```jsx
// useEffect(() => {
//   fetch(`http://localhost:8080/api/jela/${id}`)
//     .then(res => res.json())
//     .then(data => setMeal(data))
// }, [id]);
```

## 🧠 Backend Integration (TODO)

✅ All components and hooks are ready.

If you want to see the complete contents of all `.jsx` files exactly as they currently appear in the code, ask: “Give me the code for all components.” They have already been defined in this session and can be exported together.

For further development: connect to the backend and uncomment the `fetch()` sections.
