import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { portfolioControllerCreate, portfolioControllerUpdate } from '../../../api/orval/portfolio/portfolio'
import TechSelector from '../../projects/SelecionarTech'
import type { Portfolio } from '../../../utils/PortifolioType'
import { usersControllerUpdate } from '../../../api/orval/users/users'

const CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME        
const UPLOAD_PRESET = import.meta.env.VITE_UPLOAD_PRESET  
const userId = localStorage.getItem("userId")

interface CreatePortfolioProps {
  portfolio?: Portfolio
}

export function CreatePortfolio({ portfolio }: CreatePortfolioProps) {
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  if (!token) return <p>Usuário não logado</p>

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [bio, setBio] = useState('')
  const [location, setLocation] = useState('')
  const [phone, setPhone] = useState('')
  const [skills, setSkills] = useState<string[]>([])
  const [role, setRole] = useState('')

  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)

  useEffect(() => {
    if (portfolio?.user) {
      setName(portfolio.user.username)
      setEmail(portfolio.user.email)
      setPhone(portfolio.user.phone || '')
      setRole(portfolio.user.role || '')
      setBio(portfolio.bio || '')
      setLocation(portfolio.location || '')
      setSkills(portfolio.skills || [])

      if (portfolio.user.avatarUrl) {
        setAvatarPreview(portfolio.user.avatarUrl)
      }
    }
  }, [portfolio])

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
      body: data,
    })

    const json = await res.json()
    return json.secure_url
  }

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()

  try {
    const normalizedPhone =
      phone.trim() === "" ? null : phone.trim()

    const skillsLower = skills.map(s => s.toLowerCase())

    let avatarUrl = portfolio?.user?.avatarUrl || ""
    if (avatarFile) {
      avatarUrl = await uploadToCloudinary(avatarFile)
    }

    // ===============================
    // 🔇 TODA LÓGICA DE PORTFÓLIO DESATIVADA
    // ===============================

    /*
    if (portfolio?.id) {
      await portfolioControllerUpdate(
        String(portfolio.id),
        {
          name,
          bio,
          location,
          phone: normalizedPhone,
          skills: skillsLower,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
    } else {
      await portfolioControllerCreate(
        {
          name,
          bio,
          location,
          phone: normalizedPhone,
          skills: skillsLower,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
    }
    */

    // ===============================
    // 👍 SOMENTE UPDATE DO USER
    // ===============================
    await usersControllerUpdate(
      String(userId),
      {
        username: name,
        email,
        phone: normalizedPhone,
        role,
        avatarUrl,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    )

    navigate('/perfil')
  } catch (error) {
    console.error("Erro:", error)
  }
}


  return (
    <div className="w-full flex flex-col items-center pt-10 px-4 text-white">
      <h1 className="text-3xl font-bold mb-10">
        {portfolio?.id ? 'Editar Perfil' : 'Criar Perfil'}
      </h1>

      <form onSubmit={handleSubmit} className="w-full max-w-[850px] flex flex-col gap-10">

        {/* Avatar */}
        <div className="flex flex-col md:flex-row md:items-start gap-10 md:gap-16 justify-center w-full">
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
              <label className="text-[#E64EEB] font-semibold">Local</label>
              <input
                type="text"
                className="p-2 rounded bg-[#DADADA] text-black"
                value={location}
                onChange={e => setLocation(e.target.value)}
              />
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

        {/* Bio */}
        <div className="flex flex-col items-center">
          <p className="text-lg font-semibold mb-4">Breve descrição sobre você</p>
          <textarea
            value={bio}
            onChange={e => setBio(e.target.value)}
            className="w-full max-w-[700px] min-h-[180px] p-4 rounded-xl bg-[#DADADA] text-black"
          />
        </div>

        {/* Skills */}
        <div className="flex flex-col items-center gap-6">
          <h2 className="text-xl font-semibold">Habilidades Técnicas</h2>
          <TechSelector onChange={setSkills} />
        </div>

        {/* Botões */}
        <div className="flex flex-row justify-center gap-6 mt-8">
          <button type="submit" className="bg-[#E64EEB] px-6 py-3 rounded-xl text-white font-semibold">
            Salvar Alterações
          </button>

          <button type="button" className="bg-black px-6 py-3 rounded-xl text-white font-semibold" onClick={() => navigate('/perfil')}>
            Descartar
          </button>
        </div>

      </form>
    </div>
  )
}
