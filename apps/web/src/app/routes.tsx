import { Route, Routes } from "react-router";
import HomeLayout from "@web/layouts/home";
import AboutPage from "@web/pages/about";
import HomePage from "@web/pages/home";
import TodoPage from "@web/pages/todo";

function AppRoutes(): JSX.Element {
  return (
    <Routes>
      <Route />
      <Route element={<HomeLayout />} path="/">
        <Route element={<HomePage />} index />
        <Route element={<AboutPage />} path="about" />
        <Route element={<TodoPage />} path="todo" />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
