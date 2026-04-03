import { ClipboardClock } from 'lucide-react';
import { BaseCard } from '../../../components/ui/BaseCard';

interface PendingCardProps {
  title: string;
}
export function PendingCard({ title }: PendingCardProps) {
  return (
    <BaseCard title={title} icon={ClipboardClock} statsDecorate={false}>
      <div className="flex items-baseline gap-2">
        <p
          className={`font-bold tracking-tight text-foreground text-lg opacity-80`}
        >
          Próximamente
        </p>
      </div>
    </BaseCard>
  );
}
