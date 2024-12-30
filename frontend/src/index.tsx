import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

const AppWrapper = () => {
  useEffect(() => {
    let storedDarkMode = localStorage.getItem('dark-mode');
    if (storedDarkMode === null) {
      localStorage.setItem('dark-mode', 'true');
      storedDarkMode = 'true';
    }
    if (storedDarkMode === 'true') {
      document.body.classList.add("dark");
      document.body.style.backgroundColor = "rgb(66, 66, 66)";
    } else {
      document.body.classList.remove("dark");
      document.body.style.backgroundColor = "white";
    }
  }, []);

  return <App />;
};

root.render(
  <AppWrapper />
);