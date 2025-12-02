import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import type { User } from '../utils/UserType'
import { usersControllerFindOne } from '../api/orval/users/users'
import { NotificationModal } from '../Notificacoes'
import { customFetcher } from '../api/fetcher'

export function Cabecalho2() {
  const [user, setUser] = useState<User | null>(null)
  const [openModal, setOpenModal] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)

  useEffect(() => {
    async function fetchUser() {
      try {
        const userId = localStorage.getItem('userId')
        if (!userId) {
          console.error('userId não encontrado no localStorage')
          return
        }

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

  // Buscar notificações NÃO LIDAS do usuário atual usando /notifications/me
  useEffect(() => {
    async function fetchUnreadNotifications() {
      try {
        // Usando o endpoint específico para o usuário atual
        const response = await customFetcher('/notifications/me') as any
        
        let userNotifications: any[] = []
        
        // Extrair array de notificações da resposta
        if (Array.isArray(response)) {
          userNotifications = response
        } else if (response && Array.isArray(response.data)) {
          userNotifications = response.data
        } else if (response && Array.isArray(response.notifications)) {
          userNotifications = response.notifications
        }
        
        console.log(`📋 Notificações do usuário atual:`, userNotifications)
        
        // Contar notificações NÃO LIDAS (isRead = false)
        const unread = userNotifications.filter((notif: any) => 
          notif.isRead === false
        ).length
        
        console.log(`✅ Notificações NÃO LIDAS do usuário: ${unread}`)
        setUnreadCount(unread)
        
      } catch (error) {
        console.error('Erro ao buscar notificações do usuário:', error)
        setUnreadCount(0)
      }
    }

    // Buscar notificações quando o componente montar
    fetchUnreadNotifications()
    
    // Atualizar quando o modal abrir/fechar
    if (openModal) {
      // Se quiser atualizar quando abrir o modal
      fetchUnreadNotifications()
    }
    
    // Atualizar a cada 30 segundos (opcional)
    const interval = setInterval(fetchUnreadNotifications, 30000)
    
    return () => clearInterval(interval)
  }, [openModal]) // Recarrega quando o modal abre/fecha

  // Função para formatar o número
  const formatNotificationCount = (count: number) => {
    return count > 9 ? '9+' : count.toString()
  }

  return (
    <header className="flex justify-between items-center pr-14 pl-14 pt-7 pb-7 md:pr-32 md:pl-32 md:pt-10 md:pb-14">
      <Link 
        to="/feed"  
        style={{ fontFamily: '"Jersey 15", sans-serif' }}  
        className="text-white text-5xl md:text-7xl font-semibold cursor-pointer"
      >
        CO-OP
      </Link>
      
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
              <img
                src="/userBranco.png"
                alt="User Avatar"
                className="w-11 h-10 rounded-full object-cover"
              />
            )}
          </Link>
          
          {/* Botão de notificações com badge */}
          <button 
            onClick={() => setOpenModal(!openModal)} 
            className="relative"
          >
            <img
              src={
                openModal
                  ? "/notification_selected.png"
                  : "/notification_not_selected.png"
              }
              alt="Notificações"
              className="w-7 h-7"
            />
            
            {/* Badge com contador de notificações NÃO LIDAS */}
            {unreadCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                {formatNotificationCount(unreadCount)}
              </span>
            )}
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