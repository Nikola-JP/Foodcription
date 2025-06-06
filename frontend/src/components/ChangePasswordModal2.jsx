import React, { useState } from 'react';

const ChangePasswordModal2 = ({ onClose, userEmail, token }) => {
  const [newPassword, setNewPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');

  const handlePasswordChange = async () => {
    if (newPassword.length < 6) {
      setError('Nova lozinka mora imati barem 6 znakova.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/auth/${userEmail}/password/reset`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ newPassword }),
      });

      if (response.ok) {
        setSuccessMessage('Lozinka uspješno promijenjena!');
        setTimeout(onClose, 2000);
      } else {
        setError('Greška prilikom promjene lozinke.');
      }
    } catch (err) {
      setError('Greška prilikom slanja zahtjeva.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-96 space-y-4 animate-fadeIn">
        <h2 className="text-xl font-semibold">Postavi novu lozinku</h2>

        <input
          type="password"
          placeholder="Nova lozinka"
          className="w-full border border-gray-300 px-4 py-2 rounded"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <button onClick={handlePasswordChange} className="w-full bg-green-600 text-white px-4 py-2 rounded">
          Spremi
        </button>
        <button onClick={onClose} className="text-red-500 text-sm">Odustani</button>

        {error && <p className="text-red-600 text-sm">{error}</p>}
        {successMessage && <p className="text-green-600 text-sm">{successMessage}</p>}
      </div>
    </div>
  );
};

export default ChangePasswordModal2;