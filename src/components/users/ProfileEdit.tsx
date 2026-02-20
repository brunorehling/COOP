import { useEffect, useState } from 'react'
import type { User } from '../../utils/UserType'
import { authControllerGetProfile } from '../../api/orval/auth/auth'
import { usersControllerUpdate } from '../../api/orval/users/users'
import { Cabecalho2 } from '../Cabecalho2'
import { Navegacao } from '../Navegacao'

type UserFormData = {
  username: string
  email: string
  phone: string
  role: User['role']
  avatarUrl: string
}

export function UserProfileEdit() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState<UserFormData>({
    username: '',
    email: '',
    phone: '',
    role: 'frontend',
    avatarUrl: '',
  })

  useEffect(() => {
    async function fetchUser() {
      try {
        const token = localStorage.getItem('token')
        const userId = localStorage.getItem('userId')
        if (!token || !userId) {
          setError('Token ou ID não encontrado')
          setLoading(false)
          return
        }

        const response = await authControllerGetProfile({
          headers: { Authorization: `Bearer ${token}` },
        })

        if (response.status === 200 && response.data) {
          const fetched = response.data as User
          setUser(fetched)
          setFormData({
            username: fetched.username || '',
            email: fetched.email || '',
            phone: fetched.phone || '',
            role: fetched.role || 'frontend',
            avatarUrl: fetched.avatarUrl || '',
          })
        } else {
          setError('Não foi possível obter o perfil.')
        }
      } catch {
        setError('Erro ao carregar o perfil.')
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [])

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const name = e.target.name as keyof UserFormData
    const value = e.target.value
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError(null)

    try {
      const token = localStorage.getItem('token')
      const userId = localStorage.getItem('userId')
      if (!token || !userId) throw new Error('Token ou ID não encontrado')

      console.log('enviando:', formData)

      await usersControllerUpdate(userId, formData, {
        headers: { Authorization: `Bearer ${token}` },
      })

      setUser((prev) => (prev ? { ...prev, ...formData } : prev))
      alert('Perfil atualizado com sucesso!')
    } catch (err) {
      console.error(err)
      setError('Erro ao salvar alterações.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="text-white text-center mt-10">Carregando perfil...</div>
    )
  }

  return (
    <>
      <Cabecalho2 />
      <Navegacao />

      <div className="flex flex-col items-center mt-[5%] text-white">
        <h1 className="text-3xl mb-6">Editar Perfil</h1>

        {error && <p className="text-red-400 mb-4">{error}</p>}

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6 bg-[#3C4860] p-8 rounded-3xl w-[70vw] max-w-[800px]"
        >
          <div className="flex flex-col gap-3">
            <label className="text-[#E64EEB] font-semibold">Nome de usuário</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="p-2 rounded bg-[#2C384E] text-white outline-none"
            />
          </div>

          <div className="flex flex-col gap-3">
            <label className="text-[#E64EEB] font-semibold">E-mail</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="p-2 rounded bg-[#2C384E] text-white outline-none"
            />
          </div>

          <div className="flex flex-col gap-3">
            <label className="text-[#E64EEB] font-semibold">Telefone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="p-2 rounded bg-[#2C384E] text-white outline-none"
            />
          </div>

          <div className="flex flex-col gap-3">
            <label className="text-[#E64EEB] font-semibold">Função</label>
            <select
              name="role"
              value={formData.role}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  role: e.target.value as User['role'],
                }))
              }
              className="p-2 rounded bg-[#2C384E] text-white outline-none"
            >
              <option value="frontend">Frontend</option>
              <option value="backend">Backend</option>
              <option value="data_scientist">Data Scientist</option>
              <option value="ux">UI/UX</option>
              <option value="tester">Tester</option>
            </select>
          </div>

          <div className="flex flex-col gap-3">
            <label className="text-[#E64EEB] font-semibold">Foto de perfil (URL)</label>
            <input
              type="text"
              name="avatarUrl"
              value={formData.avatarUrl}
              onChange={handleChange}
              className="p-2 rounded bg-[#2C384E] text-white outline-none"
            />
            {formData.avatarUrl && (
              <img
                src={formData.avatarUrl}
                alt="Prévia da foto"
                className="w-[120px] h-[120px] rounded-full object-cover mt-3 border-2 border-[#E64EEB]"
              />
            )}
          </div>

          <button
            type="submit"
            disabled={saving}
            className="bg-[#E64EEB] hover:bg-[#d33dda] transition-colors text-white font-bold py-2 px-4 rounded-xl mt-4 disabled:opacity-50"
          >
            {saving ? 'Salvando...' : 'Salvar Alterações'}
          </button>
        </form>
      </div>
    </>
  )
}
