import { useEffect, useState } from 'react'
import type { User } from '../../utils/UserType'
import type { Portfolio } from '../../utils/PortifolioType'
import { authControllerGetProfile } from '../../api/orval/auth/auth'
import { portfolioControllerFindAll } from '../../api/orval/portfolio/portfolio'
import { Cabecalho2 } from '../Cabecalho2'
import { Navegacao } from '../Navegacao'
import { UserInfo } from './cabecalho_user_card'
import { Link } from 'react-router-dom'

export function UserProfile() {
  const [user, setUser] = useState<User | null>(null)
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem('token')
        const userId = localStorage.getItem('userId')

        if (!token || !userId) {
          setError('Usuário não logado')
          setLoading(false)
          return
        }

        const userResponse = await authControllerGetProfile({
          headers: { Authorization: `Bearer ${token}` },
        })

        if (userResponse.status === 200 && userResponse.data) {
          setUser(userResponse.data as User)
        }

        const portResponse = await portfolioControllerFindAll()
        const portfolios: Portfolio[] = portResponse?.data ?? []
        const userPortfolio = portfolios.find(
          (p) => String(p.userId) === String(userId)
        )
        if (userPortfolio) {
          setPortfolio(userPortfolio)
        }

      } catch (error) {
        console.error('Erro ao buscar dados:', error)
        setError('Erro ao buscar dados do usuário ou portfólio.')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) return <p>Carregando...</p>
  if (error && !user) return <p>{error}</p>
  if (!user) return <p>Usuário não encontrado.</p>

  return (
    <>
      <Cabecalho2 />
      <Navegacao />

      <div className="flex flex-col text-white justify-center items-center mt-[5%] h-full">
        <h1 className="text-3xl mb-4">Perfil do Usuário</h1>
        <UserInfo user={portfolio?.user || user} />
        
        {/* Se existir portfólio, mostra os destaques */}
        {portfolio ? (
          <div className="p-6 text-white w-[60vw] bg-white rounded-b-xl">
            {portfolio.highlightedProjects?.length ? (
              <div className="mt-4">
                <h2 className="text-2xl mb-2">Projetos em destaque</h2>
                <ul className="list-disc ml-6">
                  {portfolio.highlightedProjects.map((proj, i) => (
                    <li key={i}>{proj}</li>
                  ))}
                </ul>
              </div>
            ) : (
              <p className="mt-2 text-black">Nenhum projeto destacado.</p>
            )}

            {portfolio.highlightedAssets?.length ? (
              <div className="mt-6">
                <h2 className="text-2xl mb-2">Assets em destaque</h2>
                <ul className="list-disc ml-6">
                  {portfolio.highlightedAssets.map((asset, i) => (
                    <li key={i}>{asset}</li>
                  ))}
                </ul>
              </div>
            ) : (
              <p className="mt-2 text-black">Nenhum asset destacado.</p>
            )}
          </div>
        ) : (
          <div className='flex items-center justify-center bg-white w-[60vw] '>
              <p className='flex  p-10 font-bold text-black'>Você ainda não possui um portifólio</p>
          </div>

        )}

        <div className='flex justify-between items-center gap-30 mt-10 w-[25vw]'>
          <Link to={`/criar_portifolio`} className='bg-[#E64EEB] p-1 rounded-2xl'>
            editar perfil
          </Link>
          <Link to="/" className='flex bg-black p-1 rounded-2xl w-[5vw] justify-center'>
            <p>Log off</p>
          </Link>
        </div>
      </div>
    </>
  )
}
