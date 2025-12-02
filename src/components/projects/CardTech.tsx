interface TechCardProps {
  name: string
  img : string
  selected: boolean
  onClick: () => void
}

export default function CardTech({ name, selected, img, onClick }: TechCardProps) {
  return (
    <button
      onClick={onClick}
      className={`flex px-4 py-2 rounded-full w-[31%] border items-center justify-between text-sm font-medium transition-all duration-200
        ${
          selected
            ? "bg-pink-500 border-pink-500"
            : "bg-transparent border-gray-400 hover:bg-gray-700"
        }`}
    >
      <img src={img} alt={name} className="w-8 h-8 object-contain" />
      {name.toUpperCase()}
    </button>
  )
}