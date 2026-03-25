import { Link, useLocation } from 'react-router-dom';
import { UserButton } from '@clerk/clerk-react';
import {
  TrendingUp,
  FileText,
  LayoutDashboard,
  Settings,
  Shield,
} from 'lucide-react';

const navItems = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/documents', label: 'Documentos', icon: FileText },
  { path: '/settings', label: 'Configuración', icon: Settings },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 border-r border-border bg-background/80 backdrop-blur-xl z-50 flex flex-col">
      {/* Logo */}
      <div className="p-8 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-success flex items-center justify-center shadow-[0_0_15px_var(--color-success)]">
          <TrendingUp size={18} className="text-success-foreground" />
        </div>
        <div className="flex flex-col">
          <span className="text-xl font-bold tracking-tight text-foreground">
            Ratiofy<span className="text-success">.</span>
          </span>
          <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest flex items-center gap-1">
            <Shield size={10} />
            Admin Panel
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-2 mt-4">
        <p className="px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
          Centro de Control
        </p>
        {navItems.map(({ path, label, icon: Icon }) => (
          <Link
            key={path}
            to={path}
            className={`nav-item ${location.pathname === path ? 'active' : ''}`}
          >
            <Icon size={20} />
            <span>{label}</span>
          </Link>
        ))}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-border mt-auto mb-4 mx-4 rounded-xl bg-card">
        <div className="flex items-center gap-3">
          <UserButton
            appearance={{
              elements: {
                userButtonAvatarBox: 'w-10 h-10 border-2 border-border shadow-sm',
                userButtonPopoverCard: 'bg-surface border border-border shadow-xl',
                userButtonPopoverActionButtonText: 'text-foreground',
                userButtonPopoverActionButtonIcon: 'text-muted-foreground',
                userButtonPopoverFooter: 'hidden',
              },
            }}
          />
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-foreground">Administrador</span>
            <span className="text-xs text-muted-foreground">Gestionar cuenta</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
