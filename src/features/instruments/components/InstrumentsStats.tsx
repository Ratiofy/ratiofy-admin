import { Archive, Ban, Cpu, LayoutList, SquareCheck } from 'lucide-react';
import type { InstrumentSummary } from '../../../types/domain';
import { SingleStatCard } from './SingleStatCard';
import { useInstrumentsSummary } from '../hooks/useInstruments';

export function InstrumentsStats() {
  const { data: instrumentStats } = useInstrumentsSummary();

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
      <SingleStatCard
        label="Activos"
        value={
          instrumentStats?.find((s: InstrumentSummary) => s.status === 'ACTIVE')
            ?.count || 0
        }
        icon={SquareCheck}
        color="text-green-500"
      />
      <SingleStatCard
        label="Procesando"
        value={
          instrumentStats?.find(
            (s: InstrumentSummary) => s.status === 'PROCESSING',
          )?.count || 0
        }
        icon={Cpu}
        color="text-blue-500"
      />
      <SingleStatCard
        label="Pendientes"
        value={
          instrumentStats?.find(
            (s: InstrumentSummary) => s.status === 'PENDING',
          )?.count || 0
        }
        icon={LayoutList}
        color="text-yellow-500"
      />
      <SingleStatCard
        label="Archivados"
        value={
          instrumentStats?.find(
            (s: InstrumentSummary) => s.status === 'ARCHIVED',
          )?.count || 0
        }
        icon={Archive}
        color="text-gray-500"
      />
      <SingleStatCard
        label="Errores"
        value={
          instrumentStats?.find((s: InstrumentSummary) => s.status === 'ERROR')
            ?.count || 0
        }
        icon={Ban}
        color="text-red-500"
      />
    </section>
  );
}
