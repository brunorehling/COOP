import type { ReactNode } from 'react'

type FormContainerProps = { 
  title: string 
  children: ReactNode
  onSubmit: () => void
  isLoading?: boolean
  submitLabel?: string
}

export function FormContainer({
  title,
  children,
  onSubmit,
  isLoading = false,
  submitLabel = 'Enviar',
}: FormContainerProps) {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          onSubmit()
        }}
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md space-y-4"
      >
        <h1 className="text-2xl font-semibold text-center text-gray-800">{title}</h1>
        {children}
        <button
          type="submit"
          className="w-full bg-[#E64EEB] text-white font-semibold py-2 rounded-lg transition disabled:opacity-50"
          disabled={isLoading}
        >
          {isLoading ? 'Carregando...' : submitLabel}
        </button>
      </form>
    </div>
  )
}
