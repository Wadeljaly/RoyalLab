import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import Home from './Home';
import Clinics from './Clinics';
import Tests from './Tests';
import Booking from './Booking';
import Results from './Results';
import Contact from './Contact';
import Dashboard from './Dashboard';
import AlMoataman from './AlMoataman';
import Login from './Login';
import { Navigate } from 'react-router-dom';
import './index.css';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <div className="app-wrapper" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/clinics" element={<Clinics />} />
            <Route path="/tests" element={<Tests />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/results" element={<Results />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/login" element={<Login />} />
            <Route path="/al-moataman" element={<AlMoataman />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
