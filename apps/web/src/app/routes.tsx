import { Route, Routes, useNavigate } from "react-router";
import { useEffect } from "react";
import HomeLayout from "@web/layouts/home";
import AboutPage from "@web/pages/about";
import HomePage from "@web/pages/home";
import NotFoundPage from "@web/pages/not-found";
import TodoPage from "@web/pages/todo";
import LoginPage from "@web/pages/login";
import { postRenderSetup } from "@web/init";
import ProtectedRoute from "@web/routes/protected-route";

function AppRoutes(): JSX.Element {
  const navigate = useNavigate();

  useEffect(() => {
    const cleanup = postRenderSetup({ navigate });
    return cleanup;
  }, []);

  return (
    <Routes>
      <Route element={<HomeLayout />} path="/login">
        <Route element={<LoginPage />} index />
      </Route>
      <Route element={<HomeLayout />} path="/">
        <Route element={<ProtectedRoute />}>
          <Route element={<HomePage />} index />
          <Route element={<AboutPage />} path="about" />
          <Route element={<TodoPage />} path="todo" />
          <Route element={<NotFoundPage />} path="*" />
        </Route>
      </Route>
    </Routes>
  );
}

export default AppRoutes;
