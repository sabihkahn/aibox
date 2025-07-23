import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoginRegister = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [submitting, setSubmitting] = useState(false);
  const [banner, setBanner] = useState({ type: '', message: '' });

  // Clear banner after 3 seconds
  useEffect(() => {
    if (!banner.message) return;
    const id = setTimeout(() => setBanner({ type: '', message: '' }), 3000);
    return () => clearTimeout(id);
  }, [banner]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setSubmitting(true);
    setBanner({ type: '', message: '' });

    const url = isLogin
      ? 'https://lastai-two.vercel.app/login'
      : 'https://lastai-two.vercel.app/register';

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      console.log('Response:', data);

      if (!res.ok) {
        throw new Error(data.error || 'Server Error');
      }

      // Save token and user id
      localStorage.setItem('token', data.user.token);
      localStorage.setItem('userId', data.user._id);

      setBanner({ type: 'success', message: data.message || 'Success!' });
      // Optionally clear form
      setForm({ username: '', email: '', password: '' });
setTimeout(() => {
  window.location.reload()
}, 1000);
    } catch (err) {
      console.error('Error:', err);
      setBanner({ type: 'error', message: err.message });
    } finally {
      setSubmitting(false);
    }
  };

  const canSubmit = isLogin
    ? form.email && form.password
    : form.username && form.email && form.password;

  return (
    <div className="container">
      <motion.div
        key={isLogin ? 'login' : 'register'}
        className="form-box"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -100, opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="title">{isLogin ? 'Login' : 'Register'}</h2>

        <AnimatePresence>
          {banner.message && (
            <motion.div
              className={`banner ${banner.type}`}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
            >
              {banner.message}
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleSubmit} className="form">
          {!isLogin && (
            <input
              name="username"
              type="text"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
            />
          )}
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />

          <button type="submit" disabled={!canSubmit || submitting}>
            {submitting
              ? <span className="spinner" />
              : isLogin ? 'Login' : 'Register'}
          </button>
        </form>

        <p className="toggle" onClick={() => {
          setIsLogin(!isLogin);
          setBanner({ type: '', message: '' });
        }}>
          {isLogin
            ? "Don't have an account? Register"
            : 'Already have an account? Login'}
        </p>
      </motion.div>
    </div>
  );
};

export default LoginRegister;
