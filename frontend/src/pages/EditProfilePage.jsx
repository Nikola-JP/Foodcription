// 🟢 pages/EditProfilePage.jsx
import { useState } from 'react';
import InfoRow from '../components/InfoRow';
import Footer from '../components/Footer';
import EditFieldModal from '../components/EditFieldModal';
import PlanModal from '../components/PlanModal';
import ChangePasswordModal from '../components/ChangePasswordModal';

const EditProfilePage = () => {
  const [user, setUser] = useState({
    email: 'npavecic@veleri.hr',
    ime: 'Nikola',
    prezime: 'Pavečić',
    broj: '+385 555 5555',
    plan: 'Basic',
  });
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [editField, setEditField] = useState(null);
  const [tempValue, setTempValue] = useState('');

  const handlePlanChange = (newPlan) => {
    if (newPlan === user.plan) {
      setSuccessMessage('Već koristiš ovaj plan.');
    } else {
      setUser((prev) => ({ ...prev, plan: newPlan }));
      setSuccessMessage('Plan pretplate uspješno promijenjen.');
    }
    setShowPlanModal(false);
  };

  const handleFieldChange = () => {
    if (editField === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(tempValue)) {
        setSuccessMessage('Neispravna email adresa.');
        return;
      }
    }

    if (editField === 'broj') {
      const phoneRegex = /^\+385\s(91|92|95|98|99)\s\d{3}\s\d{4}$/;
      if (!phoneRegex.test(tempValue)) {
        setSuccessMessage('Unesi broj u formatu npr. +385 95 123 4567');
        return;
      }
    }

    if (tempValue && tempValue !== user[editField]) {
      setUser((prev) => ({ ...prev, [editField]: tempValue }));
      setSuccessMessage('Podatak je uspješno promijenjen.');
    }
    setEditField(null);
    setTempValue('');
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <main className="flex-1 px-8 py-10 max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-10">
          Dobro došli, {user.ime}!
        </h1>

        <div className="md:grid md:grid-cols-2 md:gap-12 items-start">
          <div className="flex flex-col gap-6">
            <InfoRow
              label="Email:"
              value={user.email}
              action="✉️ Promijeni email"
              onClick={() => {
                setEditField("email");
                setTempValue(user.email);
                setSuccessMessage("");
              }}
            />
            <InfoRow
              label="Ime:"
              value={user.ime}
              action="✏️ Uredi ime"
              onClick={() => {
                setEditField("ime");
                setTempValue(user.ime);
                setSuccessMessage("");
              }}
            />
            <InfoRow
              label="Prezime:"
              value={user.prezime}
              action="✏️ Uredi prezime"
              onClick={() => {
                setEditField("prezime");
                setTempValue(user.prezime);
                setSuccessMessage("");
              }}
            />
            <InfoRow
              label="Broj mobitela:"
              value={user.broj}
              action="📱 Promijeni broj mobitela"
              onClick={() => {
                setEditField("broj");
                setTempValue(user.broj);
                setSuccessMessage("");
              }}
            />
          </div>

          <div className="flex flex-col gap-3 text-left min-h-[340px] mt-8 md:mt-0">
            <div className="flex items-center gap-2">
              <span className="font-semibold">Tip pretplate:</span>
              <span
                title={
                  user.plan === "Basic"
                    ? "Osnovna pretplata (pon-pet)"
                    : "Premium pretplata (pon-ned)"
                }
                className="bg-green-100 px-3 py-1 rounded-full text-sm cursor-help"
              >
                💳 {user.plan}
              </span>
            </div>
            {user.plan === "Basic" ? (
              <>
                <p className="text-sm">
                  Trenutno koristiš samo 5/7 obroka tjedno.
                </p>
                <p className="font-semibold mt-2">
                  Nadogradi i osiguraj si ukusne subote i nedjelje — bez
                  kuhanja!
                  <br />
                  Klikni ispod i prebaci se na Premium!
                </p>
              </>
            ) : (
              <>
                <p className="text-sm">
                  Koristite 7/7 obroka tjedno. Čestitamo!
                </p>
                <p className="font-semibold mt-2">Hvala vam na podršci!</p>
              </>
            )}
            <div className="flex flex-col gap-3 mt-4">
              <button
                onClick={() => {
                  setShowPlanModal(true);
                  setSuccessMessage("");
                }}
                className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition"
              >
                Promijeni pretplatu
              </button>
              <button
                onClick={() => setShowPasswordModal(true)}
                className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition"
              >
                Promijeni lozinku
              </button>
            </div>
          </div>
        </div>

        {showPlanModal && (
          <PlanModal
            onChangePlan={handlePlanChange}
            onClose={() => setShowPlanModal(false)}
            successMessage={successMessage}
          />
        )}

        {editField && (
          <EditFieldModal
            field={editField}
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
            onSave={handleFieldChange}
            onCancel={() => setEditField(null)}
            successMessage={successMessage}
          />
        )}
        {showPasswordModal && (
          <ChangePasswordModal onClose={() => setShowPasswordModal(false)} />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default EditProfilePage;