interface TechCardProps {
  name: string
  selected: boolean
  onClick: () => void
}

export default function CardTech({ name, selected, onClick }: TechCardProps) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full border text-sm font-medium transition-all duration-200
        ${
          selected
            ? "bg-pink-500 border-pink-500"
            : "bg-transparent border-gray-400 hover:bg-gray-700"
        }`}
    >
      {name.toUpperCase()}
    </button>
  )
}
