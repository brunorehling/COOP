// SkillCard.tsx - Versão atualizada
interface SkillCardProps {
  name: string
  icon: React.ReactNode
  selected?: boolean
  onToggle?: () => void
  displayOnly?: boolean // Nova prop
}

export default function SkillCard({ 
  name, 
  icon, 
  selected = false, 
  onToggle, 
  displayOnly = false 
}: SkillCardProps) {
  
  // Se for apenas para display (visualização)
  if (displayOnly) {
    return (
      <div className="flex items-center gap-2 bg-white border border-gray-300 rounded-full px-4 py-2 hover:border-[#E64EEB] transition-all duration-200">
        {icon}
        <span className="text-black font-medium">{name}</span>
      </div>
    );
  }

  // Se for interativo (para seleção)
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`flex px-4 py-2 rounded-full w-[31%] border items-center justify-between text-sm font-medium transition-all duration-200
        ${
          selected
            ? "bg-pink-500 border-pink-500 text-white"
            : "bg-transparent border-gray-400 hover:bg-gray-100 text-white"
        }`}
    >
      <div className="flex items-center gap-2">
        {icon}
        <span>{name.toUpperCase()}</span>
      </div>
    </button>
  );
}