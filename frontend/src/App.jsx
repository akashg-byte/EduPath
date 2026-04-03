import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import ScrollToTopButton from './components/ScrollToTopButton';
import Home from './pages/Home';
import Courses from './pages/Courses';
import Admissions from './pages/Admissions';
import Contact from './pages/Contact';
import SearchResults from './pages/SearchResults';
import CollegeDetail from './pages/CollegeDetail';
import Compare from './pages/Compare';
import CareerGuidance from './pages/CareerGuidance';
import Gallery from './pages/Gallery';
import CutoffPredictor from './pages/CutoffPredictor';
import TermsAndConditions from './pages/TermsAndConditions';
import CookiesPolicy from './pages/CookiesPolicy';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Chatbot from './components/Chatbot';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminRoute from './components/AdminRoute';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <div className="app-container">
          <Routes>
            {/* Public Routes for Auth */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            } />

            {/* Protected Main Application */}
            <Route path="/*" element={
              <ProtectedRoute>
                <>
                  <Navbar />
                  <main style={{ minHeight: '80vh' }}>
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/courses" element={<Courses />} />
                      <Route path="/admissions" element={<Admissions />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/gallery" element={<Gallery />} />
                      <Route path="/cutoff-predictor" element={<CutoffPredictor />} />
                      <Route path="/search" element={<SearchResults />} />
                      <Route path="/college/:id" element={<CollegeDetail />} />
                      <Route path="/compare" element={<Compare />} />
                      <Route path="/career-guidance" element={<CareerGuidance />} />
                      <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
                      <Route path="/cookies-policy" element={<CookiesPolicy />} />
                      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                    </Routes>
                  </main>
                  <Chatbot />
                  <Footer />
                  <ScrollToTopButton />
                </>
              </ProtectedRoute>
            } />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
