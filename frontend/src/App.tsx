import React from 'react';
import { BrowserRouter as Router} from 'react-router-dom';
import { StickyNavbar } from './components/NavBar';
// import DarkMode from './Components/DarkMode';

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

