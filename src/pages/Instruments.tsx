import AdminLayout from "../components/layout/AdminLayout";
import { PageHeader } from "../components/common/PageHeader";
import { CreateInstrumentForm } from "../components/instruments/CreateInstrumentForm";
import { Archive, Cpu, LayoutList, SquareCheck } from "lucide-react";
import { SingleStatCard } from "../components/common/SingleStatCard";
import { useInstrumentsSummary } from "../hooks/useInstruments";

export default function Instruments() {

    const { data: instrumentStats, refetch } = useInstrumentsSummary();

    return (
        <AdminLayout>
            <PageHeader
                title="Instrumentos"
                description="Gestiona los instrumentos de la plataforma Ratiofy."
            />

            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <SingleStatCard
                    label="Activos"
                    value={instrumentStats?.find((s) => s.status === 'ACTIVE')?.count || 0}
                    icon={SquareCheck}
                    color="text-green-500"
                />
                <SingleStatCard
                    label="Pendientes"
                    value={instrumentStats?.find((s) => s.status === 'PENDING')?.count || 0}
                    icon={LayoutList}
                    color="text-yellow-500"
                />
                <SingleStatCard
                    label="Procesando"
                    value={instrumentStats?.find((s) => s.status === 'PROCESSING')?.count || 0}
                    icon={Cpu}
                    color="text-blue-500"
                />
                <SingleStatCard
                    label="Archivados"
                    value={instrumentStats?.find((s) => s.status === 'ARCHIVED')?.count || 0}
                    icon={Archive}
                    color="text-gray-500"
                />
                {(instrumentStats?.find((s) => s.status === 'ERROR')?.count ?? 0) > 0 && (
                    <SingleStatCard
                        label="Errores"
                        value={instrumentStats?.find((s) => s.status === 'ERROR')?.count || 0}
                        icon={Archive}
                        color="text-red-500"
                    />
                )}
            </section>

            <section className="mt-8">
                <CreateInstrumentForm onSuccess={() => refetch()} />
            </section>

            <section>
                {/* Tabla de instrumentos */}
            </section>

        </AdminLayout>
    );
}