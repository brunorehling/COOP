import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FormContainer } from './components/FormContainer'
import { Link, useNavigate } from 'react-router-dom'
import { fetchMutator } from './api/orval/mutator'

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
      const res = await fetchMutator({
        url: '/auth/login',
        method: 'POST',
        body: data,
      })

      const token = res.access_token
      if (!token) throw new Error('Token não retornado pelo servidor')

      localStorage.setItem('token', token)
      localStorage.setItem('clienteKey', '8')

      console.log('Usuário logado:', res)
      navigate('/feed')
    } catch (err: any) {
      setError('Erro ao logar')
    } finally {
      setLoading(false)
    }
  })

  return (
      <FormContainer title="Entrar" onSubmit={onSubmit} isLoading={loading} submitLabel="Entrar">
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <div className="flex flex-col">
          <label>Email ou usuário</label>
          <input
            type="text"
            {...register('usernameOrEmail', { required: true })}
            className="border p-2 rounded"
          />
        </div>

        <div className="flex flex-col">
          <label>Senha</label>
          <input
            type="password"
            {...register('password', { required: true })}
            className="border p-2 rounded"
          />
        </div>

        <p className="text-sm text-center mt-2">
          Não tem conta?{' '}
          <Link to="/cadastro" className="text-pink-500 hover:underline">
            Cadastre-se
          </Link>
        </p>
      </FormContainer>
  )
}
