import { FileText, Upload, Activity } from 'lucide-react';
import AdminLayout from '../components/layout/AdminLayout';
import PDFDropZone from '../components/documents/PDFDropZone';
import DocumentTable from '../components/documents/DocumentTable';
import { useDocuments } from '../hooks/useDocuments';

export default function DocumentIngestion() {
  const { documents, loading, error, refetch } = useDocuments();

  const stats = {
    total: documents.length,
    completed: documents.filter(d => d.status === 'completed').length,
    processing: documents.filter(d => d.status === 'processing').length,
    pending: documents.filter(d => d.status === 'pending').length,
  };

  return (
    <AdminLayout>
      <div className="animate-fade-in">
        {/* Header */}
        <header className="flex flex-col xl:flex-row justify-between xl:items-end gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-bold text-foreground tracking-tight mb-2">
              Gestión de Documentos
            </h1>
            <p className="text-muted-foreground font-medium">
              Carga y gestiona los informes financieros en PDF para su extracción y análisis.
            </p>
          </div>
        </header>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <StatsCard
            label="Total Documentos"
            value={stats.total}
            icon={FileText}
            color="text-foreground"
          />
          <StatsCard
            label="Pendientes"
            value="Próximamente"
            icon={Upload}
            color="text-warning"
          />
          <StatsCard
            label="En Proceso"
            value="Próximamente"
            icon={Activity}
            color="text-info"
          />
          <StatsCard
            label="Extracciones Completas"
            value="Próximamente"
            icon={Activity}
            color="text-success"
          />
        </div>

        {/* Upload Section */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-xl bg-success/10 text-success">
              <Upload size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-foreground">Cargar Documento</h2>
              <p className="text-xs text-muted-foreground">
                El archivo se envía al backend para persistencia en S3.
              </p>
            </div>
          </div>
          <PDFDropZone onUploadSuccess={refetch} />
        </section>

        {/* Documents Table */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-xl bg-muted text-muted-foreground">
              <FileText size={20} />
            </div>
            <h2 className="text-lg font-bold text-foreground">Tracking de Documentos</h2>
          </div>
          <DocumentTable
            documents={documents}
            loading={loading}
            error={error}
            onRefresh={refetch}
          />
        </section>
      </div>
    </AdminLayout>
  );
}

// Internal mini stat card
function StatsCard({
  label,
  value,
  icon: Icon,
  color,
}: {
  label: string;
  value: number | string;
  icon: typeof FileText;
  color: string;
}) {
  return (
    <div className="admin-card flex items-center gap-4 py-4 px-5">
      <div className={`p-2.5 rounded-xl bg-card border border-border ${color}`}>
        <Icon size={18} />
      </div>
      <div>
        <p className="text-muted-foreground text-xs font-medium uppercase tracking-wider">{label}</p>
        <p className={`${value === 'Próximamente' ? 'text-sm' : 'text-2xl'} font-bold tracking-tight ${color}`}>{value}</p>
      </div>
    </div>
  );
}
