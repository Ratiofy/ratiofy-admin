import AdminLayout from "../components/layout/AdminLayout";
import { PageHeader } from "../components/common/PageHeader";
import { Archive, Cpu, LayoutList, SquareCheck } from "lucide-react";
import { SingleStatCard } from "../components/common/SingleStatCard";
import { useInstrumentsSummary } from "../hooks/useInstruments";

export default function Instruments() {

    const { data: instrumentStats } = useInstrumentsSummary();

    return (
        <AdminLayout>
            <PageHeader
                title="Instrumentos"
                description="Gestiona los instrumentos de la plataforma Ratiofy."
            />
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <SingleStatCard
                    label="Activos"
                    value={instrumentStats?.ACTIVE || 0}
                    icon={SquareCheck}
                    color="text-green-500"
                />
                <SingleStatCard
                    label="Pendientes"
                    value={instrumentStats?.PENDING || 0}
                    icon={LayoutList}
                    color="text-yellow-500"
                />
                <SingleStatCard
                    label="Procesando"
                    value={instrumentStats?.PROCESSING || 0}
                    icon={Cpu}
                    color="text-blue-500"
                />
                <SingleStatCard
                    label="Archivados"
                    value={instrumentStats?.ARCHIVED || 0}
                    icon={Archive}
                    color="text-gray-500"
                />
                {(instrumentStats?.ERROR ?? 0) > 0 && (
                    <SingleStatCard
                        label="Errores"
                        value={instrumentStats?.ERROR || 0}
                        icon={Archive}
                        color="text-red-500"
                    />
                )}
            </section>
        </AdminLayout>
    );
}