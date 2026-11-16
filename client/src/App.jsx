import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import axios from 'axios';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Portfolio from './pages/Portfolio';
import ServiceDetail from './pages/ServiceDetail';
import ContactUs from './pages/ContactUs';
import AdminDashboard from './pages/AdminDashboard';
import AdminLogin from './pages/AdminLogin';
import ProjectVisualBuilder from './pages/ProjectVisualBuilder';

function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  // Lightweight Built-In Visitor Analytics Tracker (Unique Visitor Session & Debounced)
  useEffect(() => {
    // Only track public frontend views, skip admin dashboard clicks
    if (!isAdminRoute) {
      try {
        // Generate or retrieve persistent Visitor ID from localStorage
        let visitorId = localStorage.getItem('ftl_visitor_id');
        if (!visitorId) {
          visitorId = 'vid_' + Date.now() + '_' + Math.random().toString(36).substring(2, 9);
          localStorage.setItem('ftl_visitor_id', visitorId);
        }

        // Avoid duplicate hit on React StrictMode re-renders in the exact same second
        const lastTrackKey = 'ftl_last_track';
        const lastTrack = sessionStorage.getItem(lastTrackKey);
        const currentHit = `${visitorId}:${location.pathname}`;
        
        if (lastTrack !== currentHit) {
          sessionStorage.setItem(lastTrackKey, currentHit);
          axios.post('/api/analytics/track', {
            visitorId,
            path: location.pathname,
            referrer: document.referrer || 'Direct',
            screenWidth: window.innerWidth
          }).catch(() => {});
        }
      } catch (err) {}
    }
  }, [location.pathname, isAdminRoute]);

  return (
    <div className={`min-h-screen ${isAdminRoute ? '' : 'flex flex-col justify-between'} bg-black text-white`}>
      {/* Do not render public Navbar or Footer on Admin Portal pages */}
      {!isAdminRoute && <Navbar />}
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/services/:slug" element={<ServiceDetail />} />
          
          {/* Dedicated Admin Portal URLs */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/portfolio/builder" element={<ProjectVisualBuilder />} />
          <Route path="/admin/portfolio/builder/:slug" element={<ProjectVisualBuilder />} />
          <Route path="/admin/:tab" element={<AdminDashboard />} />

          {/* Dynamic SEO-Friendly Project Single Page (e.g. domain.com/alpine-ridge-explorer) */}
          <Route path="/:slug" element={<ServiceDetail />} />
        </Routes>
      </div>
      {!isAdminRoute && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
