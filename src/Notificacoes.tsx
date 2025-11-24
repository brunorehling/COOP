import { useEffect, useRef, useState } from "react";
import { customFetcher } from "./api/fetcher";

export interface Notification {
  id: number;
  userId: number;
  type: string;
  content: string;
  projectId?: number | null;
  isRead: boolean;
  createdAt: string;
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

      const res = await customFetcher("/notifications", {
        headers: { Authorization: token ? `Bearer ${token}` : "" },
      });

      const data = (res as { data?: Notification[] }).data ?? [];
      setNotifications(data);
    } catch (error) {
      console.error("Erro ao buscar notificações:", error);
    }
  }

  useEffect(() => {
    if (!open) return;

    fetchNotifications();

    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
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
          {notifications.length === 0 && (
            <p className="text-gray-300">Nenhuma notificação</p>
          )}

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
                <p className="font-medium capitalize">{n.type}</p>

                <p
                  className="text-gray-300 text-sm"
                  dangerouslySetInnerHTML={{ __html: n.content }}
                />

                {n.projectId != null && (
                  <p className="text-blue-400 text-xs mt-1">
                    Projeto: {n.projectId}
                  </p>
                )}
              </div>

              <span className="text-gray-400 text-sm">
                {new Date(n.createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
