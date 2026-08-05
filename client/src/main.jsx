import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./redux/store";

import "./index.css";

import "./assets/styles/variables.css";
import "./assets/styles/reset.css";
import "./assets/styles/components.css";

import App from "./App.jsx";
import AuthInitializer from "./features/auth/components/AuthInitializer";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <AuthInitializer>
        <App />
      </AuthInitializer>
    </Provider>
  </StrictMode >
);