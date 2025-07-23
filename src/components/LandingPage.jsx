// src/components/LandingPage.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';;
import Header from './Header';
import Hero from './Hero';
import LoginRegister from './LoginRegister';
import AIWriter from './AIWriter';
import MessageSender from './MessageSender';
import ContactForm from './ContactForm';
import HistorySection from './HistorySection';
import Toast from './Toast';
import Footer from './Footer';
import Imagegen from '../assets/Imagegen';
const LandingPage = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [darkMode, setDarkMode] = useState(false);
  const [toast, setToast] = useState(null);
  
  const showToast = (message, type) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className={`landing-page ${darkMode ? 'dark-mode' : ''}`}>
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />
      
      <AnimatePresence mode="wait">
        {activeTab === 'home' && (
          <motion.div
            key="home"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <Hero setActiveTab={setActiveTab} />
          </motion.div>
        )}
        
        {activeTab === 'login' && (
          <motion.div
            key="login"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="section-container"
          >
            <LoginRegister showToast={showToast} />
          </motion.div>
        )}
        
        {activeTab === 'writer' && (
          <motion.div
            key="writer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="section-container"
          >
            <AIWriter showToast={showToast} />
          </motion.div>
        )}
        
        {activeTab === 'demo' && (
          <motion.div
            key="demo"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="section-container"
          >
            <MessageSender showToast={showToast} />
          </motion.div>
        )}
        
        {activeTab === 'contact' && (
          <motion.div
            key="contact"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="section-container"
          >
            <ContactForm showToast={showToast} />
          </motion.div>
        )}
          {activeTab === 'imagegen' && (
          <motion.div
            key="imagegen"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="section-container"
          >
            <Imagegen showToast={showToast} />
          </motion.div>
        )}
        {activeTab === 'history' && (
          <motion.div
            key="history"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="section-container"
          >
            <HistorySection showToast={showToast} />
          </motion.div>
        )}
      </AnimatePresence>
      
      <Toast toast={toast} />
      <Footer />
    </div>
  );
};

export default LandingPage;