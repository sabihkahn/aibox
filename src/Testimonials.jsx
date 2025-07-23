import React from 'react';
import { motion } from 'framer-motion';

const Testimonials = () => {
  const darkMode = true;

  const testimonials = [
    {
      name: 'Aisha R.',
      text: 'This AI tool transformed the way I write content. Highly recommend!',
    },
    {
      name: 'Zain Malik',
      text: 'Absolutely love how fast and accurate the results are.',
    },
    {
      name: 'Fatima K.',
      text: 'Easy to use and saves me hours every week!',
    },
  ];

  const containerStyle = {
    backgroundColor: darkMode ? '#111' : '#f8f8f8',
    color: darkMode ? '#fff' : '#000',
    padding: '4rem 2rem',
    textAlign: 'center',
  };

  const headingStyle = {
    fontSize: '2rem',
    marginBottom: '2rem',
    color: '#00ffae',
  };

  const gridStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '2rem',
    justifyContent: 'center',
    maxWidth: '1200px',
    margin: 'auto',
  };

  const cardBaseStyle = {
    backgroundColor: darkMode ? '#1a1a1a' : '#fff',
    padding: '2rem',
    borderRadius: '8px',
    maxWidth: '300px',
    boxShadow: '0 0 10px rgba(0,0,0,0.2)',
    cursor: 'pointer',
  };

  const textStyle = {
    fontStyle: 'italic',
    lineHeight: '1.5',
  };

  const nameStyle = {
    marginTop: '1rem',
    fontWeight: 'bold',
    color: '#00ffae',
  };

  return (
    <section style={containerStyle}>
      <h2 style={headingStyle}>What Our Customers Say</h2>
      <div style={gridStyle}>
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
            whileHover={{ scale: 1.05 }}
            style={cardBaseStyle}
          >
            <p style={textStyle}>"{t.text}"</p>
            <p style={nameStyle}>— {t.name}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
