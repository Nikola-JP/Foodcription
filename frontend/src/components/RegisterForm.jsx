import React, { useState } from 'react';

const RegisterForm = () => {
  const [form, setForm] = useState({
    imeKorisnika: '',
    prezimeKorisnika: '',
    emailKorisnika: '',
    lozinkaKorisnika: ''
    
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("https://orange-rotary-phone-xjvxr6x6vxxf4p9-8080.app.github.dev/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      if (!res.ok) throw new Error("Register failed");

      alert("Uspješna registracija! Možete se prijaviti.");
    } catch (error) {
      alert("Greška prilikom registracije.");
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
      <button className="bg-green-600 text-white px-4 py-2 w-full rounded">Register</button>
    </form>
  );
};

export default RegisterForm;
