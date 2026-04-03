import { SquareChartGantt } from 'lucide-react';
import { BaseCard } from '../../../components/ui/BaseCard';
import { useInstrumentsSummary } from '../../instruments/hooks/useInstruments';
import {
  InstrumentStatus,
  type InstrumentSummary,
} from '../../../types/domain';

export function InstrumentsCard() {
  const { data: instrumentStats } = useInstrumentsSummary();

  return (
    <BaseCard title="Instrumentos" icon={SquareChartGantt} statsDecorate={true}>
      <div>
        <div className="mt-4 pt-4 border-t border-border/50 space-y-2">
          <div className="flex justify-between text-[12px] font-bold uppercase tracking-wider">
            <span className="text-success">Activos</span>
            <span className="text-foreground">
              {instrumentStats?.find(
                (s: InstrumentSummary) => s.status === InstrumentStatus.ACTIVE,
              )?.count || 0}
            </span>
          </div>
          <div className="flex justify-between text-[12px] font-bold uppercase tracking-wider">
            <span className="text-info">Procesando</span>
            <span className="text-foreground">
              {instrumentStats?.find(
                (s: InstrumentSummary) =>
                  s.status === InstrumentStatus.PROCESSING,
              )?.count || 0}
            </span>
          </div>
          <div className="flex justify-between text-[12px] font-bold uppercase tracking-wider">
            <span className="text-warning">Pendientes</span>
            <span className="text-foreground">
              {instrumentStats?.find(
                (s: InstrumentSummary) => s.status === InstrumentStatus.PENDING,
              )?.count || 0}
            </span>
          </div>
          <div className="flex justify-between text-[12px] font-bold uppercase tracking-wider">
            <span className="text-muted-foreground">Archivados</span>
            <span className="text-foreground">
              {instrumentStats?.find(
                (s: InstrumentSummary) =>
                  s.status === InstrumentStatus.ARCHIVED,
              )?.count || 0}
            </span>
          </div>
          {(instrumentStats?.find(
            (s: InstrumentSummary) => s.status === InstrumentStatus.ERROR,
          )?.count ?? 0) > 0 && (
            <div className="flex justify-between text-[12px] font-bold uppercase tracking-wider">
              <span className="text-destructive">Errores</span>
              <span className="text-foreground">
                {instrumentStats?.find(
                  (s: InstrumentSummary) => s.status === InstrumentStatus.ERROR,
                )?.count || 0}
              </span>
            </div>
          )}
        </div>
      </div>
    </BaseCard>
  );
}
