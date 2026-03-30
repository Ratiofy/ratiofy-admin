interface PageHeaderProps {
  title: string;
  description: string;
}

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <header className="mb-10">
      <h1 className="text-3xl font-bold text-foreground tracking-tight mb-2">{title}</h1>
      <p className="text-muted-foreground font-medium">
        {description}
      </p>
    </header>
  );
}