import React from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const AuthModal = ({ isOpen, onClose, mode }) => {
  if (!isOpen) return null;

  const handleBackgroundClick = (e) => {
    if (e.target.id === "modalBackground") {
      onClose();
    }
  };

  return (
    <div
      id="modalBackground"
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={handleBackgroundClick}
    >
      <div className="bg-white p-6 rounded-lg w-full max-w-sm relative">
        <button
          className="absolute top-2 right-2 text-gray-600 text-2xl font-bold"
          onClick={onClose}
        >
          ×
        </button>
        {mode === "login" ? <LoginForm /> : <RegisterForm />}
      </div>
    </div>
  );
};

export default AuthModal;
