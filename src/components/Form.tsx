import type { UsuarioType } from '../utils/UsuarioType';
import { useForm } from 'react-hook-form';

type AuthFormProps = {
  tipo: 'login' | 'cadastro' ;
  usuario?: UsuarioType;
};

function AuthForm({ tipo, usuario }: AuthFormProps) {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UsuarioType>({
    defaultValues: usuario || {}, 
  });

  const onSubmit = (data: UsuarioType) => {
    console.log('Dados do formulário:', data);
  };

   if (tipo === 'login') {
    return (
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md mx-auto bg-white p-10 rounded-md shadow-md flex flex-col gap-6"
      >
        <h2 className="text-center text-2xl font-semibold text-gray-800">Entrar</h2>

        <div className="flex flex-col">
          <label className="text-sm text-gray-600 mb-1">Nome de Usuário ou Email</label>
          <input
            type="text"
            placeholder="Digite aqui..."
            {...register('email', { required: 'Campo obrigatório' })}
            className="px-4 py-2 border border-pink-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          {errors.email && <span className="text-sm text-red-500">{errors.email.message}</span>}
        </div>

        <div className="flex flex-col">
          <div className="flex justify-between items-center">
            <label className="text-sm text-gray-600 mb-1">Senha</label>
            <a href="/esqueci-senha" className="text-sm text-pink-500 hover:underline">
              Esqueceu a senha?
            </a>
          </div>
          <input
            type="password"
            placeholder="Digite aqui..."
            {...register('senha', { required: 'Campo obrigatório' })}
            className="px-4 py-2 border border-pink-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          {errors.senha && <span className="text-sm text-red-500">{errors.senha.message}</span>}
        </div>

        <button
          type="submit"
          className="bg-pink-500 hover:bg-pink-600 text-white py-2 rounded-full transition"
        >
          Entrar
        </button>

        <p className="text-center text-sm text-gray-600">
          Novo por aqui?{' '}
          <a href="/cadastro" className="text-pink-500 hover:underline font-medium">
            Cadastre-se
          </a>
        </p>
      </form>
    );
  }
}

export default AuthForm;