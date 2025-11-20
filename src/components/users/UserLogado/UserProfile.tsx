import { useEffect, useState } from 'react'
import type { User } from '../../../utils/UserType'
import type { Portfolio } from '../../../utils/PortifolioType'
import { authControllerGetProfile } from '../../../api/orval/auth/auth'
import { portfolioControllerFindAll } from '../../../api/orval/portfolio/portfolio'
import { Cabecalho2 } from '../../Cabecalho2'
import { Navegacao } from '../../Navegacao'
import { UserInfo } from '../cabecalho_user_card'
import { Link, useNavigate } from 'react-router-dom'
import { PortfolioSection } from '../portifolio/PortifolioUser'

export function UserProfile() {
  const [user, setUser] = useState<User | null>(null)
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

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

        // --- Buscar perfil ---
        const userResponse = await authControllerGetProfile({
          headers: { Authorization: `Bearer ${token}` },
        })

        if (userResponse.status === 200 && userResponse.data) {
          setUser(userResponse.data as User)
        }

        // --- Buscar portfólio ---
        const portResponse = await portfolioControllerFindAll({
          headers: { Authorization: `Bearer ${token}` },
        })

        const portfolios: Portfolio[] = Array.isArray(portResponse?.data)
          ? portResponse.data
          : []

        const userPortfolio = portfolios.find(
          (p) => String(p.userId) === String(userId)
        )

        if (userPortfolio) {
          setPortfolio(userPortfolio)
        }

      } catch (error) {
        console.error('Erro ao buscar dados:', error)
        setError('Erro ao buscar dados.')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleLogoff = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    navigate('/')
  }

  if (loading) return <p>Carregando...</p>
  if (error && !user) return <p>{error}</p>
  if (!user) return <p>Usuário não encontrado.</p>

  return (
    <>
      <Cabecalho2 />
      <Navegacao />

      <div className="flex flex-col text-white justify-center items-center mt-[5%] h-full">
        <h1 className="text-3xl mb-4">Perfil do Usuário</h1>

        {/* UserInfo sempre mostra o user principal caso portfolio.user não exista */}
<UserInfo
  user={
    portfolio?.user
      ? { ...portfolio.user, id: Number(portfolio.user.id) }
      : user
      ? { ...user, id: Number(user.id) }
      : undefined
  }
/>


        {/* Se portfolio existir, mostra. Se não, mostra o botão de criar. */}
        <PortfolioSection portfolio={portfolio} isPublic={false}/>

        <div className='flex justify-between items-center gap-30 mt-10 w-[25vw]'>
          <Link
            to={`/editar_perfil/${user.id}`}
            className='bg-[#E64EEB] p-2 rounded-3xl'
          >
            editar perfil
          </Link>

          <button
            onClick={handleLogoff}
            className='flex bg-black p-2 rounded-3xl w-[5vw] justify-center text-white cursor-pointer'
          >
            <p>Log off</p>
          </button>
        </div>
      </div>
    </>
  )
}
