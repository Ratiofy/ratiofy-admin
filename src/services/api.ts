import axios from 'axios';
import type { InstrumentSummaryResponse } from '../types';

const API_BASE_URL = import.meta.env.VITE_ADMIN_API_BASE_URL || 'http://localhost:8080/api';

// Create Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000, // 60s timeout for file uploads
});

// Clerk token interceptor — token getter is injected at runtime
let getTokenFn: (() => Promise<string | null>) | null = null;

export function setTokenGetter(fn: () => Promise<string | null>) {
  getTokenFn = fn;
}

api.interceptors.request.use(async (config) => {
  if (getTokenFn) {
    const token = await getTokenFn();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// --- Document API ---

// export async function uploadDocument(file: File, metadata: UploadMetadata): Promise<UploadResponse> {
//   const formData = new FormData();
//   formData.append('file', file);
//   formData.append('ticker', metadata.ticker);
//   formData.append('year', metadata.year);
//   formData.append('period', metadata.period);

//   const { data } = await api.post<UploadResponse>('/admin/documents', formData, {
//     headers: { 'Content-Type': 'multipart/form-data' },
//   });
//   return data;
// }

// export async function getDocuments(): Promise<DocumentsResponse> {
//   const { data } = await api.get<DocumentsResponse>('/admin/documents');
//   return data;
// }

// export async function getDocumentPresignedUrl(documentId: string): Promise<string> {
//   const { data } = await api.get<{ url: string }>(`/admin/documents/${documentId}/url`);
//   return data.url;
// }

// export async function deleteDocument(documentId: string): Promise<void> {
//   await api.delete(`/admin/documents/${documentId}`);
// }

// --- Instruments API ---

export async function getInstrumentSummary(): Promise<InstrumentSummaryResponse> {
  const { data } = await api.get<InstrumentSummaryResponse>('/instruments/stats/summary');
  return data;
}

export { api };
export type { InstrumentSummaryResponse };
