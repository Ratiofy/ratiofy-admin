import { useQuery } from '@tanstack/react-query';
import { getInstrumentSummary } from '../services/api';

export interface InstrumentSummary {
    ACTIVE: number;
    PENDING: number;
    PROCESSING: number;
    ARCHIVED: number;
    ERROR: number;
}

export const useInstrumentsSummary = () => {
    return useQuery({
        queryKey: ['instruments', 'summary'],
        queryFn: async () => {
            const response = await getInstrumentSummary();
            if (!response.success) {
                throw new Error(response.error?.message || 'Error fetching instrument summary');
            }
            return response.data;
        },
        staleTime: 5 * 60 * 1000,
    });
};