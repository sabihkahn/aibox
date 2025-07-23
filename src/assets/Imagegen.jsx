// src/components/Imagegen.jsx
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const API_BASE = 'https://lastai-two.vercel.app';

const Imagegen = () => {
  // Auth & user
  const [isAuth, setIsAuth] = useState(false);
  const [token, setToken] = useState('');
  const [userId, setUserId] = useState('');

  // Form / generation
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [imgUrl, setImgUrl] = useState('');
  const [error,  setError] = useState('');

  const canvasRef = useRef();

  // On mount, load auth state
  useEffect(() => {
    const t = localStorage.getItem('token');
    const u = localStorage.getItem('userId');
    if (t && u) {
      setToken(t);
      setUserId(u);
      setIsAuth(true);
    }
  }, []);

  // Generate image, record history
  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt');
      return;
    }
    setError('');
    setIsLoading(true);
    setImgUrl('');

    try {
      // 1) Call your backend /send
      const res = await axios.post(
        `${API_BASE}/send`,
        { prompt },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log('Full Axios response:', res);
      console.log('res.data:', res.data);

      const { imageUrl } = res.data;
      setImgUrl(imageUrl);

      // 2) Record prompt in history
      const hist = await axios.post(
        `${API_BASE}/history/${userId}`,
        { title: prompt },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log('History response:', hist.data);

    } catch (err) {
      console.error('Generation error:', err.response?.data || err.message);
      setError(err.response?.data?.error || 'Generation failed');
    } finally {
      setIsLoading(false);
    }
  };

  // Download helper
  const downloadImage = async () => {
  if (!imgUrl) return;
  try {
    // 1) fetch the image as a blob
    const response = await fetch(imgUrl, { mode: 'cors' });
    const blob = await response.blob();

    // 2) create an object URL for the blob
    const url = URL.createObjectURL(blob);

    // 3) create a temporary <a> to trigger the download
    const a = document.createElement('a');
    a.href = url;
    a.download = `ai_${Date.now()}.png`;
    document.body.appendChild(a);
    a.click();
    a.remove();

    // 4) release the object URL
    URL.revokeObjectURL(url);
  } catch (err) {
    console.error('Download error:', err);
    setError('Failed to download image');
  }
};

  return (
    <motion.div
      className="imagegen-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <motion.div
        className="generator-header"
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h1>AI Image Generator</h1>
        <p>Turn your prompt into an image and save history</p>
      </motion.div>

      {/* Form */}
      <div className="form-section">
        <motion.textarea
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          placeholder="Describe your image..."
          disabled={isLoading}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        />

        <motion.button
          onClick={handleGenerate}
          disabled={isLoading || !prompt.trim()}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="generate-btn"
        >
          {isLoading ? 'Generating…' : 'Generate Image'}
        </motion.button>

        {error && (
          <motion.div
            className="error-text"
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            {error}
          </motion.div>
        )}
      </div>

      {/* Result */}
      <div className="result-section">
        <AnimatePresence>
          {imgUrl && (
            <motion.div
              className="image-preview"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
            >
              <img src={imgUrl} alt="Generated" />
           
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Hidden canvas in case you later need it */}
      <canvas ref={canvasRef} width="512" height="512" style={{ display: 'none' }} />
    </motion.div>
  );
}

export default Imagegen;