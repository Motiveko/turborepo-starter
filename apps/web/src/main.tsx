import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "@web/index.css";
import { ToastContainer } from "react-toastify";
import AppRoutes from "@web/app/routes";
import { initialize } from "@web/init";

const el = document.getElementById("root");
if (el) {
  initialize();
  const root = createRoot(el);
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <AppRoutes />
        <ToastContainer draggable stacked />
      </BrowserRouter>
    </React.StrictMode>
  );
} else {
  throw new Error("Could not find root element");
}
