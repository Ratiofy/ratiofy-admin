import { Activity, FileText, Users, Server } from 'lucide-react';
import AdminLayout from '../components/layout/AdminLayout';

const metrics = [
  { title: 'Documentos Totales', value: 'Próximamente', change: 'Sincroniza con API', icon: FileText },
  { title: 'Usuarios Registrados', value: 'Próximamente', change: 'Vía Clerk', icon: Users },
  { title: 'Extracciones Exitosas', value: 'Próximamente', change: 'Pipeline RAG', icon: Activity },
  { title: 'Estado API', value: 'Próximamente', change: 'ratiofy-api-go', icon: Server },
];

export default function Dashboard() {
  return (
    <AdminLayout>
      <div className="animate-fade-in">
        {/* Header */}
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-foreground tracking-tight mb-2">Dashboard</h1>
          <p className="text-muted-foreground font-medium">
            Vista general del centro de control de Ratiofy.
          </p>
        </header>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
          {metrics.map((metric) => (
            <MetricCard key={metric.title} {...metric} />
          ))}
        </div>

        {/* Quick Actions */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-foreground mb-6">Acciones Rápidas</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <QuickAction
              title="Subir Documento"
              description="Subir un nuevo PDF para extracción y análisis"
              icon={FileText}
              href="/documents"
            />
            <QuickAction
              title="Ver Usuarios"
              description="Gestionar usuarios y permisos de la plataforma"
              icon={Users}
              href="#"
              disabled
            />
            <QuickAction
              title="Monitorear API"
              description="Estado del backend y métricas de rendimiento"
              icon={Server}
              href="#"
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

function MetricCard({ title, value, change, icon: Icon }: any) {
  return (
    <div className="metric-card group">
      <div className="flex justify-between items-start mb-4">
        <div className="p-2.5 rounded-xl bg-card border border-border text-muted-foreground group-hover:text-success group-hover:border-success/30 transition-colors">
          <Icon size={22} />
        </div>
      </div>
      <div>
        <h4 className="text-muted-foreground font-medium mb-1">{title}</h4>
        <p className={`font-bold tracking-tight text-foreground ${value === 'Próximamente' ? 'text-lg opacity-80' : 'text-3xl'}`}>
          {value}
        </p>
        <p className="text-xs text-muted-foreground mt-1">{change}</p>
      </div>
    </div>
  );
}

function QuickAction({
  title,
  description,
  icon: Icon,
  href,
  disabled,
}: {
  title: string;
  description: string;
  icon: typeof FileText;
  href: string;
  disabled?: boolean;
}) {
  return (
    <a
      href={disabled ? undefined : href}
      className={`admin-card group cursor-pointer hover:border-success/30 ${disabled ? 'opacity-50 pointer-events-none' : ''}`}
    >
      <div className="flex items-center gap-4 mb-3">
        <div className="p-2.5 rounded-xl bg-success/10 text-success group-hover:bg-success/20 transition-colors">
          <Icon size={20} />
        </div>
        <h3 className="text-foreground font-semibold">{title}</h3>
      </div>
      <p className="text-muted-foreground text-sm">{description}</p>
      {disabled && (
        <span className="inline-block mt-3 text-[10px] uppercase tracking-wider font-bold text-muted-foreground bg-muted px-2 py-0.5 rounded">
          Próximamente
        </span>
      )}
    </a>
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
