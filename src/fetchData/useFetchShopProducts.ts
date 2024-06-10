import { useState, useEffect } from 'react';

const useFetchProducts = (language: string, categoryId: number) => {
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const getProductData = async () => {
    try {
      const response = await fetch(
        `https://gazar.am/api/products?category=${categoryId}&lan=${language}`
      );
      const res = await response.json();
      if (res) {
        setAllProducts(res.map((item: any) => ({ ...item, quantity: 1 })));
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getProductData();
  }, [categoryId, language]);

  return { allProducts, setAllProducts, loading };
};

export default useFetchProducts;
