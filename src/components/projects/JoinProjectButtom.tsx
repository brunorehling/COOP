// src/components/JoinProjectButton.tsx
import { projectsControllerJoin } from "../../api/orval/projects/projects";
import { useState } from "react";

interface JoinProjectButtonProps {
  projectId: number;
}

export function JoinProjectButton({ projectId }: JoinProjectButtonProps) {
  const [loading, setLoading] = useState(false);

  async function handleJoin() {
    try {
      setLoading(true);
      await projectsControllerJoin(String(projectId));
      alert("Você entrou no projeto!");
    } catch (error) {
      console.error(error);
      alert("Erro ao entrar no projeto!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleJoin}
      disabled={loading}
      className={`px-4 py-2 rounded-2xl text-white ${
        loading ? "bg-gray-500" : "bg-[#e64eeb] hover:bg-[#c13cc7] hover:border-3 hover:border-black"
      }`}
    >
      {loading ? "Entrando..." : "Participar"}
    </button>
  );
}
