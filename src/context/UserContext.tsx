// context/UserContext.tsx
import { createContext, useContext, useState, useEffect } from 'react'
import type {ReactNode} from 'react'
import type { User } from '../utils/UserType'
import { usersControllerFindOne } from '../api/orval/users/users'

interface UserContextType {
  user: User | null
  loading: boolean
  refreshUser: () => Promise<void>
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchUser = async () => {
    try {
      const userId = localStorage.getItem('userId')
      if (!userId) {
        setUser(null)
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
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUser()
  }, [])

  const refreshUser = async () => {
    setLoading(true)
    await fetchUser()
  }

  return (
    <UserContext.Provider value={{ user, loading, refreshUser }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}