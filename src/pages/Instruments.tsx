import AdminLayout from "../components/layout/AdminLayout";
import { PageHeader } from "../components/common/PageHeader";
import { Archive, Cpu, LayoutList, SquareCheck } from "lucide-react";
import { SingleStatCard } from "../components/common/SingleStatCard";

export default function Instruments() {
    return (
        <AdminLayout>
            <PageHeader
                title="Instrumentos"
                description="Gestiona los instrumentos de la plataforma Ratiofy."
            />
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <SingleStatCard
                    label="Activos"
                    value={10}
                    icon={SquareCheck}
                    color="text-green-500"
                />
                <SingleStatCard
                    label="Pendientes"
                    value={10}
                    icon={LayoutList}
                    color="text-yellow-500"
                />
                <SingleStatCard
                    label="Procesando"
                    value={10}
                    icon={Cpu}
                    color="text-blue-500"
                />
                <SingleStatCard
                    label="Archivados"
                    value={10}
                    icon={Archive}
                    color="text-gray-500"
                />
            </section>
        </AdminLayout>
    );
}