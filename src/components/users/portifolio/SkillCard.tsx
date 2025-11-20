// SkillCard.tsx
interface SkillCardProps {
  name: string
  icon: React.ReactNode
  selected: boolean
  onToggle: () => void
}

export default function SkillCard({ name, icon, selected, onToggle }: SkillCardProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`flex px-4 py-2 rounded-full w-[31%] border items-center justify-between text-sm font-medium transition-all duration-200
        ${
          selected
            ? "bg-pink-500 border-pink-500"
            : "bg-transparent border-gray-400 hover:bg-gray-700"
        }`}
    >
      <div className="flex items-center gap-2">
        {icon}
        <span>{name.toUpperCase()}</span>
      </div>
    </button>
  )
}
