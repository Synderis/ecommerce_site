import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { StickyNavbar } from './components/NavBar';

const App: React.FC = () => {
  useEffect(() => {
    const refreshToken = async () => {
      try {
        const response = await fetch('http://localhost:8000/auth/refresh', {
          method: 'POST',
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('refreshToken'),
          }
        });
        const data = await response.json();
        localStorage.setItem('token', data.token);
        localStorage.setItem('tokenExpires', `${Date.now() + 30 * 60 * 1000}`);
      } catch (error) {
        console.error('Error refreshing token:', error);
        // You may want to handle the error by logging the user out or displaying an error message
      }
    };

    const tokenExpires = localStorage.getItem('tokenExpires') || '0';
    if (tokenExpires && Date.now() < +tokenExpires) {
      // Token is still valid, don't refresh yet
      return;
    }

    refreshToken();
    const intervalId = setInterval(refreshToken, 30 * 60 * 1000); // 30 minutes

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div style={{ marginLeft: '10px' }}>
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