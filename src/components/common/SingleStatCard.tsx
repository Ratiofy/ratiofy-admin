import type { LucideIcon } from "lucide-react";

export function SingleStatCard({
    label,
    value,
    icon: Icon,
    color,
}: {
    label: string;
    value: number | string;
    icon: LucideIcon;
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