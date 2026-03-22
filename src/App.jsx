import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/layout/NavBar';
import LandingPage from './pages/LandingPage';
import HomePage from './pages/HomePage';
import SavedPage from './pages/SavedPage';
import DigestPage from './pages/DigestPage';
import SettingsPage from './pages/SettingsPage';
import ProofPage from './pages/ProofPage';
import NotFoundPage from './pages/NotFoundPage';
import ErrorBoundary from './components/ui/ErrorBoundary';
import './App.css';

function App() {
  console.log('App is rendering');
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <div className="app">
          {/* Shared Top Navigation Bar */}
          <NavBar />

          {/* Main Content Area */}
          <main className="app__main">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/dashboard" element={<HomePage />} />
              <Route path="/saved" element={<SavedPage />} />
              <Route path="/digest" element={<DigestPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/proof" element={<ProofPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
        </div>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
