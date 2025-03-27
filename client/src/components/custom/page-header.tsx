interface PageHeaderProps {
  title: string
  description: string
  icon?: string
}

export default function PageHeader({ title, description, icon }: PageHeaderProps) {
  return (
    <div className="text-center max-w-2xl mx-auto">
      {icon && <span className="text-4xl">{icon}</span>}
      <h1 className="text-3xl md:text-4xl font-bold mt-2">{title}</h1>
      <p className="text-lg text-muted-foreground mt-2">{description}</p>
    </div>
  )
}

