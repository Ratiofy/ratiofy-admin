import { useState, useCallback } from 'react';
import { uploadDocument } from '../services/api';
import type { UploadMetadata } from '../types';
import { toast } from 'sonner';

export function useUpload(onSuccess?: () => void) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const upload = useCallback(async (file: File, metadata: UploadMetadata) => {
    // Validate file type
    if (file.type !== 'application/pdf') {
      toast.error('Solo se permiten archivos PDF');
      return;
    }

    // Validate file size (max 20MB — matches backend limit)
    const maxSize = 20 * 1024 * 1024;
    if (file.size > maxSize) {
      toast.error('El archivo excede el tamaño máximo de 20MB');
      return;
    }

    // Validate metadata
    if (!metadata.ticker.trim() || !metadata.year.trim() || !metadata.period.trim()) {
      toast.error('Completa todos los campos: Ticker, Año y Periodo');
      return;
    }

    try {
      setUploading(true);
      setProgress(0);

      // Simulate progress since we don't have real upload progress with simple axios
      const progressInterval = setInterval(() => {
        setProgress((prev) => Math.min(prev + 10, 90));
      }, 200);

      const result = await uploadDocument(file, metadata);

      clearInterval(progressInterval);
      setProgress(100);

      toast.success(`Documento subido exitosamente`, {
        description: `${result.ticker} — ${result.period} ${result.year}`,
      });

      onSuccess?.();
    } catch (err: any) {
      const message = err?.response?.data?.error || err?.message || 'Error al subir el archivo';
      toast.error('Error en la carga', { description: message });
    } finally {
      setTimeout(() => {
        setUploading(false);
        setProgress(0);
      }, 500);
    }
  }, [onSuccess]);

  return { upload, uploading, progress };
}
