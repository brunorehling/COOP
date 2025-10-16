import { useAuthControllerRegister } from './api/orval/auth/auth'
import Form from './components/Form'

function CadastroPage() {
    const registerMutation = useAuthControllerRegister()
  
    const handleRegister = (data: any) => {
      registerMutation.mutate(data, {
        onSuccess: () => {
          alert('Usuário registrado com sucesso!')
        },
        onError: (err: { message: string }) => {
          alert('Erro ao registrar: ' + err.message)
        }
      })
    }
  
    return <Form tipo="cadastro" onSubmit={handleRegister} />
  }
  