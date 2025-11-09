import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FormContainer } from './components/FormContainer'
import { Link, useNavigate } from 'react-router-dom'
import { authControllerRegister } from './api/orval/auth/auth'
import { RegisterDtoRole } from './api/orval/coopApi.schemas'

type CadastroData = {
  username: string
  email: string
  phone: string
  password: string
  senhaConfirm: string
  role: keyof typeof RegisterDtoRole
}

export function Cadastro() {
  const { register, handleSubmit } = useForm<CadastroData>()
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
      const response = await authControllerRegister({
        username: data.username,
        email: data.email,
        phone: data.phone,
        password: data.password,
        role: data.role,
      })
  
      if (response.status === 201) {
        console.log('Usuário cadastrado')
        navigate('/login')
      } else if (response.status === 409) {
        setError('Username ou email já está em uso')
      } else {
        setError('Erro ao cadastrar')
      }
    } catch (err: any) {
      setError('Erro de conexão ou inesperado')
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
        <label>Telefone</label>
        <input
          type="text"
          {...register('phone', { required: true })}
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

      <div className="flex flex-col">
        <label>Função</label>
        <select
          {...register('role', { required: true })}
          className="border p-2 rounded"
        >
          <option value="">Selecione...</option>
          {Object.entries(RegisterDtoRole).map(([key, value]) => (
            <option key={key} value={value}>
              {value}
            </option>
          ))}
        </select>
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
