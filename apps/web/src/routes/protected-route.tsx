import { Navigate, Outlet } from "react-router";
import { useEffect } from "react";
import { useStore } from "@web/stores/root-store";

function ProtectedRoute() {
  const { user, status, init } = useStore((state) => state.auth);

  useEffect(() => {
    if (status === "idle") {
      void init();
    }
  }, [init, status]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "success" && !user) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
