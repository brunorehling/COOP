import { useEffect, useState } from 'react'
import type { User } from '../../utils/UserType'
import { authControllerGetProfile } from '../../api/orval/auth/auth'
import { Cabecalho2 } from '../Cabecalho2'
import { Navegacao } from '../Navegacao'
import { UserInfo } from './cabecalho_user_card'
import { UserDescription } from './UserDescription'

export function UserProfile() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    async function fetchUser() {
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          console.error('Token não encontrado')
          setUser(null)
          return
        }

        const response = await authControllerGetProfile({
          headers: { Authorization: `Bearer ${token}` },
        })

        console.log('Usuário retornado pela API:', response.data) // <-- aqui dentro

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

  if (!user) return <p>Usuário não encontrado</p>

  return (
    <>
      <Cabecalho2 />
      <Navegacao />
      <div className="flex flex-col text-white justify-center items-center mt-[5%] h-full">
        <h1 className="text-3xl mb-4">Perfil do Usuário</h1>
        <div className='flex text-white justify-between items-center mt-[5%] bg-[#3C4860] rounded-t-xl w-[80vw] h-[20vh]'>
            <UserInfo owner={user} />
            <ul className='flex flex-col gap-5'>
              <li className='flex'>
                <p className='text-[#E64EEB] font-bold'>email : </p>
                <p>{user.email} exemplo</p>
              </li>
              <li className='flex'>
                <p className='text-[#E64EEB] font-bold'>telefone : </p>
                <p>{user.phone} exemplo</p>
              </li>
              <li className='flex'>
                <p className='text-[#E64EEB] font-bold'>Função : </p>
                <p className='text-white'>{user.role}</p>
              </li>
            </ul>
        </div>
        <UserDescription />
      </div>
    </>
  )
}
