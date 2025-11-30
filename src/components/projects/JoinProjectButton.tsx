// JoinProjectButton.tsx - VERSÃO COM SENDER_ID
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

    const currentUserId = Number(localStorage.getItem("userId")); // ✅ Já convertendo
    const currentUsername = localStorage.getItem("username");

    if (!currentUserId || !currentUsername) {
      alert("Usuário não encontrado.");
      return;
    }

    console.log('🔵 [JoinProjectButton] Enviando solicitação...', {
      projectId: projectId, // ← Já deve ser number
      ownerId: ownerId,     // ← Já deve ser number  
      currentUserId,        // ← Já é number
      currentUsername,
      projectName
    });

    // ✅ GARANTIR que ownerId é number
    const numericOwnerId = Number(ownerId);
    const numericProjectId = Number(projectId);

    const profileUrl = `/perfil/${currentUserId}`;
    const message =
      `<a href="${profileUrl}" style="color:#e64eeb;">${currentUsername}</a> ` +
      `solicitou participação no projeto <b>${projectName}</b>.`;

    // ENVIA NOTIFICAÇÃO COM NÚMEROS
    await sendNotification(
      numericOwnerId,                    // ✅ NUMBER
      message,
      "Solicitação de participação",
      numericProjectId,                  // ✅ NUMBER
      currentUserId                      // ✅ NUMBER
    );

    console.log('✅ Solicitação enviada com IDs numéricos!');
    alert("✅ Solicitação enviada!\n\nAguarde a aprovação do dono do projeto.");

  } catch (error: any) {
    console.error('❌ Erro ao enviar solicitação:', error);
    alert("Erro ao enviar solicitação: " + (error.message || 'Tente novamente'));
  } finally {
    setLoading(false);
  }
}

  return (
    <button
      onClick={handleJoin}
      disabled={loading}
      className={`px-6 py-3 rounded-2xl text-white font-medium transition-all ${
        loading 
          ? "bg-gray-500 cursor-not-allowed" 
          : "bg-[#e64eeb] hover:bg-[#c13cc7] hover:scale-105 shadow-lg"
      }`}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          Enviando...
        </span>
      ) : (
        "Participar"
      )}
    </button>
  );
}