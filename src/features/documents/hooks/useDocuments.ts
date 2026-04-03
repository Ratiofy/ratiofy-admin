// import { useState, useEffect, useCallback } from 'react';
// import { getDocuments } from '../services/api';
// import type { Document } from '../types';

// export function useDocuments() {
//   const [documents, setDocuments] = useState<Document[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const fetchDocuments = useCallback(async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const response = await getDocuments();

//       // Robust handling: check if response is an array or if it's wrapped in { documents: [] }
//       const rawDocuments = Array.isArray(response) ? response : (response.documents ?? []);

//       // Map backend fields to frontend interface if they differ
//       const mappedDocs = rawDocuments.map((doc: any) => ({
//         ...doc,
//         id: String(doc.id),
//         // Ensure status mapping (e.g. PENDING_COMPRESSION -> pending)
//         status: (doc.status?.toLowerCase().includes('pending') ? 'pending' :
//                  doc.status?.toLowerCase().includes('process') ? 'processing' :
//                  doc.status?.toLowerCase().includes('fail') ? 'failed' :
//                  doc.status?.toLowerCase().includes('complete') ? 'completed' :
//                  (doc.status || 'pending')) as any,
//         // Fallback for missing fields
//         original_name: doc.original_name || doc.filename || `${doc.ticker}_${doc.year}_${doc.quarter}.pdf`,
//         uploaded_at: doc.uploaded_at || new Date().toISOString(),
//         size_bytes: doc.size_bytes || 0,
//       }));

//       setDocuments(mappedDocs);
//     } catch (err: any) {
//       const message = err?.response?.data?.message || err?.message || 'Error al cargar documentos';
//       setError(message);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchDocuments();
//   }, [fetchDocuments]);

//   return { documents, loading, error, refetch: fetchDocuments };
// }
