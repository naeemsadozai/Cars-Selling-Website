import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function AdminProtectedRoute({ children }) {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get("https://cars-selling-website-backend.onrender.com/auth/isAdmin", {
          withCredentials: true,
        });
        setAuth(true);
      } catch (err) {
        setAuth(false);
      }
    };
    checkAuth();
  }, []);

  if (auth === null) {
    return <p className="text-center mt-10">Checking authentication...</p>;
  }

  return auth ? children : <Navigate to="/" replace />;
}

export default AdminProtectedRoute;

