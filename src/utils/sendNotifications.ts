// utils/sendNotifications.ts - VERSÃO CORRIGIDA
import { customFetcher } from "../api/fetcher";

export async function sendNotification(
  userId: number,       // quem recebe (owner)
  content: string,
  type: string,
  projectId?: number,
  requesterId?: number   // quem solicitou
) {
  try {
    console.log('🔔 [sendNotification] Enviando:', {
      userId,
      type,
      content,
      projectId,
      requesterId
    });

    // ✅ CORREÇÃO: Converter para números
    const notificationData = {
      userId: Number(userId),           // ← CONVERTE PARA NUMBER
      content,
      type,
      projectId: projectId ? Number(projectId) : null, // ← CONVERTE PARA NUMBER
      senderId: requesterId ? Number(requesterId) : null, // ← CONVERTE PARA NUMBER
      isRead: false,
    };

    console.log('🔔 [sendNotification] Dados convertidos:', notificationData);

    const response = await customFetcher("/notifications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(notificationData),
    });

    console.log('✅ [sendNotification] Sucesso:', response);
    return response;
  } catch (error) {
    console.error('❌ [sendNotification] Erro:', error);
    throw error;
  }
}