import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const res = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      if (!res.ok) throw new Error("Login failed");

      const user = await res.json();
      alert(`Dobrodošli natrag, ${user.imeKorisnika}!`);
    } catch (error) {
      alert("Pogrešan email ili lozinka.");
      console.error("Login error:", error);
    }
  };

  const handleGoogleSuccess = (credentialResponse) => {
    console.log("Google login success:", credentialResponse);
    // TODO: send credentialResponse.credential to backend
  };

  const handleGoogleError = () => {
    console.log("Google login failed");
  };

  return (
    <form onSubmit={handleLogin} className="flex flex-col space-y-4">
      <h2 className="text-xl font-bold mb-4 text-center">Login</h2>

      <input
        className="border p-2 w-full"
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <input
        className="border p-2 w-full"
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />
      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 w-full rounded hover:bg-green-700 transition"
      >
        Login
      </button>

      <div className="text-center text-gray-500">ili</div>

      <div className="flex justify-center">
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={handleGoogleError}
        />
      </div>

      <div className="text-sm text-center mt-2">
        <a href="#" className="text-green-600 hover:underline">
          Zaboravili ste lozinku?
        </a>
      </div>
    </form>
  );
};

export default LoginForm;
                                                                                                                                                                                            