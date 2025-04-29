// SubscriptionPlans.jsx
import React from "react";

const SubscriptionPlans = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-green-400 to-green-500 text-white">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold">Odaberi svoju pretplatu</h2>
        <p className="text-lg mt-2">Praktična i zdrava rješenja za svaki dan</p>
      </div>
      <div className="flex flex-col md:flex-row justify-center gap-10 px-4">
        <div className="bg-white text-gray-800 p-8 rounded-xl shadow-md w-full max-w-sm">
          <h3 className="text-xl font-semibold mb-4">Basic plan</h3>
          <p className="text-4xl font-bold mb-2">
            50€<span className="text-base font-normal">/mj</span>
          </p>
          <ul className="mb-6 space-y-2">
            <li>&#10003; Dostava od ponedjeljka do petka</li>
            <li>&#10003; 20+ jela u rotaciji</li>
            <li>&#10003; Personalizirani meni</li>
          </ul>
          <button className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition">
            Odaberi
          </button>
        </div>

        <div className="bg-gray-800 text-white p-8 rounded-xl shadow-md w-full max-w-sm">
          <h3 className="text-xl font-semibold mb-4">Premium plan</h3>
          <p className="text-4xl font-bold mb-2">
            100€<span className="text-base font-normal">/mj</span>
          </p>
          <ul className="mb-6 space-y-2">
            <li>&#10003; Dostava svaki dan</li>
            <li>&#10003; Pristup ekskluzivnim jelima</li>
            <li>&#10003; Besplatna promjena jelovnika</li>
            <li>&#10003; Prioritetna podrška</li>
          </ul>
          <button className="bg-white text-green-600 px-6 py-2 rounded hover:bg-gray-300 transition">
            Odaberi
          </button>
        </div>
      </div>
    </section>
  );
};

export default SubscriptionPlans;
