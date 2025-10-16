import type { RegisterDto } from '../api/orval/model/registerDto'  // ajuste o caminho conforme seu projeto
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

type AuthFormProps = {
  tipo: 'login' | 'cadastro'
  usuario?: Partial<RegisterDto>  // opcional, para preencher campos no formulário
  onSubmit: (data: RegisterDto) => void
}

function AuthForm({ tipo, usuario, onSubmit }: AuthFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterDto>({
    defaultValues: usuario || {},
  })

  if (tipo === 'login') {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-md mx-auto bg-white p-10 rounded-md shadow-md flex flex-col gap-6"
        >
          <h2 className="text-center text-2xl font-semibold text-gray-800">Entrar</h2>

          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">Email</label>
            <input
              type="email"
              placeholder="Digite aqui..."
              {...register('email', { required: 'Campo obrigatório' })}
              className="px-4 py-2 border border-pink-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            {errors.email && (
              <span className="text-sm text-red-500">{errors.email.message}</span>
            )}
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">Senha</label>
            <input
              type="password"
              placeholder="Digite aqui..."
              {...register('password', { required: 'Campo obrigatório' })}
              className="px-4 py-2 border border-pink-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            {errors.password && (
              <span className="text-sm text-red-500">{errors.password.message}</span>
            )}
          </div>

          <button
            type="submit"
            className="bg-[#E64EEB] text-white py-2 rounded-full transition"
          >
            Entrar
          </button>

          <p className="flex justify-between text-center text-sm text-gray-600 ">
            Novo por aqui?{' '}
            <div className="flex gap-5">
              <Link to="/cadastro" className="text-pink-500 hover:underline font-medium">
                Cadastre-se
              </Link>
              <Link to="/land" className="text-pink-500 hover:underline font-medium">
                land
              </Link>
            </div>
          </p>
        </form>
      </div>
    )
  }

  if (tipo === 'cadastro') {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md space-y-4"
        >
          <h1 className="text-2xl font-semibold text-center text-gray-800">
            Cadastro de Usuário
          </h1>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Username</label>
            <input
              type="text"
              {...register('username', { required: 'Campo obrigatório', minLength: 3 })}
              placeholder="Digite seu nome de usuário"
              className="w-full border border-gray-300 bg-pink-200 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-pink-600"
            />
            {errors.username && (
              <span className="text-sm text-red-500">{errors.username.message}</span>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              {...register('email', { required: 'Campo obrigatório' })}
              placeholder="Digite seu email"
              className="w-full border border-gray-300 bg-pink-200 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-pink-600"
            />
            {errors.email && (
              <span className="text-sm text-red-500">{errors.email.message}</span>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Senha</label>
            <input
              type="password"
              {...register('password', { required: 'Campo obrigatório', minLength: 6 })}
              placeholder="Digite sua senha"
              className="w-full border border-gray-300 bg-pink-200 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-pink-600"
            />
            {errors.password && (
              <span className="text-sm text-red-500">{errors.password.message}</span>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-[#E64EEB] text-white font-semibold py-2 rounded-lg transition"
          >
            Cadastrar
          </button>

          <p className="text-center text-sm text-gray-600 mt-4">
            Já tem conta?{' '}
            <Link to="/login" className="text-pink-600 hover:underline font-medium">
              Faça login
            </Link>
          </p>
        </form>
      </div>
    )
  }

  return null
}

export default AuthForm
