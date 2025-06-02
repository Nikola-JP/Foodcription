import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

function Navbar({ onSignIn, onRegister, user, onLogout }) {
  const navigate = useNavigate();

  return (
    <nav className="flex justify-between items-center p-4 bg-white shadow-md">
      <Link to="/">
        <img src={logo} alt="Foodcription Logo" className="h-16 w-auto" />
      </Link>
      <ul className="flex space-x-6 text-gray-700 font-medium items-center">
        <li>
          <Link to="/menu" className="hover:text-green-500 cursor-pointer">
            On Menu
          </Link>
        </li>
        <li>
          <Link to="/pretplata" className="hover:text-green-500 cursor-pointer">
            Pretplata
          </Link>
        </li>
        <li className="hover:text-green-500 cursor-pointer">Kontakt</li>

        {!user ? (
          <>
            <li>
              <button
                onClick={onSignIn}
                className="px-4 py-2 rounded-full border border-green-500 text-green-500 hover:bg-green-500 hover:text-white transition"
              >
                Sign in
              </button>
            </li>
            <li>
              <button
                onClick={onRegister}
                className="px-4 py-2 rounded-full bg-green-500 text-white hover:bg-green-600 transition"
              >
                Register
              </button>
            </li>
          </>
        ) : (
          <>
            <li
              className="text-green-600 font-semibold cursor-pointer hover:underline"
              onClick={() => navigate("/moj-dashboard")}
              title="Moj profil"
            >
              {user.imeKorisnika}
            </li>
            <li>
              <button
                onClick={onLogout}
                className="px-4 py-2 rounded-full border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition"
              >
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
