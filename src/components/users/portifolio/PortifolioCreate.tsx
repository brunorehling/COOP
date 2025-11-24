// CreatePortfolio.tsx
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { portfolioControllerCreate, portfolioControllerUpdate } from '../../../api/orval/portfolio/portfolio'
import type { Portfolio, PortfolioWithHighlights } from '../../../utils/PortifolioType'
import type { CreatePortfolioDto, UpdatePortfolioDto, CreatePortfolioDtoSkills } from '../../../api/orval/coopApi.schemas'
import PortfolioSkillsSelector from './PortfolioSkillsSelector'

// Props incluindo projetos/assets do usuário
interface CreatePortfolioProps {
  portfolio?: PortfolioWithHighlights
  userProjects?: { id: number; name: string }[]
  userAssets?: { id: number; name: string }[]
}

export default function CreatePortfolio({ portfolio, userProjects = [], userAssets = [] }: CreatePortfolioProps) {
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  if (!token) return <p>Usuário não logado</p>

  const [name, setName] = useState('')
  const [bio, setBio] = useState('')
  const [location, setLocation] = useState('')
  const [skills, setSkills] = useState<string[]>([])
  const [highlightedProjects, setHighlightedProjects] = useState<number[]>([])
  const [highlightedAssets, setHighlightedAssets] = useState<number[]>([])

  useEffect(() => {
    if (portfolio) {
      setName(portfolio.name || '')
      setBio(portfolio.bio || '')
      setLocation(portfolio.location || '')
      setSkills(portfolio.skills || [])
      setHighlightedProjects(
        Array.isArray(portfolio.highlightedProjects)
          ? portfolio.highlightedProjects.map(p => Number(p.id))
          : []
      )
      setHighlightedAssets(
        Array.isArray(portfolio.highlightedAssets)
          ? portfolio.highlightedAssets.map(a => Number(a.id))
          : []
      )
    }
  }, [portfolio])

  // Mapeamento para backend
  const backendSkillsMap: Record<string, string> = {
    React: 'react', Angular: 'angular', Vue: 'vue',
    'Node.js': 'nodejs', Python: 'python', Java: 'java',
    TypeScript: 'typescript', JavaScript: 'javascript',
    PostgreSQL: 'postgresql', MongoDB: 'mongodb', Docker: 'docker',
    Kubernetes: 'kubernetes', AWS: 'aws', Azure: 'azure', Git: 'git'
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const normalizedSkills = skills.map(s => backendSkillsMap[s] || s.toLowerCase().trim())
      const uniqueSkills = Array.from(new Set(normalizedSkills)) as CreatePortfolioDtoSkills[]

      const data: CreatePortfolioDto | UpdatePortfolioDto = {
        name,
        bio,
        location,
        skills: uniqueSkills,
        highlightedProjects,
        highlightedAssets
      }

      if (portfolio?.id) {
        await portfolioControllerUpdate(
          String(portfolio.id),
          data as UpdatePortfolioDto,
          { headers: { Authorization: `Bearer ${token}` } }
        )
      } else {
        await portfolioControllerCreate(
          data as unknown as CreatePortfolioDto,
          { headers: { Authorization: `Bearer ${token}` } }
        )
      }

      navigate('/perfil')
    } catch (error) {
      console.error('Erro ao salvar portfólio:', error)
    }
  }

  return (
    <div className="w-full flex flex-col items-center pt-10 px-4 text-white">
      <h1 className="text-3xl font-bold mb-10">{portfolio?.id ? 'Editar Portfólio' : 'Criar Portfólio'}</h1>

      <form onSubmit={handleSubmit} className="w-full max-w-[850px] flex flex-col gap-10">
        {/* Nome */}
        <div className="flex flex-col items-center gap-4">
          <label className="text-[#E64EEB] font-semibold text-lg">Nome do Portfólio</label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full max-w-[350px] p-2 rounded bg-[#DADADA] text-black"
            required
          />
        </div>

        {/* Local */}
        <div className="flex flex-col items-center gap-4">
          <label className="text-[#E64EEB] font-semibold text-lg">Local</label>
          <input
            type="text"
            value={location}
            onChange={e => setLocation(e.target.value)}
            className="w-full max-w-[350px] p-2 rounded bg-[#DADADA] text-black"
          />
        </div>

        {/* Bio */}
        <div className="flex flex-col items-center">
          <p className="text-lg font-semibold mb-4">Breve descrição sobre você</p>
          <textarea
            value={bio}
            onChange={e => setBio(e.target.value)}
            className="w-full max-w-[700px] min-h-[180px] p-4 rounded-xl bg-[#DADADA] text-black"
          />
        </div>

        {/* Skills */}
        <div className='flex flex-col items-center justify-center gap-10'>
          <h1 className='text-2xl font-bold'>Selecione suas Skills</h1>
          <PortfolioSkillsSelector defaultValues={skills} onChange={setSkills}/>
        </div>

        {/* Projetos destacados */}
        {userProjects.length > 0 && (
          <div className="flex flex-col items-center gap-2">
            <label className="text-xl font-semibold">Projetos Destacados</label>
            <select
              multiple
              value={highlightedProjects.map(String)}
              onChange={e => {
                const ids = Array.from(e.target.selectedOptions).map(opt => Number(opt.value))
                setHighlightedProjects(ids)
              }}
              className="w-full max-w-[500px] p-2 rounded bg-[#DADADA] text-black"
            >
              {userProjects.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>
        )}

        {/* Assets destacados */}
        {userAssets.length > 0 && (
          <div className="flex flex-col items-center gap-2">
            <label className="text-xl font-semibold">Assets Destacados</label>
            <select
              multiple
              value={highlightedAssets.map(String)}
              onChange={e => {
                const ids = Array.from(e.target.selectedOptions).map(opt => Number(opt.value))
                setHighlightedAssets(ids)
              }}
              className="w-full max-w-[500px] p-2 rounded bg-[#DADADA] text-black"
            >
              {userAssets.map(a => (
                <option key={a.id} value={a.id}>{a.name}</option>
              ))}
            </select>
          </div>
        )}

        {/* Botões */}
        <div className="flex flex-row justify-center gap-6 mt-8">
          <button type="submit" className="bg-[#E64EEB] px-6 py-3 rounded-xl text-white font-semibold">
            Salvar Alterações
          </button>
          <button type="button" className="bg-black px-6 py-3 rounded-xl text-white font-semibold" onClick={() => navigate('/perfil')}>
            Descartar
          </button>
        </div>
      </form>
    </div>
  )
}
