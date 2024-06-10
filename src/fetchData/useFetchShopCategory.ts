import { useState, useEffect } from 'react';

const useFetchCategory = (language: string) => {
  const [dataCategory, setDataCategory] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const getCategory = async () => {
    try {
      const response = await fetch(
        `https://gazar.am/api/category?lan=${language}`
      );
      const res = await response.json();
      if (res) {
        setDataCategory(res);
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategory();
  }, [language]);

  return { dataCategory, loading };
};

export default useFetchCategory;
