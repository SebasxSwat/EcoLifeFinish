"use client";

import React, { useEffect, useState } from 'react';
import { fetchData } from '@/components/lib/api';
import Registro from '@/pages/user-registration';

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
      <Registro/>
    </div>
  );
}

export default Page;
