import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { usersControllerUpdate } from '../../../api/orval/users/users' 
import type { User } from '../../../utils/UserType' 

const CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME        
const UPLOAD_PRESET = import.meta.env.VITE_UPLOAD_PRESET  
const userId = localStorage.getItem("userId")

export function UserProfileEdit() {
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  if (!token) return <p>Usuário não logado</p>

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [role, setRole] = useState('')
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  // Carregar dados do usuário
  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch(`/api/users/${userId}`, { // ou sua função de API
          headers: { Authorization: `Bearer ${token}` }
        })
        const data: User = await res.json()
        setName(data.username)
        setEmail(data.email)
        setPhone(data.phone || '')
        setRole(data.role || '')
        setAvatarPreview(data.avatarUrl || null)
      } catch (err) {
        console.error("Erro ao carregar perfil:", err)
      }
    }
    fetchUser()
  }, [token])

  function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setAvatarFile(file)
    setAvatarPreview(URL.createObjectURL(file))
  }

  async function uploadToCloudinary(file: File): Promise<string> {
    const data = new FormData()
    data.append("file", file)
    data.append("upload_preset", UPLOAD_PRESET)
    const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
      method: "POST",
      body: data
    })
    const json = await res.json()
    return json.secure_url
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      let avatarUrl = avatarPreview || ''
      if (avatarFile) avatarUrl = await uploadToCloudinary(avatarFile)

      await usersControllerUpdate(
        String(userId),
        { username: name, email, phone, role, avatarUrl },
        { headers: { Authorization: `Bearer ${token}` } }
      )

      alert('Perfil atualizado com sucesso!')
      navigate('/perfil')
    } catch (err) {
      console.error("Erro ao salvar perfil:", err)
      alert('Erro ao salvar perfil.')
    } finally {
      setSaving(false)
    }
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
              className="w-[140px] h-[140px] rounded-full bg-[#D9D9D9] flex items-center justify-center text-black text-6xl cursor-pointer overflow-hidden"
            >
              {avatarPreview ? (
                <img src={avatarPreview} className="w-full h-full object-cover" />
              ) : (
                "+"
              )}
            </label>
          </div>

          {/* Inputs */}
          <div className="flex flex-col gap-6 w-full max-w-[350px]">
            <div className="flex flex-col gap-1">
              <label className="text-[#E64EEB] font-semibold">Nome</label>
              <input
                type="text"
                className="p-2 rounded bg-[#DADADA] text-black"
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[#E64EEB] font-semibold">Email</label>
              <input
                type="email"
                className="p-2 rounded bg-[#DADADA] text-black"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[#E64EEB] font-semibold">Role</label>
              <select
                value={role}
                onChange={e => setRole(e.target.value)}
                className="p-2 rounded bg-[#DADADA] text-black w-full"
              >
                <option value="frontend">Frontend</option>
                <option value="backend">Backend</option>
                <option value="ux">UX</option>
                <option value="tester">Tester</option>
                <option value="data_scientist">Data Scientist</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[#E64EEB] font-semibold">Telefone</label>
              <input
                type="tel"
                className="p-2 rounded bg-[#DADADA] text-black"
                value={phone}
                onChange={e => setPhone(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Botões */}
        <div className="flex flex-row justify-center gap-6 mt-8">
          <button
            type="submit"
            disabled={saving}
            className="bg-[#E64EEB] px-6 py-3 rounded-xl text-white font-semibold disabled:opacity-50"
          >
            {saving ? 'Salvando...' : 'Salvar Alterações'}
          </button>

          <button
            type="button"
            className="bg-black px-6 py-3 rounded-xl text-white font-semibold"
            onClick={() => navigate('/perfil')}
          >
            Descartar
          </button>
        </div>
      </form>
    </div>
  )
}
