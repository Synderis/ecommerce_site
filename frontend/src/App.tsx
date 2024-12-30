import React, { useEffect } from 'react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import { StickyNavbar } from './components/NavBar';
import { api_url } from './utils/utils';
import FooterBar  from './components/Footer';
import { Routes, Route } from 'react-router-dom';
import { routes } from './utils/routes';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App: React.FC = () => {
  useEffect(() => {
    const refreshToken = async () => {
      try {
        if (!localStorage.getItem('token')) {
          return;
        }
        const url = `${api_url}/auth/refresh`;
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'refresh-token': localStorage.getItem('refreshToken') ?? '',
          }
        });
        const data = await response.json();
        localStorage.setItem('token', data.access_token);
        localStorage.setItem('refreshToken', data.refresh_token);
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
    <Router>
      <ScrollToTop />
      <div className="app-container">
        <StickyNavbar />
        <Routes>
          {routes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Routes>
        <FooterBar />
      </div>
    </Router>
  );
};

export default App;

