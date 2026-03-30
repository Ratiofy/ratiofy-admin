// import { useCallback, useState, useRef } from 'react';
// import { Upload, FileText, X, Tag, Calendar, BarChart3 } from 'lucide-react';
// import { useUpload } from '../../hooks/useUpload';
// import type { UploadMetadata } from '../../types';

// interface PDFDropZoneProps {
//   onUploadSuccess?: () => void;
// }

// const PERIODS = ['Q1', 'Q2', 'Q3', 'Q4', 'FY'] as const;

// const currentYear = new Date().getFullYear();
// const YEARS = Array.from({ length: 6 }, (_, i) => String(currentYear - i));

// export default function PDFDropZone({ onUploadSuccess }: PDFDropZoneProps) {
//   const [isDragging, setIsDragging] = useState(false);
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const [metadata, setMetadata] = useState<UploadMetadata>({
//     ticker: '',
//     year: String(currentYear),
//     period: 'FY',
//   });
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const { upload, uploading, progress } = useUpload(() => {
//     setSelectedFile(null);
//     setMetadata((prev) => ({ ...prev, ticker: '' }));
//     onUploadSuccess?.();
//   });

//   // Extrae el ticker del nombre del archivo (sin extensión)
//   const extractTicker = (filename: string): string => {
//     return filename.replace(/\.pdf$/i, '').toUpperCase().trim();
//   };

//   const handleDragOver = useCallback((e: React.DragEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setIsDragging(true);
//   }, []);

//   const handleDragLeave = useCallback((e: React.DragEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setIsDragging(false);
//   }, []);

//   const handleDrop = useCallback((e: React.DragEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setIsDragging(false);

//     const files = Array.from(e.dataTransfer.files);
//     const pdfFile = files.find(f => f.type === 'application/pdf');

//     if (pdfFile) {
//       setSelectedFile(pdfFile);
//       setMetadata(prev => ({ ...prev, ticker: extractTicker(pdfFile.name) }));
//     }
//   }, []);

//   const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setSelectedFile(file);
//       setMetadata(prev => ({ ...prev, ticker: extractTicker(file.name) }));
//     }
//     // Reset input so the same file can be re-selected
//     e.target.value = '';
//   }, []);

//   const handleUpload = useCallback(async () => {
//     if (!selectedFile) return;
//     await upload(selectedFile, metadata);
//   }, [selectedFile, metadata, upload]);

//   const handleClear = useCallback(() => {
//     setSelectedFile(null);
//   }, []);

//   const isFormValid = selectedFile && metadata.ticker.trim() && metadata.year && metadata.period;

//   const formatFileSize = (bytes: number): string => {
//     if (bytes < 1024) return `${bytes} B`;
//     if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
//     return `${(bytes / 1048576).toFixed(1)} MB`;
//   };

//   return (
//     <div className="space-y-4">
//       {/* Drop Zone */}
//       <div
//         className={`dropzone ${isDragging ? 'dragging' : ''}`}
//         onDragOver={handleDragOver}
//         onDragLeave={handleDragLeave}
//         onDrop={handleDrop}
//         onClick={() => fileInputRef.current?.click()}
//       >
//         <input
//           ref={fileInputRef}
//           type="file"
//           accept=".pdf,application/pdf"
//           className="hidden"
//           onChange={handleFileSelect}
//         />

//         {uploading ? (
//           <div className="flex flex-col items-center gap-4 animate-fade-in">
//             <div className="w-16 h-16 rounded-2xl bg-success/15 flex items-center justify-center animate-pulse-glow">
//               <Upload size={28} className="text-success" />
//             </div>
//             <div className="text-center">
//               <p className="text-foreground font-semibold mb-2">Subiendo documento...</p>
//               <div className="w-64 h-2 bg-muted rounded-full overflow-hidden">
//                 <div
//                   className="h-full bg-success rounded-full transition-all duration-300 ease-out"
//                   style={{ width: `${progress}%` }}
//                 />
//               </div>
//               <p className="text-muted-foreground text-xs mt-2">{progress}%</p>
//             </div>
//           </div>
//         ) : (
//           <div className="flex flex-col items-center gap-4 animate-fade-in">
//             <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-colors duration-300 ${
//               isDragging ? 'bg-success/20' : 'bg-muted/50'
//             }`}>
//               <Upload size={28} className={isDragging ? 'text-success' : 'text-muted-foreground'} />
//             </div>
//             <div className="text-center">
//               <p className="text-foreground font-semibold mb-1">
//                 {isDragging ? 'Suelta el archivo aquí' : 'Arrastra un PDF aquí'}
//               </p>
//               <p className="text-muted-foreground text-sm">
//                 o <span className="text-success font-medium cursor-pointer hover:underline">haz clic para seleccionar</span>
//               </p>
//               <p className="text-muted-foreground/60 text-xs mt-3">
//                 Solo archivos PDF • Máx. 20MB
//               </p>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Selected File + Metadata Form */}
//       {selectedFile && !uploading && (
//         <div className="admin-card animate-fade-in space-y-5">
//           {/* File Info Row */}
//           <div className="flex items-center justify-between gap-4">
//             <div className="flex items-center gap-4">
//               <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center shrink-0">
//                 <FileText size={22} className="text-destructive" />
//               </div>
//               <div className="min-w-0">
//                 <p className="text-foreground font-medium text-sm truncate">{selectedFile.name}</p>
//                 <p className="text-muted-foreground text-xs">{formatFileSize(selectedFile.size)}</p>
//               </div>
//             </div>
//             <button
//               onClick={(e) => { e.stopPropagation(); handleClear(); }}
//               className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
//               title="Quitar archivo"
//             >
//               <X size={18} />
//             </button>
//           </div>

//           {/* Metadata Fields */}
//           <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
//             {/* Ticker */}
//             <div className="space-y-1.5">
//               <label className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
//                 <Tag size={12} />
//                 Ticker
//               </label>
//               <input
//                 type="text"
//                 placeholder="Ej: AAPL"
//                 value={metadata.ticker}
//                 onChange={(e) => setMetadata(prev => ({ ...prev, ticker: e.target.value.toUpperCase() }))}
//                 onClick={(e) => e.stopPropagation()}
//                 className="admin-input w-full"
//               />
//             </div>

//             {/* Year */}
//             <div className="space-y-1.5">
//               <label className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
//                 <Calendar size={12} />
//                 Año
//               </label>
//               <select
//                 value={metadata.year}
//                 onChange={(e) => setMetadata(prev => ({ ...prev, year: e.target.value }))}
//                 onClick={(e) => e.stopPropagation()}
//                 className="admin-input w-full"
//               >
//                 {YEARS.map(y => (
//                   <option key={y} value={y}>{y}</option>
//                 ))}
//               </select>
//             </div>

//             {/* Period */}
//             <div className="space-y-1.5">
//               <label className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
//                 <BarChart3 size={12} />
//                 Periodo
//               </label>
//               <div className="flex gap-1.5" onClick={(e) => e.stopPropagation()}>
//                 {PERIODS.map(p => (
//                   <button
//                     key={p}
//                     type="button"
//                     onClick={() => setMetadata(prev => ({ ...prev, period: p }))}
//                     className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all duration-200 ${
//                       metadata.period === p
//                         ? 'bg-success text-white shadow-lg shadow-success/25'
//                         : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
//                     }`}
//                   >
//                     {p}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* S3 Key Preview */}
//           {metadata.ticker.trim() && (
//             <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/40 border border-border/50 animate-fade-in">
//               <span className="text-muted-foreground text-xs">S3 Key:</span>
//               <code className="text-xs text-success font-mono">
//                 {metadata.ticker.trim()}/{metadata.year}/{metadata.period}.pdf
//               </code>
//             </div>
//           )}

//           {/* Upload Button */}
//           <div className="flex justify-end">
//             <button
//               onClick={(e) => { e.stopPropagation(); handleUpload(); }}
//               disabled={!isFormValid}
//               className="btn-primary flex items-center gap-2 px-6 py-2.5 disabled:opacity-40 disabled:cursor-not-allowed"
//             >
//               <Upload size={16} />
//               Subir Documento
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
