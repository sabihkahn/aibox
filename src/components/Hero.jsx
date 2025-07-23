// // src/components/Hero.jsx
// import React from 'react';
// import { motion } from 'framer-motion';

// const Hero = ({ setActiveTab }) => {
//   return (
//     <section className="hero">
//       <div className="hero-container">
//         <div className="hero-content">
//           <motion.h1
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2 }}
//           >
//             Transform Your Content <br />
//             <span className="highlight">With AI-Powered Writing</span>
//           </motion.h1>
          
//           <motion.p
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.4 }}
//           >
//             Aibox leverages cutting-edge AI to generate high-quality content in seconds. 
//             From blog posts to marketing copy, our tools help you create better content faster.
//           </motion.p>
          
//           <motion.div 
//             className="hero-buttons"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.6 }}
//           >
//             <motion.button 
//               className="primary-button"
//               whileHover={{ 
//                 scale: 1.05,
//                 boxShadow: "0 0 15px rgba(46, 213, 115, 0.5)"
//               }}
//               whileTap={{ scale: 0.95 }}
//               onClick={() => setActiveTab('writer')}
//             >
//               Start Writing Now
//             </motion.button>
            
           
//           </motion.div>
//         </div>
        
//         <motion.div 
//           className="hero-graphic"
//           initial={{ opacity: 0, x: 50 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ delay: 0.8, type: "spring", stiffness: 100 }}
//         >
//           <div className="circuit-pattern"></div>
//           <div className="neon-glow"></div>
//           <div className="ai-interface">
//             <div className="screen">
//               <div className="code-line"></div>
//               <div className="code-line"></div>
//               <div className="code-line"></div>
//               <div className="code-line"></div>
//               <div className="cursor"></div>
//             </div>
//             <div className="keyboard"></div>
//           </div>
//         </motion.div>
//       </div>
      
//       <div className="hero-scroll-indicator">
//         <motion.div
//           animate={{ 
//             y: [0, 10, 0],
//           }}
//           transition={{ 
//             repeat: Infinity,
//             duration: 1.5
//           }}
//         >
//           <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//             <path d="M12 5V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//             <path d="M19 12L12 19L5 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//           </svg>
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default Hero;
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import imagegen from '../assets/IMGGEN.png';
import contentgen from '../assets/PROMTRES.png';
import VideoDemo from '../VideoDemo';

const ParticleBackground = () => {
  const [particles, setParticles] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Create new particles with yellow color
      const newParticles = Array.from({ length: 3 }, (_, i) => ({
        id: Math.random().toString(36).substr(2, 9) + i,
        x,
        y,
        size: Math.random() * 5 + 2,
        color: `hsl(${Math.random() * 10 + 50}, 100%, ${Math.random() * 30 + 60}%)`, // Yellow shades
      }));
      
      setParticles((prev) => [
        ...prev.slice(Math.max(prev.length - 50, 0)),
        ...newParticles,
      ]);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className="particle-container">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="particle"
          initial={{
            x: particle.x,
            y: particle.y,
            opacity: 1,
            scale: 1,
          }}
          animate={{
            x: particle.x + (Math.random() - 0.5) * 100,
            y: particle.y + (Math.random() - 0.5) * 100,
            opacity: 0,
            scale: 0,
          }}
          transition={{
            duration: Math.random() * 1 + 0.5,
            ease: "easeOut",
          }}
          style={{
            position: 'absolute',
            width: particle.size,
            height: particle.size,
            borderRadius: '50%',
            backgroundColor: particle.color,
            boxShadow: `0 0 10px ${particle.color}, 0 0 20px ${particle.color}`,
            pointerEvents: 'none',
          }}
        />
      ))}
    </div>
  );
};

