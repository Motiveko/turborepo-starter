import { Route, Routes } from "react-router";
import HomeLayout from "@web/layouts/home";
import AboutPage from "@web/pages/about";
import HomePage from "@web/pages/home";
import NotFoundPage from "@web/pages/not-found";
import TodoPage from "@web/pages/todo";
import LoginPage from "@web/pages/login";

function AppRoutes(): JSX.Element {
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
