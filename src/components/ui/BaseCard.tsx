import type { LucideIcon } from 'lucide-react';

interface BaseCardProps {
  title: string;
  icon: LucideIcon;
  children: React.ReactNode;
  statsDecorate?: boolean;
}

export function BaseCard({
  title,
  icon: Icon,
  children,
  statsDecorate = true,
}: BaseCardProps) {
  return (
    <div className="metric-card group">
      <div className="flex justify-between items-start mb-4">
        <div className="p-2.5 rounded-xl bg-card border border-border text-muted-foreground group-hover:text-success group-hover:border-success/30 transition-colors">
          <Icon size={22} />
        </div>
        {statsDecorate && (
          <div className="flex gap-1">
            <div className="w-2 h-2 rounded-full bg-success" title="Active" />
            <div className="w-2 h-2 rounded-full bg-warning" title="Pending" />
            <div
              className="w-2 h-2 rounded-full bg-muted-foreground/30"
              title="Archived"
            />
          </div>
        )}
      </div>
      <div>
        <h4 className="text-muted-foreground font-medium mb-1">{title}</h4>
        {children}
      </div>
    </div>
  );
}
