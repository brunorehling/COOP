import { useState } from "react";
import { sendNotification } from "../../utils/sendNotifications";

interface JoinProjectButtonProps {
  projectId: number;
  ownerId: number;
  projectName: string;
}

export function JoinProjectButton({ projectId, ownerId, projectName }: JoinProjectButtonProps) {
  const [loading, setLoading] = useState(false);

  async function handleJoin() {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");
      const currentUserId = localStorage.getItem("userId");
      const currentUsername = localStorage.getItem("username");

      if (!currentUserId) {
        alert("Usuário não encontrado (ID).");
        return;
      }

      if (!currentUsername) {
        alert("Username não está no localStorage.");
        return;
      }

      // 🔥 Agora NÃO entra mais no projeto, só envia a notificação

      const profileUrl = `/perfil/${currentUserId}`;

      const message =
        `<a href="${profileUrl}" style="color:#e64eeb;">${currentUsername}</a> ` +
        `solicitou participação no projeto <b>${projectName}</b>.`;

      // Envia notificação pro dono
      await sendNotification(ownerId, message, "Solicitação de perticipação", projectId);

      alert("Solicitação enviada!");
    } catch (error) {
      console.error(error);
      alert("Erro ao enviar solicitação.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleJoin}
      disabled={loading}
      className={`px-4 py-2 rounded-2xl text-white ${
        loading ? "bg-gray-500" : "bg-[#e64eeb] hover:bg-[#c13cc7]"
      }`}
    >
      {loading ? "Enviando..." : "Participar"}
    </button>
  );
}
