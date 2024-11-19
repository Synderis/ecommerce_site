import React from 'react';
import { BrowserRouter as Router} from 'react-router-dom';
import { StickyNavbar } from './components/NavBar';
import { IoMoon } from "react-icons/io5";
import { IoSunny } from "react-icons/io5";
// import DarkMode from './Components/DarkMode';
import FooterBar from "./components/Footer";

const App: React.FC = () => {
  

  return (
    <div style={{ marginLeft: '10px'}}>
      <StickyNavbar />
    </div>
  );
};

// Wrap the App component with Router in the main entry file (e.g., index.tsx)
const AppWrapper: React.FC = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;

