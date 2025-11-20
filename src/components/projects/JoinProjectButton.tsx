import { useState } from "react";
import { projectsControllerJoin } from "../../api/orval/projects/projects";
import { sendNotification } from "../../utils/sendNotifications";

interface JoinProjectButtonProps {
  projectId: number;
  ownerId: number;
}

export function JoinProjectButton({ projectId, ownerId }: JoinProjectButtonProps) {
  const [loading, setLoading] = useState(false);

  async function handleJoin() {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      // 1️⃣ Entrar no projeto
      await projectsControllerJoin(projectId.toString(), {
        headers: { Authorization: token ? `Bearer ${token}` : "" },
      });

      // 2️⃣ Notificar o owner
      await sendNotification(ownerId, "Um usuário entrou no seu projeto!", "JOIN_ACCEPTED");

      alert("Você entrou no projeto!");
    } catch (error: any) {
      console.error(error);
      if (error.response?.status === 409) {
        alert("Você já é membro deste projeto.");
      } else {
        alert("Erro ao entrar no projeto.");
      }
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
      {loading ? "Entrando..." : "Participar"}
    </button>
  );
}
