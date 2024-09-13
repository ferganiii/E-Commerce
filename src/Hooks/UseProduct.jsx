import axios from 'axios';
import { useQuery } from 'react-query';

export default function UseProduct() {
  const { data, isLoading, error } = useQuery(
    ['products'],
    () => axios.get('https://ecommerce.routemisr.com/api/v1/products').then(res => res.data),
    {
      select: (data) => data.data, 
    }
  );

  return { data, isLoading, error };
}
