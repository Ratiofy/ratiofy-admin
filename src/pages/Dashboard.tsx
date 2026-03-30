import { FileText, Users, Server } from 'lucide-react';
import { Link } from 'react-router-dom';
import AdminLayout from '../components/layout/AdminLayout';
import { InstrumentsCard } from '../components/dashboard/InstrumentsCard';
import { PendingCard } from '../components/dashboard/PendingCard';
import { PageHeader } from '../components/common/PageHeader';

export default function Dashboard() {
  return (
    <AdminLayout>
      <div className="animate-fade-in">
        <PageHeader
          title="Dashboard"
          description="Vista general del centro de control de Ratiofy."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-10">
          <InstrumentsCard />
          <PendingCard title="Usuarios" />
          <PendingCard title="Documentos" />
        </div>

        <section className="mb-10">
          <h2 className="text-xl font-bold text-foreground mb-6">Acciones Rápidas</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <QuickAction
              title="Subir Documento"
              description="Subir un nuevo PDF para extracción y análisis"
              icon={FileText}
              to="/documents"
              disabled
            />
            <QuickAction
              title="Ver Usuarios"
              description="Gestionar usuarios y permisos de la plataforma"
              icon={Users}
              to="#"
              disabled
            />
            <QuickAction
              title="Monitorear API"
              description="Estado del backend y métricas de rendimiento"
              icon={Server}
              to="#"
              disabled
            />
          </div>
        </section>

        {/* System Status */}
        <section>
          <h2 className="text-xl font-bold text-foreground mb-6">Estado del Sistema</h2>
          <div className="admin-card">
            <div className="flex flex-wrap items-center gap-6 text-[11px] uppercase font-bold tracking-wider text-muted-foreground">
              <span className="text-foreground">Servicios:</span>
              <StatusDot label="ratiofy-api-go" status="pending" />
              <StatusDot label="Clerk Auth" status="pending" />
              <StatusDot label="S3 Storage" status="pending" />
              <StatusDot label="Neon PostgreSQL" status="pending" />
            </div>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}

function QuickAction({
  title,
  description,
  icon: Icon,
  to,
  disabled,
}: {
  title: string;
  description: string;
  icon: typeof FileText;
  to: string;
  disabled?: boolean;
}) {
  if (disabled) {
    return (
      <div className="admin-card group opacity-50 pointer-events-none">
        <div className="flex items-center gap-4 mb-3">
          <div className="p-2.5 rounded-xl bg-success/10 text-success">
            <Icon size={20} />
          </div>
          <h3 className="text-foreground font-semibold">{title}</h3>
        </div>
        <p className="text-muted-foreground text-sm">{description}</p>
        <span className="inline-block mt-3 text-[10px] uppercase tracking-wider font-bold text-muted-foreground bg-muted px-2 py-0.5 rounded">
          Próximamente
        </span>
      </div>
    );
  }

  return (
    <Link
      to={to}
      className="admin-card group cursor-pointer hover:border-success/30"
    >
      <div className="flex items-center gap-4 mb-3">
        <div className="p-2.5 rounded-xl bg-success/10 text-success group-hover:bg-success/20 transition-colors">
          <Icon size={20} />
        </div>
        <h3 className="text-foreground font-semibold">{title}</h3>
      </div>
      <p className="text-muted-foreground text-sm">{description}</p>
    </Link>
  );
}

function StatusDot({ label, status }: { label: string; status: 'healthy' | 'warning' | 'error' | 'pending' }) {
  const colors = {
    healthy: 'bg-success',
    warning: 'bg-warning',
    error: 'bg-destructive',
    pending: 'bg-muted-foreground/30',
  };
  return (
    <div className="flex items-center gap-2">
      <span className={`w-1.5 h-1.5 rounded-full ${colors[status]}`} />
      <span className={status === 'pending' ? 'opacity-60' : ''}>{label}</span>
      {status === 'pending' && (
        <span className="text-[9px] bg-muted px-1.5 py-0.5 rounded text-muted-foreground">PRE</span>
      )}
    </div>
  );
}
