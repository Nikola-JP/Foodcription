import React, { useRef, useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import Footer from '../components/Footer';

const ContactPage = () => {
  const formRef = useRef();
  const [status, setStatus] = useState(null);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      'foodcription',  // Your EmailJS Service ID
      'foodcription_template', // Your Template ID
      formRef.current,
      'VeOeHSH6QMEjJFHad'   // Your Public Key
    ).then(() => {
      setStatus("Email uspješno poslan!");
      formRef.current.reset();
    }, () => {
      setStatus("Greška prilikom slanja.");
    });
  };

  // Clear status after 4 seconds
  useEffect(() => {
    if (status) {
      const timer = setTimeout(() => setStatus(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  return (
    <div className="bg-white min-h-screen">
      <main className="max-w-3xl mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Kontaktirajte nas</h1>

        <form ref={formRef} onSubmit={sendEmail} className="space-y-6">
          <input 
            name="ime" 
            placeholder="Ime" 
            required 
            className="w-full border p-2 rounded" 
          />
          <input 
            name="prezime" 
            placeholder="Prezime" 
            required 
            className="w-full border p-2 rounded" 
          />
          <input 
            name="naslov" 
            placeholder="Naslov" 
            required 
            className="w-full border p-2 rounded" 
          />
          <textarea 
            name="tekst" 
            placeholder="Tekst" 
            required 
            rows={6} 
            className="w-full border p-2 rounded" 
          />
          <button 
            type="submit" 
            className="bg-green-600 text-white px-6 py-2 rounded"
          >
            Pošalji
          </button>
        </form>

        {status && (
          <p className="mt-4 font-bold text-green-600 transition-opacity duration-300">
            {status}
          </p>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;
