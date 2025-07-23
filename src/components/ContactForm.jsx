// src/components/ContactForm.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { FaLinkedin, FaGithub } from 'react-icons/fa';

const ContactForm = ({ showToast }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    
    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await axios.post('https://emaisender.vercel.app/send-email', {
        name,
        email,
        message
      });
      
      showToast('Message sent successfully!', 'success');
      setName('');
      setEmail('');
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
      showToast('Failed to send message', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactMethods = [
    { 
      icon: '📧', 
      title: 'Email', 
      value: 'support@aibox.com',
      action: 'mailto:support@aibox.com' 
    },
    { 
      icon: '🕒', 
      title: 'Support Hours', 
      value: 'Mon-Fri: 9AM-6PM',
      action: null 
    },
  ];

  return (
    <div className="contact-section">
      <motion.div 
        className="contact-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="contact-header"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2>Contact Us</h2>
          <p>Have questions about Aibox? Reach out to our team.</p>
        </motion.div>

        <div className="contact-content">
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3>Quick Links</h3>
            <div className="methods-grid">
              {contactMethods.map((method, index) => (
                <motion.div
                  key={index}
                  className="method-card"
                  whileHover={{ y: -5 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <div className="method-icon">{method.icon}</div>
                  <h4>{method.title}</h4>
                  {method.action ? (
                    <a href={method.action} className="method-link">{method.value}</a>
                  ) : (
                    <p>{method.value}</p>
                  )}
                </motion.div>
              ))}
            </div>

            <div className="social-links">
              <h4>Connect With Us</h4>
              <div className="social-icons">
                <motion.a
                  href="https://www.linkedin.com/in/sabih-khan-779185309"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaLinkedin className="social-icon" />
                </motion.a>
                <motion.a
                  href="https://github.com/sabihkhan"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaGithub className="social-icon" />
                </motion.a>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="contact-form-wrapper"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <div className="floating-label-group">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder=" "
                    className={errors.name ? 'error' : ''}
                  />
                  <label htmlFor="name">Your Name</label>
                  {errors.name && <span className="error-message">{errors.name}</span>}
                </div>
              </div>

              <div className="form-group">
                <div className="floating-label-group">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder=" "
                    className={errors.email ? 'error' : ''}
                  />
                  <label htmlFor="email">Email Address</label>
                  {errors.email && <span className="error-message">{errors.email}</span>}
                </div>
              </div>

              <div className="form-group">
                <div className="floating-label-group">
                  <textarea
                    id="message"
                    name="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder=" "
                    className={errors.message ? 'error' : ''}
                    rows="5"
                  />
                  <label htmlFor="message">Your Message</label>
                  {errors.message && <span className="error-message">{errors.message}</span>}
                </div>
              </div>

              <motion.button
                type="submit"
                className="submit-button"
                disabled={isSubmitting}
                whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner"></span>
                    Sending...
                  </>
                ) : (
                  'Send Message'
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactForm;