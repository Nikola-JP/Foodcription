import React, { useState } from 'react';

const ChangePasswordModal = ({ onClose }) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');

  const handlePasswordChange = () => {
    const mockStoredPassword = 'tajna123'; // ⚠️ Demo svrha – zamijeniti API logikom

    if (oldPassword !== mockStoredPassword) {
      setError('Stara lozinka nije točna.');
      setSuccessMessage('');
      return;
    }

    if (newPassword.length < 6) {
      setError('Nova lozinka mora imati barem 6 znakova.');
      setSuccessMessage('');
      return;
    }

    setError('');
    setSuccessMessage('Lozinka uspješno promijenjena!');
    // TODO: Pošalji novu lozinku na backend
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-96 space-y-4 animate-fadeIn">
        <h2 className="text-xl font-semibold">Promijeni lozinku</h2>

        <input
          type="password"
          placeholder="Unesi staru lozinku"
          className="w-full border border-gray-300 px-4 py-2 rounded"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Unesi novu lozinku"
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

export default ChangePasswordModal;
