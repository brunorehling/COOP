import { useNavigate } from 'react-router-dom'

interface UserInfoProps {
  owner?: {
    id: number
    username: string
    role: string
    avatarUrl?: string
  }
  user?: {
    id: number
    username: string
    email: string
    phone?: string
    role: string
    avatarUrl?: string
  }
}

export function UserInfo({ owner, user }: UserInfoProps) {
  const navigate = useNavigate()
  const data = owner || user
  if (!data) return null

  const isProfilePage = !!user

  const handleClick = () => {
    if (owner) {
      navigate(`/perfil/${owner.id}`)
    }
  }

  return (
    <div
      className={`flex items-center gap-5 bg-[#3C4860] rounded-t-xl px-5 py-3 ${
        isProfilePage ? ' w-[60vw]' : 'flex-shrink'
      }`}
    >
      <img
        src={data.avatarUrl || '/userBranco.png'}
        alt={data.username}
        className="w-14 h-14 rounded-full object-cover cursor-pointer"
        onClick={handleClick}
      />

      {!isProfilePage && owner && (
        <div onClick={handleClick} className="cursor-pointer">
          <h1 className="text-3xl text-white underline decoration-[#e64eeb] font-semibold">
            {owner.username}
          </h1>
          <p className="text-xl text-gray-300">{owner.role}</p>
        </div>
      )}

     {isProfilePage && user && (
        <div className="flex flex-wrap justify-between w-[50vw] items-center gap-5 ">
          <h1 className="text-3xl text-white underline decoration-[#e64eeb] font-semibold">
            {user.username}
          </h1>
          <ul className="flex flex-col gap-2 text-white">
            <li className="grid grid-cols-[90px_1fr] gap-2">
              <p className="text-[#E64EEB] font-bold">Email:</p>
              <p>{user.email || 'Não informado'}</p>
            </li>

            <li className="grid grid-cols-[90px_1fr] gap-2">
              <p className="text-[#E64EEB] font-bold">Telefone:</p>
              <p>{user.phone || 'Não informado'}</p>
            </li>

            <li className="grid grid-cols-[90px_1fr] gap-2">
              <p className="text-[#E64EEB] font-bold">Função:</p>
              <p>{user.role || 'Não informado'}</p>
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}
