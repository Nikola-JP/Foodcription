import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import UserInfoSection from '../components/UserInfoSection';
import SubscriptionSection from '../components/SubscriptionSection';
import EditFieldModal from '../components/EditFieldModal';
import PlanModal from '../components/PlanModal';
import ChangePasswordModal from '../components/ChangePasswordModal';
import Footer from '../components/Footer';

const EditProfilePage = () => {
  const location = useLocation();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [editField, setEditField] = useState(null);
  const [tempValue, setTempValue] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, [location]);

  useEffect(() => {
    if (successMessage) {
      setShowSuccess(true);
      const timeout = setTimeout(() => setShowSuccess(false), 2500);
      return () => clearTimeout(timeout);
    }
  }, [successMessage]);

  const ime = user.ime || user.imeKorisnika;
  const prezime = user.prezime || user.prezimeKorisnika;
  const email = user.email || user.emailKorisnika;
  const broj = user.broj || user.mobKorisnika || user.phone || "";

  const updateUserField = async (field, value) => {
    try {
      const userString = localStorage.getItem("user");
      if (!userString) {
        setSuccessMessage("Korisnički podaci nisu pronađeni.");
        return;
      }

      const userObj = JSON.parse(userString);
      const token = userObj.token;
      const email = user.email || user.emailKorisnika;

      const updatedUser = {
        email: email,
        ime: field === "ime" ? value : (user.ime || user.imeKorisnika),
        prezime: field === "prezime" ? value : (user.prezime || user.prezimeKorisnika),
        broj: field === "broj" ? value : (user.broj || user.mobKorisnika || user.phone || ""),
        plan: user.plan,
      };

      const response = await fetch(`http://localhost:8080/api/user/profile`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedUser),
      });

      if (response.ok) {
        const updatedUserFromBackend = await response.json();
        setUser({
          ...user,
          ...updatedUserFromBackend
        });
        localStorage.setItem("user", JSON.stringify({
          ...userObj,
          ...updatedUserFromBackend,
          token: userObj.token,
          role: userObj.role
        }));
        setSuccessMessage("Podatak je uspješno promijenjen.");
      } else {
        setSuccessMessage("Greška prilikom spremanja.");
      }
    } catch (err) {
      console.error("Greška prilikom ažuriranja:", err);
      setSuccessMessage("Greška prilikom povezivanja.");
    }
  };

  const updatePlan = async (newPlan) => {
    try {
      const userString = localStorage.getItem("user");
      if (!userString) return;

      const userObj = JSON.parse(userString);
      const token = userObj.token;

      const updatedUser = {
        email: user.email,
        ime: user.ime,
        prezime: user.prezime,
        broj: user.broj,
        plan: newPlan,
      };

      const res = await fetch(`http://localhost:8080/api/user/profile`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedUser),
      });

      if (res.ok) {
        setUser((prev) => ({ ...prev, plan: newPlan }));
        localStorage.setItem("user", JSON.stringify({ ...userObj, plan: newPlan }));
        setSuccessMessage("Plan pretplate uspješno promijenjen.");
      } else {
        setSuccessMessage("Greška prilikom promjene plana.");
      }
    } catch (err) {
      console.error(err);
      setSuccessMessage("Greška prilikom promjene plana.");
    }
  };

  const handlePlanChange = (newPlan) => {
    if (newPlan === user.plan) {
      setSuccessMessage('Već koristiš ovaj plan.');
    } else {
      updatePlan(newPlan);
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
      updateUserField(editField, tempValue);
    }

    setEditField(null);
    setTempValue('');
  };

  const handleEditField = (field, value) => {
    setEditField(field);
    setTempValue(value);
    setSuccessMessage('');
  };

  if (!user) return <div className="p-8 text-center animate-fade-in">Učitavanje podataka...</div>;

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-green-50 to-green-100 animate-fade-in">
      <main className="flex-1 px-8 py-10 max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-10 text-green-800 drop-shadow-md animate-fade-in">
          Dobro došli, <span className="text-green-600">{user.ime}</span>!
        </h1>

        {showSuccess && (
          <div className="flex justify-center mb-6 animate-fade-in">
            <div className="bg-green-100 border border-green-400 text-green-700 px-6 py-3 rounded-lg shadow transition-all duration-300">
              {successMessage}
            </div>
          </div>
        )}

        <div className="md:grid md:grid-cols-2 md:gap-12 items-start">
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 md:mb-0 animate-fade-in">
            <UserInfoSection user={user} onEdit={handleEditField} />
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 animate-fade-in">
            <SubscriptionSection
              user={user}
              openPlanModal={() => setShowPlanModal(true)}
              openPasswordModal={() => setShowPasswordModal(true)}
            />
          </div>
        </div>

        {showPlanModal && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 animate-fade-in">
            <PlanModal
              onChangePlan={handlePlanChange}
              onClose={() => setShowPlanModal(false)}
              successMessage={successMessage}
            />
          </div>
        )}

        {editField && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 animate-fade-in">
            <EditFieldModal
              field={editField}
              value={tempValue}
              onChange={(e) => setTempValue(e.target.value)}
              onSave={handleFieldChange}
              onCancel={() => setEditField(null)}
              successMessage={successMessage}
            />
          </div>
        )}

        {showPasswordModal && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 animate-fade-in">
            <ChangePasswordModal onClose={() => setShowPasswordModal(false)} />
          </div>
        )}
      </main>
      <Footer />
      {/* Tailwind custom animation */}
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

export default EditProfilePage;
