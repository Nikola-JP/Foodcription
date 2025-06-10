import React, { useRef, useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import Footer from '../components/Footer';

const ContactPage = () => {
  const formRef = useRef();
  const [status, setStatus] = useState(null);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      'foodcription',
      'foodcription_template',
      formRef.current,
      'VeOeHSH6QMEjJFHad'
    ).then(() => {
      setStatus("Email uspješno poslan!");
      formRef.current.reset();
    }, () => {
      setStatus("Greška prilikom slanja.");
    });
  };

  useEffect(() => {
    if (status) {
      const timer = setTimeout(() => setStatus(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  return (
    <div className="bg-gradient-to-br from-green-50 to-green-100 min-h-screen flex flex-col">
      <main className="flex-1 flex flex-col items-center justify-center py-12 px-4">
        <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl p-8 animate-fade-in">
          <h1 className="text-3xl font-bold mb-8 text-green-800 text-center">Kontaktirajte nas</h1>
          
          {/* Video sekcija */}
          <div className="flex justify-center mb-8">
            <video
              className="rounded-xl shadow-lg w-full max-h-64 object-cover"
              autoPlay
              loop
              muted
              playsInline
              controls={false}
              src="videos/techsupport.mp4" // Ovdje umetni svoj video
            >
              Vaš preglednik ne podržava video tag.
            </video>
          </div>

          <form ref={formRef} onSubmit={sendEmail} className="space-y-5">
            <div className="flex gap-4">
              <input
                name="ime"
                placeholder="Ime"
                required
                className="w-1/2 border border-green-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300 transition"
              />
              <input
                name="prezime"
                placeholder="Prezime"
                required
                className="w-1/2 border border-green-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300 transition"
              />
            </div>
            <input
              name="naslov"
              placeholder="Naslov"
              required
              className="w-full border border-green-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300 transition"
            />
            <textarea
              name="tekst"
              placeholder="Vaša poruka"
              required
              rows={6}
              className="w-full border border-green-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300 transition resize-none"
            />
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-400 to-green-600 text-white font-semibold py-3 rounded-lg shadow hover:from-green-500 hover:to-green-700 transition"
            >
              Pošalji
            </button>
          </form>

          {status && (
            <div className="mt-6 text-center">
              <span className="inline-block px-4 py-2 rounded-lg bg-green-100 text-green-700 font-semibold shadow transition-opacity duration-300">
                {status}
              </span>
            </div>
          )}
        </div>
      </main>
      <Footer />
      <style>
        {`
          .animate-fade-in {
            animation: fadeIn 0.7s;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px);}
            to { opacity: 1; transform: translateY(0);}
          }
        `}
      </style>
    </div>
  );
};

export default ContactPage;
