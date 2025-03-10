import HomeLayout from "@web/layouts/home";
import AboutPage from "@web/pages/about";
import HomePage from "@web/pages/home";
import TodoPage from "@web/pages/todo";
import { ReactNode } from "react";
import { Route, Routes } from "react-router";

function AppRoutes(): JSX.Element {
  return (
    <Routes>
      <Route></Route>
      <Route path="/" element={<HomeLayout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="todo" element={<TodoPage />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
