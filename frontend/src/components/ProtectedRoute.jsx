import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children, onRequireLogin }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      sessionStorage.setItem("redirectAfterLogin", location.pathname);
      navigate("/"); // Go to home
      if (onRequireLogin) onRequireLogin();
    }
  }, [navigate, onRequireLogin, location]);

  const user = localStorage.getItem("user");
  return user ? children : null;
};

export default ProtectedRoute;
