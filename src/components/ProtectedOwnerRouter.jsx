import { useSelector } from "react-redux";
import { Navigate, useLocation, Outlet } from "react-router-dom";

export default function ProtectedOwnerRoute() {
  const user = useSelector((state) => state.auth.user);
  const location = useLocation();

  const roles = user?.data?.roles || [];
  const hasAccess = roles.includes("HOTEL_MANAGER");

  if (!hasAccess) {
    return <Navigate to="/" replace state={{ from: location.pathname }} />;
  }

  return <Outlet />;
}
