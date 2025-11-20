import { useEffect, useRef, useState } from "react";
import { customFetcher } from "./api/fetcher";

interface Notification {
  id: number;
  title?: string;
  author?: string;
  message: string;
  createdAt: string;
  isRead: boolean;
}

interface Props {
  open: boolean;
  onClose: () => void;
}

export function NotificationModal({ open, onClose }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  
async function fetchNotifications() {
  try {
    const token = localStorage.getItem("token");

    // Aqui tipamos a resposta como um array de Notification
    const res = (await customFetcher("/notifications", {
      headers: { Authorization: token ? `Bearer ${token}` : "" },
    })) as { data: Notification[] };

    setNotifications(res.data || []);
  } catch (error) {
    console.error("Erro ao buscar notificações:", error);
  }
}


  useEffect(() => {
    if (open) fetchNotifications();

    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    }

    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  if (!open) return null;

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

        <div className="space-y-3 max-h-[400px] overflow-y-auto">
          {notifications.length === 0 && <p className="text-gray-300">Nenhuma notificação</p>}
          {notifications.map((n) => (
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
                {n.title && <p className="font-medium">{n.title}</p>}
                {n.author && <p className="text-pink-400 text-sm">{n.author}</p>}
                <p className="text-gray-300 text-sm">{n.message}</p>
              </div>
              <span className="text-gray-400 text-sm">
                {new Date(n.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
