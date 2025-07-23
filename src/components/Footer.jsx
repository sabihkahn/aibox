import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <motion.footer 
      className="footer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-copyright">
            <p>© {new Date().getFullYear()} Aibox AI Content Writer</p>
          </div>
          
          <motion.div 
            className="footer-credit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <p>
              Created with ❤️ by 
              <span className="highlight"> Sabih Ur Rehman</span>
            </p>
          </motion.div>
          
          <div className="footer-links">
            <a href="/terms">Tiktok</a>
            <a href="/privacy">whats app no : 03246310698</a>
          </div>
        </div>
      </div>
    </motion.footer>
  )
}

export default Footer;