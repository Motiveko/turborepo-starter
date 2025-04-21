import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "@web/index.css";
import { ToastContainer } from "react-toastify";
import AppRoutes from "@web/app/routes";
import { preRenderSetup } from "@web/init";

const el = document.getElementById("root");
if (el) {
  preRenderSetup();
  const root = createRoot(el);
  root.render(
    <BrowserRouter>
      <AppRoutes />
      <ToastContainer draggable stacked />
    </BrowserRouter>
  );
} else {
  throw new Error("Could not find root element");
}
