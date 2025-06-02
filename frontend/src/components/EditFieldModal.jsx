// 🟢 components/EditFieldModal.jsx
import React from 'react';

const EditFieldModal = ({ field, value, onChange, onSave, onCancel, successMessage }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-lg space-y-4 animate-fadeIn">
      <h2 className="text-xl font-semibold">Uredi {field}</h2>
      <input
        type="text"
        className="w-full border border-gray-300 px-4 py-2 rounded"
        value={value}
        onChange={onChange}
      />
      <button onClick={onSave} className="w-full bg-green-600 text-white px-4 py-2 rounded">Spremi</button>
      <button onClick={onCancel} className="text-red-500">Odustani</button>
      {successMessage && (
        <div className="bg-green-100 text-green-700 px-4 py-2 rounded text-sm">
          {successMessage}
        </div>
      )}
    </div>
  </div>
);

export default EditFieldModal;