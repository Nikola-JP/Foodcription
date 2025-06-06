import InfoRow from './InfoRow';

const UserInfoSection = ({ user, onEdit }) => {
  const ime = user.ime || user.imeKorisnika;
  const prezime = user.prezime || user.prezimeKorisnika;
  const email = user.email || user.emailKorisnika;
  const broj = user.broj || user.mobKorisnika;

  return (
    <div className="flex flex-col gap-6">
      <InfoRow
        label="Email:"
        value={email}
      />
      <InfoRow
        label="Ime:"
        value={ime}
        action="✏️ Uredi ime"
        onClick={() => onEdit("ime", ime)}
      />
      <InfoRow
        label="Prezime:"
        value={prezime}
        action="✏️ Uredi prezime"
        onClick={() => onEdit("prezime", prezime)}
      />
      <InfoRow
        label="Broj mobitela:"
        value={broj}
        action="📱 Promijeni broj mobitela"
        onClick={() => onEdit("broj", broj)}
      />
    </div>
  );
};

export default UserInfoSection;