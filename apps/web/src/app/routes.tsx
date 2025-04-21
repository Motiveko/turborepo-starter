import { Route, Routes } from "react-router";
import HomeLayout from "@web/layouts/home";
import AboutPage from "@web/pages/about";
import HomePage from "@web/pages/home";
import NotFoundPage from "@web/pages/not-found";
import TodoPage from "@web/pages/todo";
import LoginPage from "@web/pages/login";
import { useEffect } from "react";
import { postRenderSetup } from "@web/init";
import { useNavigate } from "react-router";

function AppRoutes(): JSX.Element {
  const navigate = useNavigate();

  useEffect(() => {
    const cleanup = postRenderSetup({ navigate });
    return cleanup;
  }, []);

  return (
    <Routes>
      <Route element={<HomeLayout />} path="/">
        <Route element={<HomePage />} index />
        <Route element={<LoginPage />} path="login" />
        <Route element={<AboutPage />} path="about" />
        <Route element={<TodoPage />} path="todo" />
        <Route element={<NotFoundPage />} path="*" />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
