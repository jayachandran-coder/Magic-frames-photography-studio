import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ReelSlider from './components/ReelSlider';
import Services from './components/Services';
import About from './components/About';
import MyWorks from './components/MyWorks';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// Lazy loaded routes for performance optimization
const Login = React.lazy(() => import('./pages/Login'));
const AdminDashboard = React.lazy(() => import('./pages/AdminDashboard'));
const SaaSHero = React.lazy(() => import('./components/SaaSHero'));
const GalleryPage = React.lazy(() => import('./pages/GalleryPage'));

function Home() {
  useEffect(() => {
    // Only count as one visit per browser session
   const API_URL = import.meta.env.VITE_API_URL;

const hasVisited = sessionStorage.getItem('magic_frames_visited');

fetch(`${API_URL}/api/stats`)
  .then(res => res.json())
  .then(data => {
    console.log(data.count);
  });
  }, []);
  return (
    <>
      <Navbar />
      <main>
        {/* Cinematic Hero Section */}
        <ReelSlider />
        
        {/* Core Sections */}
        <Services />
        <About />
        <MyWorks />
        <Contact />
      </main>
      
      {/* Footer */}
      <Footer />
    </>
  );
}

function App() {
  return (
    <Router>
      <div className="bg-dark min-h-screen font-sans text-neutral-200 selection:bg-primary/30 selection:text-white">
        <React.Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-black"><div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div></div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/login" element={<Login />} />
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            <Route path="/saas-demo" element={<SaaSHero />} />
          </Routes>
        </React.Suspense>
      </div>
    </Router>
  );
}

export default App;
