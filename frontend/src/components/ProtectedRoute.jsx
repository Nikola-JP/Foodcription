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

    // If roles are specified, check if user.uloga is included
    if (requiredRoles.length > 0 && !requiredRoles.includes(user.role)) {
      navigate("/"); // Redirect if role not allowed
      return;
    }

    setAuthorized(true);
  }, [navigate, onRequireLogin, location, requiredRoles]);

  return authorized ? children : null;
};

export default ProtectedRoute;
