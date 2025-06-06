import React, { useEffect, useState } from 'react';
import EditFieldModal from '../components/EditFieldModal';
import Footer from '../components/Footer';
import ChangePasswordModal2 from '../components/ChangePasswordModal2';

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [selectedUserEmail, setSelectedUserEmail] = useState('');
  const [field, setField] = useState('');
  const [newValue, setNewValue] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.token;

    if (!token) {
      alert("Nedostaje token. Molimo prijavite se ponovo.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/auth/pretplate`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) throw new Error('Greška prilikom dohvaćanja korisnika');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      alert(error.message);
    }
  };

  const openModal = (user, field) => {
    setEditingUser(user);
    setField(field);
    setNewValue(user[field]);
    setSuccessMessage('');
  };

  const handleSave = async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;

  if (!token) {
    alert("Nedostaje token. Molimo prijavite se ponovo.");
    return;
  }

  try {
    if (field === 'role') {
      const response = await fetch(`http://localhost:8080/api/auth/${editingUser.email}/role`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ role: newValue }),
      });

      if (!response.ok) throw new Error('Greška prilikom spremanja uloge');
    } else {
      const updatedUser = { ...editingUser, [field]: newValue };

      const response = await fetch(`http://localhost:8080/api/auth/pretplate/update`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updatedUser),
      });

      if (!response.ok) throw new Error('Greška prilikom spremanja');
    }

    setSuccessMessage('Uspješno spremljeno!');
    setTimeout(() => {
      setEditingUser(null);
      fetchUsers();
    }, 1000);
  } catch (error) {
    alert(error.message);
  }
};

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="flex-grow p-8">
        <h1 className="text-2xl font-bold mb-6">Korisnici i Pretplate</h1>
        <table className="w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Ime</th>
              <th className="border px-4 py-2">Prezime</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Tip Pretplate</th>
              <th className="border px-4 py-2">Status Pretplate</th>
              <th className="border px-4 py-2">Uloga</th>
              <th className="border px-4 py-2">Akcije</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index} className="text-center">
                <td className="border px-4 py-2">{user.ime}</td>
                <td className="border px-4 py-2">{user.prezime}</td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2">{user.tipPretplate || '-'}</td>
                <td className="border px-4 py-2">{user.status || '-'}</td>
                <td className="border px-4 py-2">{user.role}</td>
                <td className="border px-4 py-2 space-y-2 flex flex-col lg:flex-row lg:space-y-0 lg:space-x-2 justify-center">
                  <button onClick={() => openModal(user, 'ime')} className="bg-green-600 text-white text-sm px-4 py-2 rounded-full shadow hover:bg-green-700 transition">
                    📝 Uredi Ime
                  </button>
                  <button onClick={() => openModal(user, 'prezime')} className="bg-green-600 text-white text-sm px-4 py-2 rounded-full shadow hover:bg-green-700 transition">
                    🧾 Uredi Prezime
                  </button>
                  <button onClick={() => openModal(user, 'email')} className="bg-green-600 text-white text-sm px-4 py-2 rounded-full shadow hover:bg-green-700 transition">
                    📧 Uredi Email
                  </button>
                  {user.tipPretplate && (
                    <button onClick={() => openModal(user, 'tipPretplate')} className="bg-green-600 text-white text-sm px-4 py-2 rounded-full shadow hover:bg-green-700 transition">
                      📦 Uredi Tip Pretplate
                    </button>)}
                  {user.status && (
                    <button onClick={() => openModal(user, 'status')} className="bg-green-600 text-white text-sm px-4 py-2 rounded-full shadow hover:bg-green-700 transition">
                      ⚙️ Uredi Status Pretplate
                    </button>)}
                  <button
                  onClick={() => {
                  setSelectedUserEmail(user.email);  // ili user.emailKorisnika ako je drugačije
                  setShowPasswordModal(true);
                  }} className="bg-green-600 text-white text-sm px-4 py-2 rounded-full shadow hover:bg-green-700 transition">
                    🔒 Uredi Lozinku
                  </button>
                  <button
                  onClick={() => openModal(user, 'role')}
                  className="bg-green-600 text-white text-sm px-4 py-2 rounded-full shadow hover:bg-green-700 transition">
                  🛡️ Uredi Ulogu
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {editingUser && (
          <EditFieldModal
            field={field}
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
            onSave={handleSave}
            onCancel={() => setEditingUser(null)}
            successMessage={successMessage}
          />
        )}
        {showPasswordModal && (
        <ChangePasswordModal2
        userEmail={selectedUserEmail}
        token={JSON.parse(localStorage.getItem('user'))?.token}
        onClose={() => setShowPasswordModal(false)}
        />
        )}
      </div>

      {/* ✅ Sticky footer at bottom of page */}
      <Footer />
    </div>
  );
};

export default UserTable;
