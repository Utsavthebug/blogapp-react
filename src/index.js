import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { FormContextWrapper } from "./contexts/FormContext";
import { SnapContextWrapper } from "./contexts/SnapContext";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <FormContextWrapper>
      <SnapContextWrapper>
        <App />
      </SnapContextWrapper>
    </FormContextWrapper>
  </React.StrictMode>
);
