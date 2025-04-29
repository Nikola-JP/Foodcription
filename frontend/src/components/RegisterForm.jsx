import React, { useState } from 'react';

const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = e => {
    e.preventDefault();
    // Handle registration logic here
    console.log('Registering:', { email, password });
  };

  return (
    <form onSubmit={handleRegister}>
      <h2 className="text-xl font-bold mb-4">Register</h2>
      <input
        className="border p-2 w-full mb-2"
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <input
        className="border p-2 w-full mb-4"
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />
      <button className="bg-green-600 text-white px-4 py-2 w-full rounded">Register</button>
    </form>
  );
};

export default RegisterForm;