const Hero = ({ setActiveTab }) => {

  return (
    <div className="landing-page">
      <ParticleBackground />
      
      {/* Header */}
     
      
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-container">
          <div className="hero-content">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Transform Your Content <br />
              <span className="highlight">With AI-Powered Writing</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              AIBox leverages cutting-edge AI to generate high-quality content in seconds. 
              From blog posts to marketing copy, our tools help you create better content faster.
            </motion.p>
            
            <motion.div 
              className="hero-buttons"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <motion.button 
                className="primary-button"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 0 15px rgba(255, 230, 0, 0.5)",
                  backgroundColor: "#ffd900",
                  color: "#000"
                }}
                whileTap={{ scale: 0.95 }} 
               onClick={() => setActiveTab('writer')}
              >
                Start Writing Now
              </motion.button>
            
            </motion.div>
          </div>
          
          <motion.div 
            className="hero-graphic"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, type: "spring", stiffness: 100 }}
          >
            <div className="circuit-pattern"></div>
            <div className="neon-glow"></div>
            <div className="ai-interface">
              <div className="screen">
                <div className="code-line"></div>
                <div className="code-line"></div>
                <div className="code-line"></div>
                <div className="code-line"></div>
                <div className="cursor"></div>
              </div>
              <div className="keyboard"></div>
            </div>
          </motion.div>
        </div>
        
        <div className="hero-scroll-indicator">
          <motion.div
            animate={{ 
              y: [0, 10, 0],
            }}
            transition={{ 
              repeat: Infinity,
              duration: 1.5
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 5V19" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M19 12L12 19L5 12" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.div>
        </div>
      </section>
<section className="feature-sections">
  {/* Image Generator Section */}
  <motion.div
    className="feature-card"
    initial={{ opacity: 0, x: -100 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.4, duration: 0.8, type: "spring" }}
    viewport={{ once: true, amount: 0.5 }}
  >
    <img src={imagegen} alt="Image Generator" className="feature-img" />
    <div className="feature-text">
      <h2>AI Image Generator</h2>
      <p>Create stunning visuals from text prompts using our AI image generation engine.</p>
    </div>
  </motion.div>

  {/* Content Generator Section */}
  <motion.div
    className="feature-card"
    initial={{ opacity: 0, x: 100 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.6, duration: 0.8, type: "spring" }}
    viewport={{ once: true, amount: 0.5 }}
  >
    <div className="feature-text">
      <h2>AI Content Writer</h2>
      <p>Generate blogs, ads, and more instantly with our smart AI writer tools.</p>
    </div>
    <img src={contentgen} alt="Content Generator" className="feature-img" />
  </motion.div>
</section>
<VideoDemo />
    </div>
  );
};

export default Hero;

