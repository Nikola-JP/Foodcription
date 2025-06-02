import React from 'react';

const PlanModal = ({ onChangePlan, onClose, successMessage }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-lg space-y-4 animate-fadeIn">
      <h2 className="text-xl font-semibold">Odaberi novi tip pretplate</h2>
      <button onClick={() => onChangePlan('Basic')} className="w-full bg-gray-200 px-4 py-2 rounded">Basic</button>
      <button onClick={() => onChangePlan('Premium')} className="w-full bg-yellow-400 px-4 py-2 rounded">Premium</button>
      <button onClick={onClose} className="text-red-500 mt-2">Odustani</button>
      {successMessage && (
        <div className="bg-green-100 text-green-700 px-4 py-2 rounded text-sm">
          {successMessage}
        </div>
      )}
    </div>
  </div>
);

export default PlanModal;
