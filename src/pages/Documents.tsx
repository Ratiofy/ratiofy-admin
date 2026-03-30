import AdminLayout from "../components/layout/AdminLayout";
import { PageHeader } from "../components/common/PageHeader";

export default function Documents() {
    return (
        <AdminLayout>
            <PageHeader
                title="Documentos"
                description="Gestiona los documentos de la plataforma Ratiofy."
            />
        </AdminLayout>
    );
}