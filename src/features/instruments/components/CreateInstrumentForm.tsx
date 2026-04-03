import { useState } from 'react';
import { Plus, Tag, Building2, Save } from 'lucide-react';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';
import { createInstrument } from '../services/instruments';

export function CreateInstrumentForm({
  onSuccess,
}: {
  onSuccess?: () => void;
}) {
  const [ticker, setTicker] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const queryClient = useQueryClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticker.trim() || !name.trim()) {
      toast.error('Por favor completa todos los campos.');
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await createInstrument({
        ticker: ticker.trim().toUpperCase(),
        company_name: name.trim(),
      });

      if (response.success) {
        toast.success(`Instrumento ${ticker.toUpperCase()} creado con éxito`);
        setTicker('');
        setName('');

        // Refresh all instrument-related queries (Stats and Table)
        queryClient.invalidateQueries({ queryKey: ['instruments'] });

        if (onSuccess) onSuccess();
      } else {
        toast.error(response.error?.message || 'Error al crear el instrumento');
      }
    } catch (error: any) {
      toast.error(error.message || 'Ocurrió un error inesperado al crear');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="mt-4">
      <div className="admin-card animate-fade-in">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-xl bg-success/10 text-success">
            <Plus size={20} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-foreground">
              Crear Instrumento
            </h2>
            <p className="text-xs text-muted-foreground">
              Añade un nuevo instrumento financiero al sistema. Quedará en
              estado pendiente.
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col md:flex-row items-end gap-4"
        >
          <div className="space-y-1.5 w-full md:w-1/4">
            <label className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              <Tag size={12} />
              Ticker
            </label>
            <input
              type="text"
              placeholder="Ej: ANDINA-B"
              value={ticker}
              onChange={(e) => setTicker(e.target.value.toUpperCase())}
              disabled={isSubmitting}
              className="admin-input w-full"
              required
            />
          </div>

          <div className="space-y-1.5 w-full md:flex-1">
            <label className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              <Building2 size={12} />
              Nombre de la Empresa
            </label>
            <input
              type="text"
              placeholder="Ej: EMBOTELLADORA ANDINA S.A. SERIE B"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isSubmitting}
              className="admin-input w-full"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting || !ticker.trim() || !name.trim()}
            className="btn-primary flex items-center justify-center gap-2 w-full md:w-auto px-6 py-2.5 h-[42px] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
            ) : (
              <Save size={16} />
            )}
            {isSubmitting ? 'Guardando...' : 'Guardar'}
          </button>
        </form>
      </div>
    </section>
  );
}
