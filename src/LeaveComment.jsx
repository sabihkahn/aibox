import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const LeaveComment = () => {
  const darkMode = true;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('');

    try {
      await axios.post('https://emaisender.vercel.app/send-email', {
        name: formData.name,
        email: formData.email,
        message: formData.message
      });

      setStatus('✅ Comment sent successfully!');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setStatus('❌ Failed to send comment.');
    }
  };

  const sectionStyle = {
    backgroundColor: darkMode ? '#111' : '#f4f4f4',
    color: darkMode ? '#fff' : '#000',
    padding: '4rem 2rem',
    textAlign: 'center'
  };

  const headingStyle = {
    fontSize: '2rem',
    color: '#00ffae',
    marginBottom: '2rem'
  };

  const formStyle = {
    maxWidth: '600px',
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  };

  const inputStyle = {
    padding: '1rem',
    borderRadius: '5px',
    border: '1px solid #333',
    backgroundColor: darkMode ? '#1a1a1a' : '#fff',
    color: darkMode ? '#fff' : '#000',
    fontSize: '1rem'
  };

  const buttonStyle = {
    backgroundColor: '#00ffae',
    color: '#000',
    border: 'none',
    padding: '1rem',
    borderRadius: '5px',
    fontWeight: 'bold',
    fontSize: '1rem',
    cursor: 'pointer'
  };

  const statusStyle = {
    marginTop: '1rem',
    fontWeight: 'bold',
    color: status.startsWith('✅') ? '#00ffae' : 'red'
  };

  return (
    <section style={sectionStyle}>
      <h2 style={headingStyle}>Leave a Comment</h2>
      <motion.form
        style={formStyle}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        onSubmit={handleSubmit}
      >
        <input
          style={inputStyle}
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          style={inputStyle}
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <textarea
          style={{ ...inputStyle, minHeight: '120px', resize: 'vertical' }}
          name="message"
          placeholder="Your Comment"
          value={formData.message}
          onChange={handleChange}
          required
        />
        <motion.button
          type="submit"
          style={buttonStyle}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Submit Comment
        </motion.button>
        {status && <div style={statusStyle}>{status}</div>}
      </motion.form>
    </section>
  );
};

export default LeaveComment;
