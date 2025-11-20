import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import type { User } from '../../../utils/UserType'
import type { Portfolio } from '../../../utils/PortifolioType'
import { portfolioControllerFindAll } from '../../../api/orval/portfolio/portfolio'
import { usersControllerFindOne } from '../../../api/orval/users/users'
import { Cabecalho2 } from '../../Cabecalho2'
import { Navegacao } from '../../Navegacao'
import { UserInfo } from '../cabecalho_user_card'
import { PortfolioSection } from '../portifolio/PortifolioUser'

export function PublicProfile() {
  const { id } = useParams<{ id: string }>()
  const [user, setUser] = useState<User | null>(null)
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      if (!id) {
        setError('ID do usuário não fornecido.')
        setLoading(false)
        return
      }

      try {
        const token = localStorage.getItem('token') || ''

        const userResponse = await usersControllerFindOne(id, {
          headers: { Authorization: `Bearer ${token}` },
        })

        if (userResponse.status === 200 && userResponse.data) {
          const fetchedUser = userResponse.data as any
          const safeUser: User = {
            ...fetchedUser,
            id: Number(fetchedUser.id),
          }
          setUser(safeUser)
        }

        const portResponse = await portfolioControllerFindAll({
          headers: { Authorization: `Bearer ${token}` },
        })

        const portfolios: Portfolio[] = Array.isArray(portResponse?.data)
          ? portResponse.data
          : []

        const targetPortfolio = portfolios.find(
          (p) => Number(p.userId) === Number(id)
        )

        if (targetPortfolio) setPortfolio(targetPortfolio)
      } catch (err) {
        console.error('Erro ao buscar dados do usuário:', err)
        setError('Não foi possível carregar o perfil.')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id])

  if (loading) return <p>Carregando...</p>
  if (error) return <p>{error}</p>
  if (!user) return <p>Usuário não encontrado.</p>

  return (
    <>
      <Cabecalho2 />
      <Navegacao />

      <div className="flex flex-col text-white justify-center items-center mt-[5%] h-full">
        <h1 className="text-3xl mb-4">Perfil do Usuário</h1>

        {/* Mantém o mesmo estilo do UserProfile */}
        <UserInfo user={user} />

        <PortfolioSection portfolio={portfolio} isPublic={true}/>

        <div className="flex justify-between items-center gap-30 mt-10 w-[25vw]">
          <Link
            to="/feed"
            className="bg-[#E64EEB] p-2 rounded-3xl"
          >
            voltar
          </Link>
        </div>
      </div>
    </>
  )
}
