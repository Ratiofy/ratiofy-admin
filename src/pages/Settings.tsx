// import { Settings as SettingsIcon } from 'lucide-react';
// import AdminLayout from '../components/layout/AdminLayout';

import { PageHeader } from '../components/layout/PageHeader';
import AdminLayout from '../components/layout/AdminLayout';

// export default function Settings() {
//   return (
//     <AdminLayout>
//       <div className="animate-fade-in">
//         {/* Header */}
//         <header className="mb-10">
//           <h1 className="text-3xl font-bold text-foreground tracking-tight mb-2">Configuración</h1>
//           <p className="text-muted-foreground font-medium">
//             Gestiona los parámetros globales de la plataforma Ratiofy.
//           </p>
//         </header>

//         {/* Coming Soon Message */}
//         <div className="admin-card py-20 flex flex-col items-center justify-center text-center border-dashed border-2">
//           <div className="p-4 rounded-3xl bg-muted/30 text-muted-foreground mb-6">
//             <SettingsIcon size={48} strokeWidth={1.5} />
//           </div>
//           <h2 className="text-2xl font-bold text-foreground mb-3">Módulo de Configuración</h2>
//           <p className="text-muted-foreground max-w-md mx-auto mb-8">
//             Estamos trabajando en las herramientas administrativas avanzadas para el control de API, Pipeline RAG y gestión de usuarios.
//           </p>
//           <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-success/10 text-success text-xs font-bold uppercase tracking-widest border border-success/20">
//             <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
//             Próximamente
//           </span>
//         </div>
//       </div>
//     </AdminLayout>
//   );
// }

export default function Settings() {
  return (
    <AdminLayout>
      <PageHeader
        title="Configuración"
        description="Gestiona los parámetros globales de la plataforma Ratiofy."
      />
    </AdminLayout>
  );
}
