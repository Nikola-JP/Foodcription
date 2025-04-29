import { useState } from 'react';

const useAuthModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState('login'); // or 'register'

  const openModal = (type) => {
    setMode(type);
    setIsOpen(true);
  };

  const closeModal = () => setIsOpen(false);

  return { isOpen, mode, openModal, closeModal };
};

export default useAuthModal;
