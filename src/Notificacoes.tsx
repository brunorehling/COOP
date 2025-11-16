import { useEffect, useRef } from "react"


interface Props {
  open: boolean
  onClose: () => void
}

export function NotificationModal({ open, onClose }: Props) {
  const ref = useRef<HTMLDivElement | null>(null)

  const mock = [
    {
      id: 1,
      title: "Solicitação de Participação",
      author: "Matheus Castro",
      message: "quer participar do seu projeto!",
      time: "20:04",
    },
    {
      id: 2,
      title: "Solicitação de Participação",
      author: "Manuel Silveira",
      message: "quer participar do seu projeto!",
      time: "20:04",
    },
    {
      id: 3,
      title: "Projeto publicado",
      message: "Seu projeto foi publicado com sucesso!",
      time: "19:43",
    },
  ]

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose()
      }
    }

    if (open) document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [open])

  if (!open) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <div
        ref={ref}
        className="
          pointer-events-auto
          absolute
          top-20
          right-14
          w-96
          bg-[#2f3a52]
          rounded-xl
          shadow-lg
          border border-[#3d475f]
          p-4
        "
      >
        <h2 className="text-white font-semibold mb-3 text-lg">Notificações</h2>

        <div className="space-y-3">
          {mock.map((n) => (
            <div
              key={n.id}
              className="
                w-full
                bg-[#364159]
                rounded-xl
                p-4
                flex
                justify-between
                items-start
                text-white
              "
            >
              <div>
                <p className="font-medium">{n.title}</p>
                {n.author && (
                  <p className="text-pink-400 text-sm">{n.author}</p>
                )}
                <p className="text-gray-300 text-sm">{n.message}</p>
              </div>

              <span className="text-gray-400 text-sm">{n.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
