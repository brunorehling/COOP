import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FormContainer } from './components/FormContainer'
import { Link, useNavigate } from 'react-router-dom'
import { getAuth } from './api/orval/auth/auth'

const myApi = getAuth()

type CadastroData = {
  username: string
  email: string
  telefone: string
  password: string
  senhaConfirm: string
}

export function Cadastro() {
  const { register, handleSubmit} = useForm<CadastroData>()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true)
    setError('')

    if (data.password !== data.senhaConfirm) {
      setError('As senhas não coincidem')
      setLoading(false)
      return
    }

    try {
      await myApi.authControllerRegister({
        username: data.username,
        email: data.email,
        password: data.password,
      })
      console.log('Usuário cadastrado')
      navigate('/login')
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao cadastrar')
    } finally {
      setLoading(false)
    }
  })

  return (
    <FormContainer
      title="Cadastrar"
      onSubmit={onSubmit}
      isLoading={loading}
      submitLabel="Cadastrar"
    >
      {error && <p className="text-red-500 text-sm text-center">{error}</p>}

      <div className="flex flex-col">
        <label>Nome</label>
        <input
          type="text"
          {...register('username', { required: true })}
          className="border p-2 rounded"
        />
      </div>

      <div className="flex flex-col">
        <label>Email</label>
        <input
          type="email"
          {...register('email', { required: true })}
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

      <div className="flex flex-col">
        <label>Confirmar Senha</label>
        <input
          type="password"
          {...register('senhaConfirm', { required: true })}
          className="border p-2 rounded"
        />
      </div>

      <p className="text-sm text-center">
        Já tem conta?{' '}
        <Link to="/login" className="text-pink-500 hover:underline">
          Faça login
        </Link>
      </p>
    </FormContainer>
  )
}
