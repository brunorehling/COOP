interface UserInfoProps {
  owner?: {
    username: string
    role: string
    avatarUrl?: string
  }
  user?: {
    username: string
    email: string
    phone?: string
    role: string
    avatarUrl?: string
  }
}

export function UserInfo({ owner, user }: UserInfoProps) {
  const data = owner || user
  if (!data) return null

  const isProfilePage = !!user // se tem user, estamos no perfil

  return (
    <div className={`flex items-center gap-5 bg-[#3C4860] rounded-t-xl px-4 py-2 ${ isProfilePage ? "w-[60vw] justify-between" : "w-[25vw]"  }`}>
      <img
        src={data.avatarUrl || '/foto_perfil.jpg'}
        alt={data.username}
        className="w-14 h-14 rounded-full object-cover"
      />

      {/* --- FEED (owner) --- */}
      {!isProfilePage && (
        <div>
          <h1 className="text-3xl text-white underline decoration-[#e64eeb] font-semibold">
            {data.username}
          </h1>
          <p className="text-xl text-gray-300">{data.role}</p>
        </div>
      )}

      {/* --- PERFIL (user completo) --- */}
      {isProfilePage && (
        <div className="flex text-white justify-between items-center h-[18vh] px-6">
          <ul className="flex flex-col gap-3">
            <li className="flex gap-2">
              <p className="text-[#E64EEB] font-bold">Email:</p>
              <p>{user.email}</p>
            </li>

            <li className="flex gap-2">
              <p className="text-[#E64EEB] font-bold">Telefone:</p>
              <p>{user.phone || 'Não informado'}</p>
            </li>

            <li className="flex gap-2">
              <p className="text-[#E64EEB] font-bold">Função:</p>
              <p>{user.role}</p>
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}
