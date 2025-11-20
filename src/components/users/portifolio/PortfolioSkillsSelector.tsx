// PortfolioSkillsSelector.tsx
import { useState, useEffect, useMemo } from "react"
import SkillCard from './skillCard'
import { SiReact, SiAngular, SiVuedotjs, SiNodedotjs, SiPython, SiTypescript, SiJavascript, SiPostgresql, SiMongodb, SiDocker, SiKubernetes, SiAmazon, SiGit } from 'react-icons/si'
import { FaJava } from "react-icons/fa";
import { VscAzure } from "react-icons/vsc";
interface PortfolioSkillsSelectorProps {
  onChange?: (skills: string[]) => void
  defaultValues?: string[]
}

export default function PortfolioSkillsSelector({
  onChange,
  defaultValues = []
}: PortfolioSkillsSelectorProps) {
  const normalize = (s: string) => s.toLowerCase().trim()

  const normalizedDefaults = useMemo(
    () => defaultValues.map(normalize),
    [defaultValues]
  )

  const [selected, setSelected] = useState<string[]>(normalizedDefaults)

  useEffect(() => {
    setSelected(prev => {
      const prevSorted = [...prev].sort().join(",")
      const newSorted = [...normalizedDefaults].sort().join(",")

      if (prevSorted !== newSorted) return normalizedDefaults
      return prev
    })
  }, [normalizedDefaults])

const availableSkills: [React.ReactNode, string][] = [
  [<SiReact size={24} color="#61DAFB" />, "React"],
  [<SiAngular size={24} color="#DD0031" />, "Angular"],
  [<SiVuedotjs size={24} color="#4FC08D" />, "Vue"],
  [<SiNodedotjs size={24} color="#339933" />, "Node.js"],
  [<SiPython size={24} color="#3776AB" />, "Python"],
  [<FaJava size={24} color="#007396" />, "Java"],
  [<SiTypescript size={24} color="#3178C6" />, "TypeScript"],
  [<SiJavascript size={24} color="#F7DF1E" />, "JavaScript"],
  [<SiPostgresql size={24} color="#336791" />, "PostgreSQL"],
  [<SiMongodb size={24} color="#47A248" />, "MongoDB"],
  [<SiDocker size={24} color="#2496ED" />, "Docker"],
  [<SiKubernetes size={24} color="#326CE5" />, "Kubernetes"],
  [<SiAmazon size={24} color="#FF9900" />, "AWS"],
  [<VscAzure size={24} color="#0089D6" />, "Azure"],
  [<SiGit size={24} color="#F05032" />, "Git"]
]


  function toggleSkill(skill: string) {
    const normalized = normalize(skill)
    setSelected(prev =>
      prev.includes(normalized)
        ? prev.filter(s => s !== normalized)
        : [...prev, normalized]
    )
  }

  useEffect(() => {
    onChange?.(selected)
  }, [selected])

  return (
    <div className="flex flex-wrap justify-center items-center gap-3 max-w-md min-w-md text-white">
      {availableSkills.map(([icon, name]) => {
        const normalized = normalize(name)
        return (
          <SkillCard
            key={name}
            name={name}
            icon={icon}
            selected={selected.includes(normalized)}
            onToggle={() => toggleSkill(name)}
          />
        )
      })}
    </div>
  )
}
