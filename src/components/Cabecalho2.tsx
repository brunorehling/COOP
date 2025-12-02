// components/Cabecalho2.tsx
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useUser } from '../context/UserContext'
import { NotificationModal } from '../Notificacoes'
import { customFetcher } from '../api/fetcher'

export function Cabecalho2() {
  const { user } = useUser()
  const [openModal, setOpenModal] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)

  useEffect(() => {
    async function fetchUnreadNotifications() {
      try {
        const response = await customFetcher('/notifications/me') as any
        
        let userNotifications: any[] = []
        
        if (Array.isArray(response)) {
          userNotifications = response
        } else if (response && Array.isArray(response.data)) {
          userNotifications = response.data
        }
        
        const unread = userNotifications.filter((notif: any) => 
          notif.isRead === false
        ).length
        
        setUnreadCount(unread)
        
      } catch (error) {
        setUnreadCount(0)
      }
    }

    fetchUnreadNotifications()
    
    if (openModal) {
      fetchUnreadNotifications()
    }
    
    const interval = setInterval(fetchUnreadNotifications, 30000)
    return () => clearInterval(interval)
  }, [openModal])

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