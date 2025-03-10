import HomeLayout from "@web/layout/home";
import AboutPage from "@web/pages/about";
import HomePage from "@web/pages/home";
import { ReactNode } from "react";
import { Route, Routes } from "react-router";

function AppRoutes(): JSX.Element {
  return (
    <Routes>
      <Route></Route>
      <Route path="/" element={<HomeLayout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
