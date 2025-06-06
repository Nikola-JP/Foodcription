import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const RegisterForm = ({ onClose }) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    imeKorisnika: '',
    prezimeKorisnika: '',
    emailKorisnika: '',
    lozinkaKorisnika: '',
    mobKorisnika: ''
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      if (!res.ok) {
        const message = await res.text();
        throw new Error(message);
      }

      const data = await res.json();
      const user = data.user;
      const token = data.token;

      alert(`Dobrodošli, ${user.imeKorisnika}!`);

      localStorage.setItem("user", JSON.stringify({
        ime: user.imeKorisnika,
        prezime: user.prezimeKorisnika,
        email: user.emailKorisnika,
        broj: user.mobKorisnika,
        plan: user.pretplata ? user.pretplata.tipPretplate : "Basic",
        token,
        role: (user.role || "").toUpperCase() // uvijek velikim slovima!
      }));

      onClose();

      const redirectPath = sessionStorage.getItem("redirectAfterLogin") || "/moj-dashboard";
      sessionStorage.removeItem("redirectAfterLogin");

      navigate(redirectPath);

    } catch (error) {
      alert(error.message || "Greška prilikom registracije.");
      console.error("Registration error:", error);
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h2 className="text-xl font-bold mb-4">Register</h2>
      <input
        className="border p-2 w-full mb-2"
        name="imeKorisnika"
        placeholder="Ime"
        onChange={handleChange}
        required
      />
      <input
        className="border p-2 w-full mb-2"
        name="prezimeKorisnika"
        placeholder="Prezime"
        onChange={handleChange}
        required
      />
      <input
        className="border p-2 w-full mb-2"
        name="emailKorisnika"
        type="email"
        placeholder="Email"
        onChange={handleChange}
        required
      />
      <input
        className="border p-2 w-full mb-4"
        name="lozinkaKorisnika"
        type="password"
        placeholder="Lozinka"
        onChange={handleChange}
        required
      />
      <input
        className="border p-2 w-full mb-2"
        name="mobKorisnika"
        placeholder="+385000000000"
        onChange={handleChange}
      />
      <button className="bg-green-600 text-white px-4 py-2 w-full rounded hover:bg-green-700 transition">Register</button>
    </form>
  );
};

export default RegisterForm;
