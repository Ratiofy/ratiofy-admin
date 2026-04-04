// import { useState, useCallback } from 'react';
// import {
//   FileText,
//   ExternalLink,
//   Clock,
//   CheckCircle2,
//   AlertCircle,
//   Loader2,
//   RefreshCw,
//   Trash2,
// } from 'lucide-react';
// import type { Document, ExtractionStatus } from '../../types';
// import { getDocumentPresignedUrl, deleteDocument } from '../../services/api';
// import { toast } from 'sonner';

// interface DocumentTableProps {
//   documents: Document[];
//   loading: boolean;
//   error: string | null;
//   onRefresh: () => void;
// }

// const statusConfig: Record<ExtractionStatus, {
//   label: string;
//   class: string;
//   icon: typeof Clock;
// }> = {
//   pending: { label: 'Pendiente', class: 'status-pending', icon: Clock },
//   processing: { label: 'Procesando', class: 'status-processing', icon: Loader2 },
//   completed: { label: 'Completado', class: 'status-completed', icon: CheckCircle2 },
//   failed: { label: 'Fallido', class: 'status-failed', icon: AlertCircle },
// };

// export default function DocumentTable({ documents, loading, error, onRefresh }: DocumentTableProps) {
//   const [deletingId, setDeletingId] = useState<string | null>(null);

//   const handleView = useCallback(async (doc: Document) => {
//     try {
//       const url = await getDocumentPresignedUrl(doc.id);
//       window.open(url, '_blank');
//     } catch {
//       toast.error('Error al obtener URL del documento');
//     }
//   }, []);

//   const handleDelete = useCallback(async (doc: Document) => {
//     if (!confirm(`¿Eliminar "${doc.original_name}"?`)) return;
//     try {
//       setDeletingId(doc.id);
//       await deleteDocument(doc.id);
//       toast.success('Documento eliminado');
//       onRefresh();
//     } catch {
//       toast.error('Error al eliminar el documento');
//     } finally {
//       setDeletingId(null);
//     }
//   }, [onRefresh]);

//   const formatDate = (dateStr: string): string => {
//     return new Date(dateStr).toLocaleDateString('es-CL', {
//       day: '2-digit',
//       month: 'short',
//       year: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit',
//     });
//   };

//   const formatSize = (bytes: number): string => {
//     if (bytes < 1024) return `${bytes} B`;
//     if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
//     return `${(bytes / 1048576).toFixed(1)} MB`;
//   };

//   if (loading) {
//     return (
//       <div className="admin-card flex items-center justify-center py-20">
//         <div className="flex flex-col items-center gap-4 animate-fade-in">
//           <div className="w-10 h-10 border-2 border-success border-t-transparent rounded-full animate-spin" />
//           <p className="text-muted-foreground text-sm font-medium">Cargando documentos...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="admin-card flex flex-col items-center justify-center py-20 gap-4 animate-fade-in">
//         <div className="w-14 h-14 rounded-2xl bg-destructive/15 flex items-center justify-center">
//           <AlertCircle size={26} className="text-destructive" />
//         </div>
//         <div className="text-center">
//           <p className="text-foreground font-semibold mb-1">Error al cargar</p>
//           <p className="text-muted-foreground text-sm">{error}</p>
//         </div>
//         <button
//           onClick={onRefresh}
//           className="btn-secondary flex items-center gap-2 px-4 py-2"
//         >
//           <RefreshCw size={14} />
//           Reintentar
//         </button>
//       </div>
//     );
//   }

//   if (documents.length === 0) {
//     return (
//       <div className="admin-card flex flex-col items-center justify-center py-20 gap-4 animate-fade-in">
//         <div className="w-14 h-14 rounded-2xl bg-muted/50 flex items-center justify-center">
//           <FileText size={26} className="text-muted-foreground" />
//         </div>
//         <div className="text-center">
//           <p className="text-foreground font-semibold mb-1">Sin documentos</p>
//           <p className="text-muted-foreground text-sm">Sube un archivo PDF para comenzar.</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="admin-card p-0 overflow-hidden">
//       {/* Table Header Bar */}
//       <div className="flex items-center justify-between px-6 py-4 border-b border-border">
//         <div className="flex items-center gap-3">
//           <h3 className="text-sm font-semibold text-foreground">Documentos</h3>
//           <span className="text-xs text-muted-foreground bg-muted px-2.5 py-0.5 rounded-full font-medium">
//             {documents.length}
//           </span>
//         </div>
//         <button
//           onClick={onRefresh}
//           className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
//           title="Actualizar"
//         >
//           <RefreshCw size={16} />
//         </button>
//       </div>

//       {/* Table */}
//       <div className="overflow-x-auto">
//         <table className="data-table">
//           <thead>
//             <tr>
//               <th>Archivo</th>
//               <th>Tamaño</th>
//               <th>Fecha de Carga</th>
//               <th>Estado de Extracción</th>
//               <th className="text-right">Acciones</th>
//             </tr>
//           </thead>
//           <tbody>
//             {documents.map((doc, idx) => {
//               const status = statusConfig[doc.status as ExtractionStatus] || statusConfig.pending;
//               const StatusIcon = status.icon;

//               return (
//                 <tr
//                   key={doc.id}
//                   className="animate-fade-in"
//                   style={{ animationDelay: `${idx * 50}ms` }}
//                 >
//                   <td>
//                     <div className="flex items-center gap-3">
//                       <div className="w-9 h-9 rounded-lg bg-destructive/10 flex items-center justify-center shrink-0">
//                         <FileText size={16} className="text-destructive" />
//                       </div>
//                       <span className="font-medium truncate max-w-[240px]" title={doc.original_name}>
//                         {doc.original_name}
//                       </span>
//                     </div>
//                   </td>
//                   <td>
//                     <span className="text-muted-foreground text-xs font-medium">
//                       {formatSize(doc.size_bytes)}
//                     </span>
//                   </td>
//                   <td>
//                     <span className="text-muted-foreground text-xs">
//                       {formatDate(doc.uploaded_at)}
//                     </span>
//                   </td>
//                   <td>
//                     <span className={`status-badge ${status.class}`}>
//                       <StatusIcon
//                         size={12}
//                         className={doc.status === 'processing' ? 'animate-spin' : ''}
//                       />
//                       {status.label}
//                     </span>
//                   </td>
//                   <td>
//                     <div className="flex items-center justify-end gap-1">
//                       <button
//                         onClick={() => handleView(doc)}
//                         className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-success"
//                         title="Ver documento"
//                       >
//                         <ExternalLink size={16} />
//                       </button>
//                       <button
//                         onClick={() => handleDelete(doc)}
//                         disabled={deletingId === doc.id}
//                         className="p-2 rounded-lg hover:bg-destructive/10 transition-colors text-muted-foreground hover:text-destructive disabled:opacity-50"
//                         title="Eliminar documento"
//                       >
//                         {deletingId === doc.id ? (
//                           <Loader2 size={16} className="animate-spin" />
//                         ) : (
//                           <Trash2 size={16} />
//                         )}
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }
