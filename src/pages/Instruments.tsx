import AdminLayout from '../components/layout/AdminLayout';
import { PageHeader } from '../components/layout/PageHeader';
import { CreateInstrumentForm } from '../features/instruments/components/CreateInstrumentForm';
import { InstrumentsTable } from '../features/instruments/components/InstrumentsTable';
import { InstrumentsStats } from '../features/instruments/components/InstrumentsStats';

export default function Instruments() {
  return (
    <AdminLayout>
      <PageHeader
        title="Instrumentos"
        description="Gestiona los instrumentos de la plataforma Ratiofy."
      />
      <InstrumentsStats />
      <CreateInstrumentForm />
      <InstrumentsTable />
    </AdminLayout>
  );
}
