import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import { BookingProvider } from '../context/BookingContext';
import { UIProvider } from '../context/UIContext';
import AppRoutes from './routes';
import '../styles/globals.scss';

function App() {
  return (
    <UIProvider>
      <AuthProvider>
        <BookingProvider>
          <Router>
            <div className="App">
              <AppRoutes />
            </div>
          </Router>
        </BookingProvider>
      </AuthProvider>
    </UIProvider>
  );
}

export default App;
