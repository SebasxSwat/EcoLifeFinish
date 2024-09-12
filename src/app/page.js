"use client";

import React, { useEffect, useState } from 'react';
import { fetchData } from '@/components/lib/api';
import { Login } from '@/pages/login';

function Page() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData('/api/some-endpoint')
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!data) return <div>No data available</div>;

  return (
    <div>
      <Login/>
    </div>
  );
}

export default Page;