const styles = `
/* Base styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

body {
  background-color: #000;
  color: #fff;
  overflow-x: hidden;
}

.video-demo-section {
  background: radial-gradient(circle at top left, #0f0 10%, #000 90%);
  padding: 80px 20px;
  text-align: center;
  color: white;
}

.video-title {
  font-size: 2rem;
  margin-bottom: 30px;
  background: linear-gradient(to right, #fff200, #00ff88);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: bold;
}

.video-card {
  max-width: 800px;
  margin: 0 auto;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 0 30px rgba(0, 255, 0, 0.15);
  backdrop-filter: blur(12px);
}

.video-player {
  width: 100%;
  height: auto;
  display: block;
  border: none;
  outline: none;
  background: transparent;
}



/* Feature Sections */
.feature-sections {
  display: flex;
  flex-direction: column;
  gap: 3rem;
  padding: 5% 5% 10%;
  background: #0a0a0a;
  z-index: 2;
  position: relative;
}

.feature-card {
  display: flex;
  align-items: center;
  background: #111;
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 0 25px rgba(255, 217, 0, 0.05);
  gap: 2rem;
  transition: all 0.3s ease;
}

.feature-img {
  width:600px;
  height: 300px;
  border-radius: 1rem;
  object-fit: cover;
  border: 2px solid #22c55e;
  box-shadow: 0 0 20px rgba(34, 197, 94, 0.3);
}

.feature-text h2 {
  font-size: 1.8rem;
  color: #ffd900;
  margin-bottom: 0.5rem;
}

.feature-text p {
  color: #ccc;
  font-size: 1rem;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .feature-card {
    flex-direction: column;
    text-align: center;
  }

  .feature-img {
    width: 100%;
    max-width: 300px;
    height: auto;
  }
}

.landing-page {
  position: relative;
  min-height: 100vh;
  background: #000;
  overflow: hidden;
}

/* Particle effects */
.particle-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

/* Header */
.header {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 5%;
  z-index: 10;
}

.logo {
  font-size: 1.8rem;
  font-weight: 800;
  color: #22c55e;
  cursor: pointer;
  transition: all 0.3s ease;
}

.logo-text {
  color: #ffd900;
}

.header nav ul {
  display: flex;
  list-style: none;
  gap: 2rem;
}

.header nav ul li a {
  text-decoration: none;
  color: #e5e7eb;
  font-weight: 500;
  font-size: 1rem;
  transition: all 0.3s ease;
  position: relative;
  padding: 0.5rem 0;
}

.header nav ul li a:hover {
  color: #ffd900;
}

.header nav ul li a::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: #ffd900;
  transition: width 0.3s ease;
}

.header nav ul li a:hover::after {
  width: 100%;
}

.auth-buttons {
  display: flex;
  gap: 1rem;
}

.sign-in, .sign-up {
  padding: 0.6rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
}

.sign-in {
  background: transparent;
  color: #e5e7eb;
  border: 1px solid #4b5563;
}

.sign-in:hover {
  background: #1a1a1a;
  border-color: #ffd900;
  color: #ffd900;
}

.sign-up {
  background: #22c55e;
  color: #000;
}

.sign-up:hover {
  background: #16a34a;
  box-shadow: 0 0 15px rgba(34, 197, 94, 0.5);
}

/* Hero Section */
.hero {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 0 5%;
  z-index: 2;
}

.hero-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  gap: 4rem;
}

.hero-content {
  flex: 1;
  max-width: 600px;
}

.hero-content h1 {
  font-size: 3.5rem;
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 1.5rem;
  background: linear-gradient(to right, #e5e7eb, #d1d5db);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.highlight {
  background: linear-gradient(to right, #22c55e, #84cc16);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-content p {
  font-size: 1.2rem;
  line-height: 1.7;
  color: #d1d5db;
  margin-bottom: 2.5rem;
  max-width: 90%;
}

.hero-buttons {
  display: flex;
  gap: 1rem;
}

.primary-button, .secondary-button {
  padding: 0.9rem 2rem;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
}

.primary-button {
  background: #22c55e;
  color: #000;
}

.secondary-button {
  background: transparent;
  color: #e5e7eb;
  border: 1px solid #4b5563;
}

/* Hero Graphic */
.hero-graphic {
  position: relative;
  flex: 1;
  max-width: 600px;
  height: 500px;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
  background: linear-gradient(145deg, #0a0a0a, #111);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.circuit-pattern {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: 
    radial-gradient(circle at 10% 20%, rgba(34, 197, 94, 0.05) 0%, transparent 20%),
    radial-gradient(circle at 80% 80%, rgba(255, 217, 0, 0.05) 0%, transparent 20%),
    linear-gradient(to bottom right, transparent 49%, rgba(34, 197, 94, 0.03) 50%, transparent 51%),
    linear-gradient(to top left, transparent 49%, rgba(34, 197, 94, 0.03) 50%, transparent 51%);
  opacity: 0.6;
}

.neon-glow {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(34, 197, 94, 0.1) 0%, transparent 60%);
  animation: rotate 20s linear infinite;
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.ai-interface {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  height: 70%;
  background: rgba(10, 10, 10, 0.8);
  border: 1px solid rgba(34, 197, 94, 0.2);
  border-radius: 0.5rem;
  box-shadow: 0 0 20px rgba(34, 197, 94, 0.1);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.screen {
  flex: 1;
  background: #0a0a0a;
  padding: 1.5rem;
  font-family: 'Courier New', monospace;
  color: #22c55e;
  font-size: 1rem;
  line-height: 1.5;
  position: relative;
  overflow: hidden;
}

.code-line {
  height: 1.2rem;
  background: linear-gradient(to right, #22c55e, transparent);
  margin-bottom: 0.5rem;
  border-radius: 2px;
  animation: pulse 2s infinite;
}

.code-line:nth-child(1) {
  width: 70%;
  animation-delay: 0s;
}

.code-line:nth-child(2) {
  width: 90%;
  animation-delay: 0.5s;
}

.code-line:nth-child(3) {
  width: 60%;
  animation-delay: 1s;
}

.code-line:nth-child(4) {
  width: 80%;
  animation-delay: 1.5s;
}

.cursor {
  position: absolute;
  bottom: 1.5rem;
  left: 1.5rem;
  width: 10px;
  height: 1.2rem;
  background: #ffd900;
  animation: blink 1s infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

@keyframes pulse {
  0% { opacity: 0.4; }
  50% { opacity: 1; }
  100% { opacity: 0.4; }
}

.keyboard {
  height: 30%;
  background: #0f0f0f;
  border-top: 1px solid rgba(34, 197, 94, 0.2);
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 0.3rem;
  padding: 0.5rem;
}

.keyboard::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(transparent 50%, rgba(255, 217, 0, 0.05) 50%);
  background-size: 100% 4px;
  pointer-events: none;
}

/* Scroll indicator */
.hero-scroll-indicator {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  color: #22c55e;
}

/* Responsive adjustments */
@media (max-width: 1024px) {
  .hero-container {
    flex-direction: column;
    text-align: center;
    gap: 3rem;
  }
  
  .hero-content {
    max-width: 100%;
  }
  
  .hero-content p {
    max-width: 100%;
    margin: 0 auto 2rem;
  }
  
  .hero-buttons {
    justify-content: center;
  }
  
  .hero-graphic {
    max-width: 90%;
    height: 400px;
  }
}

@media (max-width: 768px) {
  .header {
    flex-direction: column;
    gap: 1.5rem;
  }
  
  .header nav ul {
    gap: 1.2rem;
  }
  
  .hero-content h1 {
    font-size: 2.5rem;
  }
  
  .hero-graphic {
    height: 350px;
  }
}

@media (max-width: 480px) {
  .hero-buttons {
    flex-direction: column;
  }
  
  .hero-content h1 {
    font-size: 2rem;
  }
  
  .hero-content p {
    font-size: 1rem;
  }
  
  .hero-graphic {
    height: 300px;
  }
}
`;

// Append styles to the document
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
