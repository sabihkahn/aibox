// src/components/Header.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Header = ({ activeTab, setActiveTab, darkMode, setDarkMode }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    setIsLoggedIn(false);
    setActiveTab('home');
  };

  const tabs = [
    { id: 'home', label: 'Home' },
    ...(isLoggedIn 
      ? [
          { id: 'writer', label: 'AI Writer' },
          { id: 'imagegen', label: 'Image Generator' },
          { id: 'history', label: 'Your Searches' },
          { id: 'logout', label: 'Logout', action: handleLogout }
        ]
      : [
          { id: 'login', label: 'Login' }
        ]),
    { id: 'contact', label: 'Contact' }
  ];

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <header className={`header ${darkMode ? 'dark' : 'light'}`}>
      <div className="header-container">
        <motion.div 
          className="logo"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileHover={{ scale: 1.05 }}
        >
          <div className="logo-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="logo-text">Aibox</span>
        </motion.div>
        
        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          <ul>
            {tabs.map(tab => (
              <li key={tab.id}>
                <motion.button
                  className={`nav-tab ${activeTab === tab.id ? 'active' : ''}`}
                  onClick={() => tab.action ? tab.action() : setActiveTab(tab.id)}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {tab.label}
                  {activeTab === tab.id && !tab.action && (
                    <motion.div 
                      className="underline" 
                      layoutId="underline"
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </motion.button>
              </li>
            ))}
          </ul>
        </nav>
        
        {/* Dark Mode Toggle */}
        <motion.button 
          className="dark-mode-toggle"
          onClick={toggleDarkMode}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {darkMode ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8V16Z" fill="currentColor"/>
              <path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM12 4V8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16V20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4Z" fill="currentColor"/>
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18Z" fill="currentColor"/>
              <path d="M11 1H13V3H11V1Z" fill="currentColor"/>
              <path d="M11 21H13V23H11V21Z" fill="currentColor"/>
              <path d="M3.51472 4.92893L4.92893 3.51472L6.34315 4.92893L4.92893 6.34315L3.51472 4.92893Z" fill="currentColor"/>
              <path d="M17.6569 19.0711L19.0711 17.6569L20.4853 19.0711L19.0711 20.4853L17.6569 19.0711Z" fill="currentColor"/>
              <path d="M1 12H3V10H1V12Z" fill="currentColor"/>
              <path d="M21 12H23V10H21V12Z" fill="currentColor"/>
              <path d="M4.92893 17.6569L6.34315 19.0711L4.92893 20.4853L3.51472 19.0711L4.92893 17.6569Z" fill="currentColor"/>
              <path d="M19.0711 6.34315L20.4853 4.92893L19.0711 3.51472L17.6569 4.92893L19.0711 6.34315Z" fill="currentColor"/>
            </svg>
          )}
        </motion.button>
        
        {/* Mobile Menu Button */}
        <motion.button 
          className={`mobile-menu-button ${mobileMenuOpen ? 'open' : ''}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Menu"
          whileTap={{ scale: 0.9 }}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </motion.button>
      </div>
      
      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.nav 
            className="mobile-nav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ul>
              {tabs.map(tab => (
                <li key={tab.id}>
                  <button
                    className={`mobile-nav-tab ${activeTab === tab.id ? 'active' : ''}`}
                    onClick={() => {
                      if (tab.action) {
                        tab.action();
                      } else {
                        setActiveTab(tab.id);
                      }
                      setMobileMenuOpen(false);
                    }}
                  >
                    {tab.label}
                    {activeTab === tab.id && !tab.action && (
                      <motion.div 
                        className="mobile-underline" 
                        layoutId="mobile-underline"
                      />
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;