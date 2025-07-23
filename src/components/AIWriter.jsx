import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const AIWriter = ({ showToast }) => {
  const [token, setToken] = useState('');
  const [userId, setUserId] = useState('');
  const [prompt, setPrompt] = useState('');
  const [output, setOutput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [wordCount, setWordCount] = useState(0);

  // Replace with your actual API key
  const GEMINI_API_KEY = 'AIzaSyDkl-ltb7fD5WcHh4PUv19qOKlJY5ClAck';

  useEffect(() => {
    const t = localStorage.getItem('token');
    const u = localStorage.getItem('userId');
    if (t && u) {
      setToken(t);
      setUserId(u);
    }
  }, []);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      showToast('Please enter a prompt', 'error');
      return;
    }

    setIsGenerating(true);
    setOutput('');

    try {
      const payload = {
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 1024
        }
      };

      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );

      // Save history
      await axios.post(`https://lastai-two.vercel.app/history/${userId}`, {
        title: prompt
      });

      // Extract the generated text from the response
      const generatedText = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || '';

      setOutput(generatedText);
      setWordCount(generatedText.split(/\s+/).length);
      showToast('Content generated successfully!', 'success');
    } catch (error) {
      console.error('Error generating content:', error);
      showToast('Failed to generate content', 'error');
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    showToast('Copied to clipboard!', 'success');
  };

  return token ? (
    <div className="ai-writer">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        AI Content Generator
      </motion.h2>

      <div className="writer-container">
        <div className="input-section">
          <div className="floating-label-group">
            <textarea
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              disabled={isGenerating}
              placeholder=" "
            />
            <label htmlFor="prompt">What would you like to create?</label>
          </div>

          <div className="controls">
            <motion.button
              className={`generate-button ${isGenerating ? 'loading' : ''}`}
              onClick={handleGenerate}
              disabled={isGenerating}
              whileHover={{
                scale: isGenerating ? 1 : 1.05,
                boxShadow: "0 0 15px rgba(46, 213, 115, 0.5)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              {isGenerating ? (
                <>
                  <span className="spinner"></span>
                  Generating...
                </>
              ) : (
                'Generate Content'
              )}
            </motion.button>

            {output && <div className="word-count">Words: {wordCount}</div>}
          </div>
        </div>

        <div className="output-section">
          <div className="output-header">
            <h3>Generated Content</h3>
            {output && (
              <motion.button
                className="copy-button"
                onClick={copyToClipboard}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V18C2 18.5304 2.21071 19.0391 2.58579 19.4142C2.96086 19.7893 3.46957 20 4 20H16C16.5304 20 17.0391 19.7893 17.4142 19.4142C17.7893 19.0391 18 18.5304 18 18V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M8 14H6C5.46957 14 4.96086 13.7893 4.58579 13.4142C4.21071 13.0391 4 12.5304 4 12V6C4 5.46957 4.21071 4.96086 4.58579 4.58579C4.96086 4.21071 5.46957 4 6 4H16C16.5304 4 17.0391 4.21071 17.4142 4.58579C17.7893 4.96086 18 5.46957 18 6V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M10 10H20V20H10V10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Copy
              </motion.button>
            )}
          </div>

          <div className="output-content">
            {isGenerating && !output ? (
              <div className="skeleton-loader">
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="skeleton-line"
                    initial={{ opacity: 0.5 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      repeat: Infinity,
                      repeatType: "reverse",
                      duration: 1.5,
                      delay: i * 0.1
                    }}
                  />
                ))}
              </div>
            ) : output ? (
              <div className="generated-text">{output}</div>
            ) : (
              <div className="empty-state">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M8 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M12 8V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <p>Your generated content will appear here</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="ai-writer">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Please log in to use the AI Writer
      </motion.h2>
    </div>
  );
};

export default AIWriter;