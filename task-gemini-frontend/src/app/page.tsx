'use client';

import { useState } from 'react';

export default function Home() {
  const [topic, setTopic] = useState('');
  const [tasks, setTasks] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (!topic.trim()) return;

    setLoading(true);
    setError('');
    setTasks([]);

    try {
      const response = await fetch('http://localhost:3001/generate-tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic }),
      });

      const data = await response.json();

      if (data.tasks && Array.isArray(data.tasks)) {
        setTasks(data.tasks);
      } else {
        setError('Failed to generate tasks. Invalid response.');
      }
    } catch (err) {
      setError('Failed to generate tasks. Check if backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Task Gemini</h1>

      <input
        type="text"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder="Enter a topic (e.g., React, AI)"
        className="border rounded p-2 w-full max-w-md mb-4"
      />

      <button
        onClick={handleGenerate}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {loading ? 'Generating...' : 'Generate Tasks'}
      </button>

      {error && <p className="text-red-600 mt-4">{error}</p>}

      {tasks.length > 0 && (
        <ul className="mt-6 list-disc pl-6 text-left max-w-md w-full bg-white p-4 rounded shadow">
          {tasks.map((task, i) => (
            <li key={i}>{task}</li>
          ))}
        </ul>
      )}
    </main>
  );
}
