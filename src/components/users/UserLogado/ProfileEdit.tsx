import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { usersControllerUpdate, usersControllerFindOne } from '../../../api/orval/users/users' 
import type { User } from '../../../utils/UserType' 
import type { RegisterDtoRole } from '../../../api/orval/coopApi.schemas'

const CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME        
const UPLOAD_PRESET = import.meta.env.VITE_UPLOAD_PRESET  

export function UserProfileEdit() {
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const userId = localStorage.getItem("userId")

  if (!token) return <p>Usuário não logado</p>
  if (!userId) return <p>Usuário não identificado</p>

  const [userData, setUserData] = useState<User | null>(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [role, setRole] = useState<RegisterDtoRole>('frontend') // Adicione o tipo correto aqui
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)

  // Carregar dados do usuário
  useEffect(() => {
    async function fetchUser() {
      if (!userId){
          return
      }
      try {
        setLoading(true)
        // Usando a função do Orval
        const response = await usersControllerFindOne(userId)
        
        if (response.status === 200 && response.data) {
          const data = response.data as User
          setUserData(data)
          setName(data.username || '')
          setEmail(data.email || '')
          setPhone(data.phone || '')
          setRole(data.role || 'frontend')
          setAvatarPreview(data.avatarUrl || null)
          console.log('✅ Dados do usuário carregados:', data)
        } else {
          console.error('Erro ao carregar perfil:', response)
        }
      } catch (err) {
        console.error("Erro ao carregar perfil:", err)
        alert('Erro ao carregar dados do perfil')
      } finally {
        setLoading(false)
      }
    }
    fetchUser()
  }, [userId])

  function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    
    // Verificar tamanho do arquivo (opcional)
    if (file.size > 5 * 1024 * 1024) { // 5MB
      alert('A imagem deve ter menos de 5MB')
      return
    }
    
    setAvatarFile(file)
    setAvatarPreview(URL.createObjectURL(file))
  }

  async function uploadToCloudinary(file: File): Promise<string> {
    const data = new FormData()
    data.append("file", file)
    data.append("upload_preset", UPLOAD_PRESET)
    
    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
        method: "POST",
        body: data
      })
      
      if (!res.ok) {
        throw new Error('Falha no upload da imagem')
      }
      
      const json = await res.json()
      return json.secure_url
    } catch (error) {
      console.error('Erro no upload:', error)
      throw new Error('Não foi possível fazer upload da imagem')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!name.trim() || !email.trim()) {
      alert('Nome e email são obrigatórios')
      return
    }
    
    setSaving(true)

    try {
      let avatarUrl = userData?.avatarUrl || ''
      
      // Se tiver um novo arquivo, faz upload
      if (avatarFile) {
        avatarUrl = await uploadToCloudinary(avatarFile)
      }
      
      // Se não tiver novo arquivo e não tiver avatarUrl existente, mantém vazio
      if (!avatarFile && !userData?.avatarUrl) {
        avatarUrl = ''
      }

      // Usando a função do Orval para atualizar
      await usersControllerUpdate(
        userId,
        { 
          username: name, 
          email, 
          phone: phone || undefined, // Envia undefined se estiver vazio
          role, 
          avatarUrl: avatarUrl || undefined 
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )

      alert('Perfil atualizado com sucesso!')
      navigate('/perfil')
    } catch (err: any) {
      console.error("Erro ao salvar perfil:", err)
      alert(err.message || 'Erro ao salvar perfil.')
    } finally {
      setSaving(false)
    }
  }

  // Estado de carregamento
  if (loading) {
    return (
      <div className="w-full flex flex-col items-center justify-center pt-20 px-4 text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#E64EEB]"></div>
        <p className="mt-4">Carregando perfil...</p>
      </div>
    )
  }

  return (
    <div className="w-full flex flex-col items-center pt-10 px-4 text-white">
      <h1 className="text-3xl font-bold mb-10">Editar Perfil</h1>

      <form onSubmit={handleSubmit} className="w-full max-w-[850px] flex flex-col gap-10">
        {/* Avatar */}
        <div className="flex flex-col md:flex-row md:items-center gap-10 md:gap-16 justify-center w-full">
          <div className="flex flex-col items-center">
            <input
              type="file"
              accept="image/*"
              id="avatarInput"
              className="hidden"
              onChange={handleAvatarChange}
            />
            <label
              htmlFor="avatarInput"
              className="w-[140px] h-[140px] rounded-full bg-[#D9D9D9] flex items-center justify-center text-black text-6xl cursor-pointer overflow-hidden border-2 border-gray-500 hover:border-[#E64EEB] transition"
              title="Clique para alterar a foto"
            >
              {avatarPreview ? (
                <img 
                  src={avatarPreview} 
                  alt="Preview do avatar" 
                  className="w-full h-full object-cover" 
                />
              ) : userData?.avatarUrl ? (
                <img 
                  src={userData.avatarUrl} 
                  alt="Avatar atual" 
                  className="w-full h-full object-cover" 
                />
              ) : (
                <span className="text-4xl">+</span>
              )}
            </label>
            <p className="text-gray-400 text-sm mt-2">
              {userData?.avatarUrl ? 'Clique para alterar a foto' : 'Adicionar foto'}
            </p>
          </div>

          {/* Inputs */}
          <div className="flex flex-col gap-6 w-full max-w-[350px]">
            <div className="flex flex-col gap-1">
              <label className="text-[#E64EEB] font-semibold">Nome *</label>
              <input
                type="text"
                className="p-3 rounded-lg bg-[#2D3D5B] text-white border border-gray-600 focus:border-[#E64EEB] focus:outline-none"
                value={name}
                onChange={e => setName(e.target.value)}
                required
                placeholder="Seu nome"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[#E64EEB] font-semibold">Email *</label>
              <input
                type="email"
                className="p-3 rounded-lg bg-[#2D3D5B] text-white border border-gray-600 focus:border-[#E64EEB] focus:outline-none"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                placeholder="seu@email.com"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[#E64EEB] font-semibold">Função (Role)</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as RegisterDtoRole)}
                className="p-3 rounded-lg bg-[#2D3D5B] text-white border border-gray-600 focus:border-[#E64EEB] focus:outline-none w-full"
              >
                <option value="frontend">Frontend Developer</option>
                <option value="backend">Backend Developer</option>
                <option value="ux">UX/UI Designer</option>
                <option value="tester">QA/Tester</option>
                <option value="data_scientist">Data Scientist</option>
                <option value="devops">DevOps</option>
                <option value="fullstack">Full Stack</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[#E64EEB] font-semibold">Telefone</label>
              <input
                type="tel"
                className="p-3 rounded-lg bg-[#2D3D5B] text-white border border-gray-600 focus:border-[#E64EEB] focus:outline-none"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="(00) 00000-0000"
              />
            </div>
          </div>
        </div>

        {/* Botões */}
        <div className="flex flex-col md:flex-row justify-center gap-4 mt-8">
          <button
            type="submit"
            disabled={saving}
            className="bg-[#E64EEB] px-8 py-3 rounded-xl text-white font-semibold disabled:opacity-50 hover:bg-[#d03ed4] transition flex items-center justify-center gap-2"
          >
            {saving ? (
              <>
                <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                Salvando...
              </>
            ) : 'Salvar Alterações'}
          </button>

          <button
            type="button"
            className="bg-[#2D3D5B] px-8 py-3 rounded-xl text-white font-semibold hover:bg-[#364159] transition"
            onClick={() => navigate('/perfil')}
          >
            Descartar Alterações
          </button>
        </div>
      </form>
    </div>
  )
}