import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import type { User } from '../utils/UserType'
import { usersControllerFindOne } from '../api/orval/users/users'
import { NotificationModal } from '../Notificacoes'

export function Cabecalho2() {
  const [user, setUser] = useState<User | null>(null)
  const [openModal, setOpenModal] = useState(false)

  useEffect(() => {
    async function fetchUser() {
      try {
        const userId = localStorage.getItem('userId')
        if (!userId) {
          console.error('userId não encontrado no localStorage')
          return
        }

        // O endpoint espera string, então tá tudo certo assim
        const response = await usersControllerFindOne(userId)

        if (response.status === 200 && response.data) {
          setUser(response.data as User)
        } else {
          setUser(null)
        }
      } catch (error) {
        console.error('Erro ao buscar usuário:', error)
        setUser(null)
      }
    }

    fetchUser()
  }, [])

  return (
    <header className="bg-[#212b41] flex justify-between items-center pr-14 pl-14 pt-7 pb-7 md:pr-32 md:pl-32 md:pt-10 md:pb-14">
      <h1 className="text-white text-5xl md:text-7xl font-semibold font-Sans-serif">CO-OP</h1>
      <div className="flex flex-wrap justify-around items-center gap-10">
        <div className="flex flex-wrap justify-around items-center gap-4">
          <Link to="/perfil" className='flex flex-wrap gap-5 justify-center items-center'>
          {user?.username && (
              <span className="text-white text-xl font-jost ml-2">{user.username}</span>
            )}
            {user?.avatarUrl ? (
              <img
                src={user.avatarUrl}
                alt="User Avatar"
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <div className="w-10 h-10 bg-gray-500 rounded-full" />
            )}
          </Link>
         <button onClick={() => setOpenModal(!openModal)}>
          <img
            src={
              openModal
                ? "/notification_selected.png"
                : "/notification_not_selected.png"
            }
            alt="Notificações"
            className="w-7 h-7"
          />
        </button>

        <NotificationModal
          open={openModal}
          onClose={() => setOpenModal(false)}
        />
        </div>
      </div>
    </header>
  )
}
