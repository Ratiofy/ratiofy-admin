import AdminLayout from "../components/layout/AdminLayout";
import { PageHeader } from "../components/common/PageHeader";

export default function Instruments() {
    return (
        <AdminLayout>
            <PageHeader
                title="Instrumentos"
                description="Gestiona los instrumentos de la plataforma Ratiofy."
            />
        </AdminLayout>
    );
}