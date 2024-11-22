import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { ThemeProvider } from "@material-tailwind/react";

const AppWrapper = () => {
  useEffect(() => {
    if (document.body.classList.contains("dark")) {
      document.body.style.backgroundColor = "rgb(66, 66, 66)";
    } else {
      document.body.style.backgroundColor = "white";
    }
  }, []);

  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>,
);