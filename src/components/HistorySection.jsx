import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HistorySection = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (!userId) {
      setError('User not authenticated');
      setLoading(false);
      return;
    }

    const fetchHistory = async () => {
      try {
        const response = await axios.get(`https://lastai-two.vercel.app/history/${userId}`);
        console.log('History response:', response);
        // Ensure history is an array
        const historyData = response.data?.history.history;
        if (Array.isArray(historyData)) {
          setHistory(historyData);
        } else {
          setHistory([]);
          setError('History data is not in expected format');
        }
        
        setError(null);
      } catch (err) {
        setError('Failed to fetch history');
        console.error('Error fetching history:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [userId]);

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">
          History <span className="text-sm text-cyan-300">({history.length} items)</span>
        </h1>

        {error && <p className="text-red-400 mb-4">{error}</p>}

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
          </div>
        ) : history.length === 0 ? (
          <p className="text-slate-400 italic">No history found.</p>
        ) : (
          <ul className="space-y-4">
            {history.map((text, index) => (
              <li
                key={index}
                className="bg-slate-800 p-4 rounded-lg border border-slate-700 hover:border-cyan-500 transition"
              >
                <p className="text-cyan-200 break-words">{text}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default HistorySection;