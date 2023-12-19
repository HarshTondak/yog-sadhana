import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function NotLoggedInRoutes() {
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user) {
      const timeoutId = setTimeout(() => {
        // Navigate to "/" after 2000 milliseconds (2 seconds)
        <Navigate to="/" />;
      }, 2000);

      // Cleanup the timeout to avoid memory leaks
      return () => clearTimeout(timeoutId);
    }
  }, [user]);

  return user ? null : <Outlet />;
}
