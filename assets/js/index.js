import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";

import store from "./store";
import App from "./components/App";
import { ToastProvider } from "./components/ui/toast";
import { getCurrentUser, JWT_TOKEN_KEY } from "./actions/authActions";

import "../css/app.css";

axios.defaults.baseURL = "/api/v1";

const token = localStorage.getItem(JWT_TOKEN_KEY);
if (token) {
  store.dispatch(getCurrentUser(token));
}

const container = document.getElementById("app");
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <ToastProvider>
        <App />
      </ToastProvider>
    </BrowserRouter>
  </Provider>
);
