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
      : [{ id: 'login', label: 'Login' }]),
    { id: 'contact', label: 'Contact' }
  ];

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const styles = {
    header: {
      width: '100%',
      backgroundColor: darkMode ? '#111' : '#f9f9f9',
      color: darkMode ? '#fff' : '#000',
      borderBottom: `1px solid ${darkMode ? '#333' : '#ccc'}`,
      position: 'sticky',
      top: 0,
      zIndex: 999,
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '1rem 2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
    },
    logo: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      fontSize: '1.5rem',
      fontWeight: 'bold',
      color: '#00ffae',
    },
    svg: {
      width: '24px',
      height: '24px',
    },
    nav: {
      display: 'flex',
      gap: '1rem',
      listStyle: 'none',
      padding: 0,
      margin: 0,
    },
    navButton: (isActive) => ({
      background: 'transparent',
      border: 'none',
      color: darkMode ? '#fff' : '#000',
      fontSize: '1rem',
      fontWeight: isActive ? 'bold' : 'normal',
      position: 'relative',
      cursor: 'pointer',
    }),
    underline: {
      position: 'absolute',
      bottom: '-4px',
      left: 0,
      height: '2px',
      width: '100%',
      background: '#00ffae',
    },
    darkToggle: {
      background: 'transparent',
      border: 'none',
      cursor: 'pointer',
      color: darkMode ? '#fff' : '#000',
      marginLeft: '1rem',
    },
    mobileButton: {
      background: 'transparent',
      border: 'none',
      cursor: 'pointer',
      display: 'flex',
      flexDirection: 'column',
      gap: '4px',
    },
    bar: {
      width: '22px',
      height: '2px',
      background: darkMode ? '#fff' : '#000',
      borderRadius: '1px',
    },
    mobileNav: {
      backgroundColor: darkMode ? '#1a1a1a' : '#f0f0f0',
      padding: '1rem 2rem',
    },
    mobileTab: (isActive) => ({
      background: 'transparent',
      border: 'none',
      color: darkMode ? '#fff' : '#000',
      fontSize: '1rem',
      textAlign: 'left',
      width: '100%',
      position: 'relative',
      cursor: 'pointer',
      fontWeight: isActive ? 'bold' : 'normal',
    }),
    mobileUnderline: {
      position: 'absolute',
      bottom: '-4px',
      left: 0,
      height: '2px',
      width: '100%',
      background: '#00ffae',
    }
  };

  return (
    <header style={styles.header}>
      <div style={styles.container}>
        {/* Logo */}
        <motion.div
          style={styles.logo}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileHover={{ scale: 1.05 }}
        >
          <div style={styles.svg}>
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span>Aibox</span>
        </motion.div>

        {/* Desktop Nav */}
        <nav style={{ display: window.innerWidth < 768 ? 'none' : 'block' }}>
          <ul style={styles.nav}>
            {tabs.map((tab) => (
              <li key={tab.id}>
                <motion.button
                  style={styles.navButton(activeTab === tab.id)}
                  onClick={() => (tab.action ? tab.action() : setActiveTab(tab.id))}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {tab.label}
                  {activeTab === tab.id && !tab.action && (
                    <motion.div
                      style={styles.underline}
                      layoutId="underline"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </motion.button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Dark Mode + Mobile Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <motion.button
            style={styles.darkToggle}
            onClick={toggleDarkMode}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {darkMode ? '☀️' : '🌙'}
          </motion.button>

          <motion.button
            style={styles.mobileButton}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileTap={{ scale: 0.9 }}
          >
            <span style={styles.bar}></span>
            <span style={styles.bar}></span>
            <span style={styles.bar}></span>
          </motion.button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.nav
            style={styles.mobileNav}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: 0, margin: 0 }}>
              {tabs.map((tab) => (
                <li key={tab.id}>
                  <button
                    style={styles.mobileTab(activeTab === tab.id)}
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
                      <motion.div style={styles.mobileUnderline} layoutId="mobile-underline" />
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
