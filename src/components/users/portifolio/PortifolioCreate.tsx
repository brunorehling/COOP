// CreatePortfolio.tsx
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { portfolioControllerCreate, portfolioControllerUpdate } from '../../../api/orval/portfolio/portfolio'
import type { Portfolio } from '../../../utils/PortifolioType'
import type { CreatePortfolioDto, UpdatePortfolioDto, CreatePortfolioDtoSkills } from '../../../api/orval/coopApi.schemas'
import PortfolioSkillsSelector from './PortfolioSkillsSelector'

interface CreatePortfolioProps {
  portfolio?: Portfolio
}

export default function CreatePortfolio({ portfolio }: CreatePortfolioProps) {
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  if (!token) return <p>Usuário não logado</p>

  const [name, setName] = useState('')
  const [bio, setBio] = useState('')
  const [location, setLocation] = useState('')
  const [skills, setSkills] = useState<string[]>([])

  useEffect(() => {
    if (portfolio) {
      setName(portfolio.name || '')
      setBio(portfolio.bio || '')
      setLocation(portfolio.location || '')
      setSkills(portfolio.skills || [])
    }
  }, [portfolio])

  // Mapeamento para backend
  const backendSkillsMap: Record<string, string> = {
    React: 'react',
    Angular: 'angular',
    Vue: 'vue',
    'Node.js': 'nodejs',
    Python: 'python',
    Java: 'java',
    TypeScript: 'typescript',
    JavaScript: 'javascript',
    PostgreSQL: 'postgresql',
    MongoDB: 'mongodb',
    Docker: 'docker',
    Kubernetes: 'kubernetes',
    AWS: 'aws',
    Azure: 'azure',
    Git: 'git'
  }

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  try {
    // normalize tudo antes de remover duplicatas
    const normalizedSkills = skills.map(s => backendSkillsMap[s] || s.toLowerCase().trim())
    const uniqueSkills = Array.from(new Set(normalizedSkills)) as CreatePortfolioDtoSkills[]

    const data: CreatePortfolioDto | UpdatePortfolioDto = {
      name,
      bio,
      location,
      skills: uniqueSkills
    }

    if (portfolio?.id) {
      await portfolioControllerUpdate(
        String(portfolio.id),
        data as UpdatePortfolioDto,
        { headers: { Authorization: `Bearer ${token}` } }
      )
    } else {
      await portfolioControllerCreate(
        data as CreatePortfolioDto,
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

        <div className='flex flex-col items-center justify-center gap-10'>
          <h1 className='text-2xl font-bold'>Selecione suas Skills</h1>
          <PortfolioSkillsSelector defaultValues={skills} onChange={(s) => setSkills(s)}/>
        </div>
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
