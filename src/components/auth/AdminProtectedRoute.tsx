import type { ReactNode } from 'react';
import { SignedIn, SignedOut, SignIn, useUser } from '@clerk/clerk-react';
import { ShieldAlert } from 'lucide-react';

interface AdminProtectedRouteProps {
  children: ReactNode;
}

export default function AdminProtectedRoute({
  children,
}: AdminProtectedRouteProps) {
  return (
    <>
      <SignedIn>
        <AdminRoleGate>{children}</AdminRoleGate>
      </SignedIn>
      <SignedOut>
        <div className="flex min-h-screen items-center justify-center bg-background p-4">
          <div className="animate-fade-in">
            <SignIn routing="hash" />
          </div>
        </div>
      </SignedOut>
    </>
  );
}

function AdminRoleGate({ children }: { children: ReactNode }) {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4 animate-fade-in">
          <div className="w-10 h-10 border-2 border-success border-t-transparent rounded-full animate-spin" />
          <p className="text-muted-foreground text-sm font-medium">
            Verificando permisos...
          </p>
        </div>
      </div>
    );
  }

  const role = user?.publicMetadata?.role as string | undefined;
  const isAdmin = role === 'admin' || role === 'superadmin';

  if (!isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background p-4">
        <div className="admin-card max-w-md text-center space-y-6 animate-fade-in">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-destructive/15 flex items-center justify-center">
            <ShieldAlert size={32} className="text-destructive" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Acceso Restringido
            </h2>
            <p className="text-muted-foreground">
              No tienes permisos para acceder al panel de administración.
              Contacta a un administrador si crees que esto es un error.
            </p>
          </div>
          <div className="pt-2">
            <p className="text-xs text-muted-foreground">
              Usuario:{' '}
              <span className="text-foreground font-medium">
                {user?.primaryEmailAddress?.emailAddress}
              </span>
            </p>
            <p className="text-xs text-muted-foreground">
              Rol actual:{' '}
              <span className="text-foreground font-medium">
                {role || 'sin rol asignado'}
              </span>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
