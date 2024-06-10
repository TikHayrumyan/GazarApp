import { useState, useEffect } from 'react';

interface Data {
  slider: any[] | null;
  category: any[] | null;
  bestSeller: any[] | null;
  banner: any[] | null;
  salesProduct: any[] | null;
}

const useFetchData = (language: string) => {
  const [data, setData] = useState<Data>({
    slider: null,
    category: null,
    bestSeller: null,
    banner: null,
    salesProduct: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          sliderResponse,
          categoryResponse,
          bestSellerResponse,
          bannerResponse,
          salesProductResponse,
        ] = await Promise.all([
          fetch(`https://gazar.am/api/sliders?type=HOME&lan=${language}`),
          fetch(`https://gazar.am/api/category?&lan=${language}`),
          fetch(`https://gazar.am/api/products?popular=true&lan=${language}`),
          fetch(`https://gazar.am/api/sliders?type=SECOND&lan=${language}`),
          fetch(`https://gazar.am/api/products?discount=true&lan=${language}`),
        ]);

        const [slider, category, bestSeller, banner, salesProduct] = await Promise.all([
          sliderResponse.json(),
          categoryResponse.json(),
          bestSellerResponse.json(),
          bannerResponse.json(),
          salesProductResponse.json(),
        ]);

        setData({ slider, category, bestSeller, banner, salesProduct });
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [language]);

  return data;
};

export default useFetchData;
