  import { useQuery } from '@tanstack/react-query';
  import axios from 'axios';


  export const fetchProducts = async () => {
    try {
      const res = await axios.get("https://myshopbali-api-v2.vercel.app/api/products");
      if (!res.data) {
        throw new Error('Failed to fetch products');
      }
      return res.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      // Return an empty array as a fallback
      return [];
    }
  };

  export const useProducts = () => {
    return useQuery({
      queryKey: ['products'],
      queryFn: fetchProducts,
    });
  };