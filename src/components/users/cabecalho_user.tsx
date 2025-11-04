import type { Project } from "../../utils/projectType"
interface UserInfoProps {
  owner: Project["owner"]
}

export function UserInfo({ owner }: UserInfoProps) {
  return (
    <div className="flex items-center gap-4 px-4 py-2 ">
      <img
        src="/foto_perfil.jpg" 
        alt={owner.username}
        className="w-14 h-14 rounded-full object-cover"
      />
      <div>
        <h1 className="text-3xl text-white underline decoration-[#e64eeb] font-semibold">{owner.username}</h1>
        <p className="text-xl text-gray-300">{owner.role}</p>
      </div>
    </div>
  )
}
