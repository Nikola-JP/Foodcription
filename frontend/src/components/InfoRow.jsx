// 🟢 2. InfoRow.jsx
// Komponenta za prikaz jednog reda s informacijom i akcijskim gumbom
const InfoRow = ({ label, value, action, onClick }) => (
  <div className="flex items-center justify-between">
    <div className="flex flex-col">
      <span className="font-semibold">{label}</span>
      <span className="bg-green-500 text-white px-3 py-1 rounded-full">{value}</span>
    </div>
    <button onClick={onClick} className="bg-green-600 text-white px-4 py-2 rounded-full">{action}</button>
  </div>
);

export default InfoRow;
