import AuthForm from './components/Form'

function FormLogin() {

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <AuthForm tipo="login" />
      </div>
    </>
  )
}

export default FormLogin
