import { Route, Routes, useNavigate } from "react-router";
import { useEffect } from "react";
import BaseLayout from "@web/layouts/base";
import AboutPage from "@web/pages/about";
import HomePage from "@web/pages/home";
import NotFoundPage from "@web/pages/not-found";
import TodoPage from "@web/pages/todo";
import LoginPage from "@web/pages/login";
import { postRenderSetup } from "@web/init";
import ProtectedRoute from "@web/routes/protected-route";
import Header from "@web/layouts/header";
import Footer from "@web/layouts/footer";

function AppRoutes(): JSX.Element {
  const navigate = useNavigate();

  useEffect(() => {
    const cleanup = postRenderSetup({ navigate });
    return cleanup;
  }, []);

  return (
    <Routes>
      <Route element={<BaseLayout footer={<Footer />} />} path="/login">
        <Route element={<LoginPage />} index />
      </Route>
      <Route
        element={<BaseLayout footer={<Footer />} header={<Header />} />}
        path="/"
      >
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
