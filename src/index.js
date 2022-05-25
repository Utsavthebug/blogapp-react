import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { FormContextWrapper } from "./contexts/FormContext";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <FormContextWrapper>
      <App />
    </FormContextWrapper>
  </React.StrictMode>
);
