import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FormContainer } from './components/FormContainer'
import { Link, useNavigate } from 'react-router-dom'
import { fetchMutator } from './api/orval/mutator'

type LoginData = {
  username: string,
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
      const res = await fetchMutator({
        url: '/auth/login',
        method: 'POST',
        body: data,
      })

      const token = res.access_token
      if (!token) throw new Error('Token não retornado pelo servidor')

      localStorage.setItem('token', token)
      localStorage.setItem('clienteKey', '8')
      localStorage.setItem('userId', res.user.id)
      localStorage.setItem("username", res.user.username);

      console.log('Usuário logado:', res)
      navigate('/feed')
    } catch (err: any) {
      setError('Erro ao logar')
    } finally {
      setLoading(false)
    }
    console.log("DATA LOGIN:", data);
  })

  return (
    <div className="flex flex-col items-center justify-start min-h-[80vh] pt-10 px-4 gap-10">
      <div className='flex flex-col gap-5'>
        <h1 style={{ fontFamily: '"Jersey 15", sans-serif' }} className="text-white text-5xl md:text-7xl font-semibold text-center">CO-OP</h1>
        <h2 className="text-white text-2xl mt-2 text-center">Que bom ver você de volta!</h2>
      </div>
      <div className="w-full max-w-md mt-8">
        <FormContainer title="Entrar" onSubmit={onSubmit} isLoading={loading} submitLabel="Entrar">
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <div className="flex flex-col mb-4">
            <label className="mb-1 font-semibold">Email ou usuário</label>
            <input
              type="text"
              {...register('usernameOrEmail', { required: true })}
              className="border p-2 rounded bg-[rgba(230,78,235,0.15)]"
            />
          </div>

          <div className="flex flex-col mb-4">
            <label className="mb-1 font-semibold">Senha</label>
            <input
              type="password"
              {...register('password', { required: true })}
              className="border p-2 rounded bg-[rgba(230,78,235,0.15)]"
            />
          </div>

          <p className="text-sm text-center mt-2">
            Não tem conta?{' '}
            <Link to="/cadastro" className="text-pink-500 hover:underline">
              Cadastre-se
            </Link>
          </p>
        </FormContainer>
      </div>
    </div>
  )
}
