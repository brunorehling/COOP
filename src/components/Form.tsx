import type { UsuarioType } from '../utils/UsuarioType'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

type AuthFormProps = {
  tipo: 'login' | 'cadastro'
  usuario?: UsuarioType
}

function AuthForm({ tipo, usuario }: AuthFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UsuarioType>({
    defaultValues: usuario || {},
  })

  const onSubmit = (data: UsuarioType) => {
    console.log('Dados do formulário:', data)
  }

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
              type="text"
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
              {...register('senha', { required: 'Campo obrigatório' })}
              className="px-4 py-2 border border-pink-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            {errors.senha && (
              <span className="text-sm text-red-500">{errors.senha.message}</span>
            )}
          </div>

          <button
            type="submit"
            className="bg-[#E64EEB] text-white py-2 rounded-full transition"
          >
            Entrar
          </button>

          <p className="text-center text-sm text-gray-600">
            Novo por aqui?{' '}
            <Link to="/cadastro" className="text-pink-500 hover:underline font-medium">
              Cadastre-se
            </Link>
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
            <label className="block text-gray-700 font-medium mb-1">Nome</label>
            <input
              type="text"
              {...register('nome', { required: 'Campo obrigatório' })}
              placeholder="Digite seu nome"
              className="w-full border border-gray-300 bg-pink-200 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-pink-600"
            />
            {errors.nome && <span className="text-sm text-red-500">{errors.nome.message}</span>}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              {...register('email', { required: 'Campo obrigatório' })}
              placeholder="Digite seu email"
              className="w-full border border-gray-300 bg-pink-200 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-pink-600"
            />
            {errors.email && <span className="text-sm text-red-500">{errors.email.message}</span>}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Telefone</label>
            <input
              type="tel"
              {...register('telefone', { required: 'Campo obrigatório' })}
              placeholder="(00) 00000-0000"
              className="w-full border border-gray-300 bg-pink-200 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-pink-600"
            />
            {errors.telefone && (
              <span className="text-sm text-red-500">{errors.telefone.message}</span>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Senha</label>
            <input
              type="password"
              {...register('senha', { required: 'Campo obrigatório' })}
              placeholder="Digite sua senha"
              className="w-full border border-gray-300 bg-pink-200 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-pink-600"
            />
            {errors.senha && <span className="text-sm text-red-500">{errors.senha.message}</span>}
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Repetir Senha</label>
            <input
              type="password"
              {...register('senha', { required: 'Campo obrigatório' })}
              placeholder="Digite sua senha"
              className="w-full border border-gray-300 bg-pink-200 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-pink-600"
            />
            {errors.senha && <span className="text-sm text-red-500">{errors.senha.message}</span>}
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
