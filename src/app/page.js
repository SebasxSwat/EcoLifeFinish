'use client';

import React, { useState, useEffect } from 'react';
import { fetchData } from '@/components/lib/api';

export default function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData('/api/some-endpoint')
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error in component:', error);
        setError(error.message || 'An unknown error occurred');
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Bienvenido a EcoLife</h1>
      <div>
        <h2 className="text-xl font-semibold mb-2">Datos del Usuario:</h2>
        {data && data.user ? (
          <pre className="bg-gray-100 p-4 rounded">{JSON.stringify(data.user, null, 2)}</pre>
        ) : (
          <p>No se encontraron datos del usuario.</p>
        )}
      </div>
    </main>
  );
}