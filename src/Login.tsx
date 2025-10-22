import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FormContainer } from './components/FormContainer'
import { Link, useNavigate } from 'react-router-dom'
import { getAuth } from './api/orval/auth/auth'



const myApi = getAuth()

type LoginData = {
  usernameOrEmail: string
  password: string
}

export function Login() {
  const { register, handleSubmit } = useForm<LoginData>()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true)
    setError('')
    try {
      const res = await myApi.authControllerLogin({ usernameOrEmail: data.usernameOrEmail, password: data.password })
      console.log('Usuário logado:', res.data)
      navigate('/feed')
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao logar')
    } finally {
      setLoading(false)
    }
  })

  return (
    <section className='bg-[#212b41]'>
    <FormContainer title="Entrar" onSubmit={onSubmit} isLoading={loading} submitLabel="Entrar">
      {error && <p className="text-red-500 text-sm text-center">{error}</p>}

      <div className="flex flex-col">
        <label>Email</label>
        <input type="email" {...register('usernameOrEmail', { required: true })} className="border p-2 rounded" />
      </div>

      <div className="flex flex-col">
        <label>Senha</label>
        <input type="password" {...register('password', { required: true })} className="border p-2 rounded" />
      </div>

      <p className="text-sm text-center">
        Não tem conta?{' '}
        <Link to="/cadastro" className="text-pink-500 hover:underline">
          Cadastre-se
        </Link>
      </p>
    </FormContainer>
    </section>
  )
}
