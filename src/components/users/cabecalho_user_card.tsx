interface UserInfoProps {
  owner?: {
    username: string
    role: string
    avatarUrl?: string
  }
  user?: {
    username: string
    email : string
    role: string
    avatarUrl?: string
  }
}

export function UserInfo({ owner, user }: UserInfoProps) {
  const data = owner || user

  if (!data) return null

  return (
    <div className="flex items-center gap-4 px-4 py-2">
      <img
        src={data.avatarUrl || '/foto_perfil.jpg'}
        alt={data.username}
        className="w-14 h-14 rounded-full object-cover"
      />
      <div>
        <h1 className="text-3xl text-white underline decoration-[#e64eeb] font-semibold">
          {data.username}
        </h1>
        <p className="text-xl text-gray-300">{data.role}</p>
      </div>
    </div>
  )
}
