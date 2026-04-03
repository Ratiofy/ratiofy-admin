import { useQuery } from '@tanstack/react-query';
import { getInstruments, getInstrumentsSummary } from '../services/instruments';

export const useInstrumentsSummary = () => {
  return useQuery({
    queryKey: ['instruments', 'summary'],
    queryFn: async () => {
      const response = await getInstrumentsSummary();
      if (!response.success) {
        throw new Error(
          response.error?.message || 'Error fetching instrument summary',
        );
      }
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
  });
};

export const useInstruments = (page = 1, size = 10) => {
  return useQuery({
    queryKey: ['instruments', page, size],
    queryFn: async () => {
      const response = await getInstruments(page, size);
      if (!response.success) {
        throw new Error(
          response.error?.message || 'Error fetching admin instruments',
        );
      }
      return response.data;
    },
    staleTime: 60 * 1000,
  });
};
