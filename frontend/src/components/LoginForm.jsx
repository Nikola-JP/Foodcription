import React, { useState } from 'react';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = e => {
    e.preventDefault();
    // Handle login logic here
    console.log('Logging in:', { email, password });
  };

  return (
    <form onSubmit={handleLogin}>
      <h2 className="text-xl font-bold mb-4">Login</h2>
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
      <button className="bg-green-600 text-white px-4 py-2 w-full rounded hover:bg-green-700 transition">
        Login
      </button>
      <div className="text-sm text-center mt-4">
        <a href="#" className="text-green-600 hover:underline">
          Zaboravili ste lozinku?
        </a>
      </div>
    </form>
  );
};

export default LoginForm;