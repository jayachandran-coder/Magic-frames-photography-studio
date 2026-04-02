import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ReelSlider from './components/ReelSlider';
import Services from './components/Services';
import About from './components/About';
import MyWorks from './components/MyWorks';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';

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
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
