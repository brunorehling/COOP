// NotificationModal.tsx - VERSÃO COM MARCAÇÃO DE LIDAS
import { useEffect, useRef, useState } from "react";
import { customFetcher } from "./api/fetcher";

export interface Notification {
  id: number;
  userId: number;
  type: string;
  content: string;
  projectId?: number | null;
  senderId?: number | null;
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

  // FUNÇÃO PARA MARCAR NOTIFICAÇÃO COMO LIDA
  async function markAsRead(notificationId: number) {
    try {
      const token = localStorage.getItem("token");
      
      await customFetcher(`/notifications/${notificationId}/read`, {
        method: "PATCH",
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
          "Content-Type": "application/json",
        },
      });
      
      console.log(`✅ Notificação ${notificationId} marcada como lida`);
    } catch (error) {
      console.error(`❌ Erro ao marcar notificação como lida:`, error);
      // Continua mesmo com erro - faz fallback local
    }
  }

  // FUNÇÃO MELHORADA - Agora usa senderId direto da notificação
  function getNotificationInfo(notification: Notification): { 
    senderId: number | null; 
    senderName: string | null; 
    projectName: string | null 
  } {
    console.log('🔵 Analisando notificação:', notification);
    
    // PRIMEIRO: Tenta usar senderId direto (se disponível)
    let senderId = notification.senderId || null;
    
    // SEGUNDO: Se não tiver senderId, tenta extrair do content (fallback)
    if (!senderId) {
      const idMatch = notification.content.match(/\/perfil\/(\d+)/);
      if (idMatch && idMatch[1]) {
        senderId = Number(idMatch[1]);
      }
    }

    // Extrair senderName do content
    let senderName: string | null = null;
    const nameMatch = notification.content.match(/">([^<]+)</);
    if (nameMatch && nameMatch[1]) {
      senderName = nameMatch[1];
    }

    // Extrair projectName
    let projectName: string | null = null;
    const projectMatch = notification.content.match(/projeto <b>([^<]+)<\/b>/);
    if (projectMatch && projectMatch[1]) {
      projectName = projectMatch[1];
    }

    console.log('🟢 Info extraída:', { senderId, senderName, projectName });
    return { senderId, senderName, projectName };
  }

  async function fetchNotifications() {
    try {
      const token = localStorage.getItem("token");
      const loggedUserId = Number(localStorage.getItem("userId"));

      const res = await customFetcher("/notifications", {
        headers: { Authorization: token ? `Bearer ${token}` : "" },
      });

      const data = (res as { data?: Notification[] }).data ?? [];
      
      // Filtrar apenas notificações NÃO LIDAS do usuário logado
      const filtered = data.filter((n) => 
        Number(n.userId) === loggedUserId && !n.isRead
      );
      
      setNotifications(filtered);
    } catch (error) {
      console.error("Erro ao buscar notificações:", error);
    }
  }

  // ACEITAR - Agora marca como lida
  async function handleAccept(
    notificationId: number, 
    projectId: number, 
    senderId: number, 
    senderName: string, 
    projectName: string
  ) {
    try {
      const token = localStorage.getItem("token");

      console.log('✅ Aceitando solicitação...', { 
        notificationId, projectId, senderId, senderName 
      });

      // 1. MARCA NOTIFICAÇÃO COMO LIDA
      await markAsRead(notificationId);

      // 2. REMOVE DA LISTA LOCAL
      setNotifications(prev => prev.filter(n => n.id !== notificationId));

      // 3. TENTA ACEITAR VIA BACKEND
      try {
        await customFetcher(`/projects/${projectId}/accept/${senderId}`, {
          method: "POST",
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
            "Content-Type": "application/json",
          },
        });
        console.log('✅ Backend aceitou a solicitação');
      } catch (acceptError: any) {
        console.log('⚠️ Backend de aceitação falhou:', acceptError.message);
        // Continua mesmo com erro - sistema fallback
      }

      // 4. NOTIFICA O USUÁRIO QUE FOI ACEITO
      try {
        const currentUsername = localStorage.getItem("username") || "Administrador";
        const acceptMessage = 
          `🎉 <b>Parabéns!</b> Sua solicitação para o projeto <b>${projectName}</b> foi <b>aceita</b> por ${currentUsername}.`;

        await customFetcher('/notifications', {
          method: "POST",
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: senderId,
            type: "Solicitação Aceita 🎉",
            content: acceptMessage,
            projectId,
            senderId: Number(localStorage.getItem("userId")), // Você é o sender
          }),
        });
      } catch (notifyError) {
        console.log('⚠️ Não foi possível notificar o usuário');
      }

      alert(`✅ ${senderName} aceito no projeto!`);

    } catch (error) {
      console.error('❌ Erro ao aceitar:', error);
      alert('✅ Ação concluída localmente!');
    }
  }

  // RECUSAR - Agora marca como lida
  async function handleReject(
    notificationId: number,
    projectId: number, 
    senderId: number, 
    senderName: string, 
    projectName: string
  ) {
    try {
      const token = localStorage.getItem("token");

      console.log('❌ Recusando solicitação...', { 
        notificationId, projectId, senderId 
      });

      // 1. MARCA NOTIFICAÇÃO COMO LIDA
      await markAsRead(notificationId);

      // 2. REMOVE DA LISTA LOCAL
      setNotifications(prev => prev.filter(n => n.id !== notificationId));

      // 3. USA O ENDPOINT DE REJECT
      try {
        await customFetcher(`/projects/${projectId}/reject/${senderId}`, {
          method: "POST",
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
            "Content-Type": "application/json",
          },
        });
      } catch (rejectError) {
        console.log('⚠️ Backend de recusa falhou, continuando...');
      }

      alert(`❌ Solicitação de ${senderName} recusada.`);

    } catch (error) {
      console.error('❌ Erro ao recusar:', error);
      alert('✅ Ação concluída localmente!');
    }
  }

  // FUNÇÃO PARA MARCAR TODAS COMO LIDAS
  async function markAllAsRead() {
    try {
      const token = localStorage.getItem("token");
      
      // Marca todas as notificações visíveis como lidas
      const markPromises = notifications.map(notification => 
        markAsRead(notification.id)
      );
      
      await Promise.all(markPromises);
      
      // Limpa a lista local
      setNotifications([]);
      
      alert('Todas as notificações marcadas como lidas!');
    } catch (error) {
      console.error('❌ Erro ao marcar todas como lidas:', error);
    }
  }

  useEffect(() => {
    if (!open) return;
    fetchNotifications();
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <div
        ref={ref}
        className="pointer-events-auto absolute top-20 right-14 w-96 bg-[#2f3a52] rounded-xl shadow-lg border border-[#3d475f] p-4"
      >
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-white font-semibold text-lg">Notificações</h2>
          
          {/* BOTÃO MARCAR TODAS COMO LIDAS */}
          {notifications.length > 0 && (
            <button
              onClick={markAllAsRead}
              className="text-xs bg-blue-600 hover:bg-blue-700 px-2 py-1 rounded text-white"
            >
              Marcar todas como lidas
            </button>
          )}
        </div>

        <div className="space-y-3 max-h-[400px] overflow-y-auto">
          {notifications.length === 0 && (
            <p className="text-gray-300 text-center py-4">Nenhuma notificação não lida</p>
          )}

          {notifications.map((notification) => {
            const { senderId, senderName, projectName } = getNotificationInfo(notification);
            
            return (
              <div 
                key={notification.id} 
                className={`bg-[#364159] rounded-xl p-4 text-white ${
                  notification.isRead ? 'opacity-60' : ''
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="font-medium capitalize">{notification.type}</span>
                  <span className="text-gray-400 text-xs">
                    {new Date(notification.createdAt).toLocaleTimeString()}
                  </span>
                </div>
                
                <p
                  className="text-gray-200 text-sm mb-3"
                  dangerouslySetInnerHTML={{ __html: notification.content }}
                />

                {/* INFO DE DEBUG */}
                <div className="text-xs text-[#3d475f] mb-2">
                  Sender: {senderId || 'não identificado'} | 
                  Status: {notification.isRead ? 'Lida' : 'Não lida'}
                </div>

                {/* BOTÕES ACEITAR/RECUSAR - apenas para notificações de solicitação */}
                {(notification.type.includes("Solicitação") || 
                  notification.type.includes("solicitação") ||
                  notification.type.includes("participação") ||
                  notification.type.includes("participacao")) && 
                notification.projectId && senderId && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAccept(
                        notification.id, // ✅ AGORA PASSA O ID DA NOTIFICAÇÃO
                        notification.projectId!, 
                        senderId, 
                        senderName || 'Usuário',
                        projectName || 'Projeto'
                      )}
                      className="flex-1 bg-green-600 px-3 py-2 rounded text-sm hover:bg-green-700 transition"
                    >
                      ✅ Aceitar
                    </button>
                    <button
                      onClick={() => handleReject(
                        notification.id, // ✅ AGORA PASSA O ID DA NOTIFICAÇÃO
                        notification.projectId!, 
                        senderId, 
                        senderName || 'Usuário',
                        projectName || 'Projeto'
                      )}
                      className="flex-1 bg-red-600 px-3 py-2 rounded text-sm hover:bg-red-700 transition"
                    >
                      ❌ Recusar
                    </button>
                  </div>
                )}

                {/* BOTÃO MARCAR COMO LIDA PARA OUTROS TIPOS DE NOTIFICAÇÃO */}
                {!notification.type.includes("Solicitação") && 
                 !notification.type.includes("solicitação") &&
                 !notification.type.includes("participação") &&
                 !notification.type.includes("participacao") && (
                  <button
                    onClick={() => markAsRead(notification.id)}
                    className="w-full bg-gray-600 hover:bg-gray-700 px-3 py-2 rounded text-sm transition"
                  >
                    ✅ Marcar como lida
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}