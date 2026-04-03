import { useState } from 'react';
import { toast } from 'sonner';
import {
  AlertCircle,
  Archive,
  CheckCircle2,
  Clock,
  Edit3,
  List,
  Loader2,
  RefreshCcw,
  Trash2,
} from 'lucide-react';
import type { Instrument } from '../../../types/domain';
import { formatDate, formatPriceParts } from '../../../utils/formatters';
import { updatePriceInstrument } from '../services/instruments';
import { useInstruments } from '../hooks/useInstruments';

export function InstrumentsTable() {
  const {
    data: instruments,
    isLoading: isLoadingTable,
    refetch,
  } = useInstruments();

  const [loadingIds, setLoadingIds] = useState<Set<string>>(new Set());

  const handleRefresh = async (instrument: Instrument) => {
    // Add to loading state
    setLoadingIds((prev) => new Set(prev).add(instrument.id));

    // Show immediate feedback
    toast.info(`Iniciando actualización para ${instrument.ticker}...`);

    try {
      await updatePriceInstrument(instrument.id);
    } catch (error) {
      toast.error(`Error al solicitar actualización para ${instrument.ticker}`);
    } finally {
      // Release button after 3 seconds
      setTimeout(() => {
        setLoadingIds((prev) => {
          const newSet = new Set(prev);
          newSet.delete(instrument.id);
          refetch();
          return newSet;
        });
      }, 3000);
    }
  };

  return (
    <section className="admin-card animate-fade-in mt-4 overflow-hidden">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-xl bg-info/10 text-info">
          <List size={20} />
        </div>
        <div>
          <h2 className="text-lg font-bold text-foreground">
            Últimos Instrumentos
          </h2>
          <p className="text-xs text-muted-foreground">
            Lista de los instrumentos financieros registrados recientemente en
            la plataforma.
          </p>
        </div>
      </div>

      <div className="overflow-x-auto -mx-6">
        <table className="data-table">
          <thead>
            <tr>
              <th>Ticker</th>
              <th>Nombre</th>
              <th>Estado</th>
              <th className="text-right">Precio</th>
              <th className="text-right">Última Actualización</th>
              <th className="text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {isLoadingTable ? (
              <tr>
                <td
                  colSpan={6}
                  className="text-center py-12 text-muted-foreground"
                >
                  <div className="flex flex-col items-center gap-2">
                    <Loader2 size={24} className="animate-spin text-success" />
                    <p>Cargando instrumentos...</p>
                  </div>
                </td>
              </tr>
            ) : !instruments ? (
              <tr>
                <td
                  colSpan={6}
                  className="text-center py-12 text-muted-foreground"
                >
                  <div className="flex flex-col items-center gap-2 opacity-50">
                    <List size={32} />
                    <p>No hay instrumentos registrados aún.</p>
                  </div>
                </td>
              </tr>
            ) : (
              instruments.map((instrument: Instrument) => (
                <tr key={instrument.id}>
                  <td className="font-bold text-foreground">
                    {instrument.ticker}
                  </td>
                  <td className="text-muted-foreground">
                    {instrument.company_name}
                  </td>
                  <td>
                    {instrument.status === 'ACTIVE' && (
                      <span className="status-badge status-completed">
                        <CheckCircle2 size={12} />
                        ACTIVO
                      </span>
                    )}
                    {instrument.status === 'PENDING' && (
                      <span className="status-badge status-pending">
                        <Clock size={12} />
                        PENDIENTE
                      </span>
                    )}
                    {instrument.status === 'PROCESSING' && (
                      <span className="status-badge status-processing">
                        <Loader2 size={12} className="animate-spin" />
                        PROCESANDO
                      </span>
                    )}
                    {instrument.status === 'ERROR' && (
                      <span className="status-badge status-failed">
                        <AlertCircle size={12} />
                        ERROR
                      </span>
                    )}
                    {instrument.status === 'ARCHIVED' && (
                      <span className="status-badge bg-muted/30 text-muted-foreground">
                        <Archive size={12} />
                        ARCHIVADO
                      </span>
                    )}
                    {![
                      'ACTIVE',
                      'PENDING',
                      'PROCESSING',
                      'ERROR',
                      'ARCHIVED',
                    ].includes(instrument.status) && (
                      <span className="status-badge bg-muted/30 text-muted-foreground">
                        {instrument.status}
                      </span>
                    )}
                  </td>
                  <td className="text-foreground text-[15px] font-medium tabular-nums text-right tracking-tight">
                    {(() => {
                      const { integer, decimal } = formatPriceParts(
                        instrument.price,
                      );
                      if (integer === '—') return '—';
                      return (
                        <span className="flex items-baseline justify-end gap-[1px]">
                          <span className="text-[13px] text-muted-foreground/70 mr-0.5">
                            $
                          </span>
                          <span>{integer}</span>
                          {decimal && (
                            <span className="text-[13px] text-muted-foreground/80">
                              {decimal}
                            </span>
                          )}
                        </span>
                      );
                    })()}
                  </td>
                  <td className="text-muted-foreground text-sm text-right">
                    {formatDate(instrument.price_updated_at)}
                  </td>
                  <td className="text-muted-foreground text-xs text-right">
                    <div className="flex items-center justify-end gap-5">
                      <button
                        className="p-1.5 hover:text-blue-400  rounded-md transition-colors cursor-pointer"
                        title="Editar"
                      >
                        <Edit3 size={16} />
                      </button>
                      <button
                        className={`p-1.5 rounded-md transition-colors ${
                          loadingIds.has(instrument.id)
                            ? 'text-muted-foreground cursor-not-allowed'
                            : 'hover:text-green-400 cursor-pointer'
                        }`}
                        title={
                          loadingIds.has(instrument.id)
                            ? 'Enviando...'
                            : 'Actualizar'
                        }
                        onClick={() => handleRefresh(instrument)}
                        disabled={loadingIds.has(instrument.id)}
                      >
                        {loadingIds.has(instrument.id) ? (
                          <Loader2 size={16} className="animate-spin" />
                        ) : (
                          <RefreshCcw size={16} />
                        )}
                      </button>
                      <button
                        className="p-1.5 hover:text-amber-400  rounded-md transition-colors cursor-pointer"
                        title="Archivar"
                      >
                        <Archive size={16} />
                      </button>
                      <button
                        className="p-1.5 hover:text-red-500  rounded-md transition-colors cursor-pointer"
                        title="Error"
                      >
                        <AlertCircle size={16} />
                      </button>
                      <button
                        className="p-1.5 hover:text-red-400  rounded-md transition-colors cursor-pointer"
                        title="Eliminar"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
