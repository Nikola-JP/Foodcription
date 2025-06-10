import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children, onRequireLogin, requiredRoles = [] }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [authorized, setAuthorized] = useState(null);

  useEffect(() => {
    const userStr = localStorage.getItem("user");

    if (!userStr) {
      sessionStorage.setItem("redirectAfterLogin", location.pathname);
      navigate("/"); // Redirect to home
      if (onRequireLogin) onRequireLogin();
      return;
    }

    const user = JSON.parse(userStr);

    const userRole = (user.role || user.uloga || "").toLowerCase();
    if (requiredRoles.length > 0 && !requiredRoles.map(r => r.toLowerCase()).includes(userRole)) {
      navigate("/"); // Redirect if role not allowed
      return null;
    }

    setAuthorized(true);
  }, [navigate, onRequireLogin, location, requiredRoles]);

  return authorized ? children : null;
};

export default ProtectedRoute;
