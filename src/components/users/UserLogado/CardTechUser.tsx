interface TechCardProps {
    name: string
  }
  
  export default function CardTechUser({ name }: TechCardProps) {
    return (
      <div className="px-4 py-2 rounded-full border text-sm font-medium transition-all duration-200">
        {name.toUpperCase()}
      </div>
    )
  }
  