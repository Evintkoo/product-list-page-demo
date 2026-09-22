import { useEffect, useState } from 'react';

export const useSalesData = (id) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // GET /sales/:id
    fetch(`/sales/${id}`)
      .then(res => res.json())
      .then(json => {
        setData(json);
        setLoading(false);
      });
  }, [id]);

  return { data, loading };
};