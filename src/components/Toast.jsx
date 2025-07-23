// src/components/Toast.jsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Toast = ({ toast }) => {
  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          className={`toast ${toast.type}`}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 20 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
        >
          <div className="toast-icon">
            {toast.type === 'success' ? '✓' : '⚠️'}
          </div>
          <div className="toast-message">{toast.message}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;