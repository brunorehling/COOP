import type { Project } from "../../../utils/projectType";

type Props = {
  project: Project;
};

export default function ProjectMembers({ project }: Props) {
  const owner = project.owner;
  const members = project.memberIds ?? [];

  const userId = localStorage.getItem('userId')
  if (!userId) {
    console.error('userId não encontrado no localStorage')
    return null
  }

  // membros aceitos (todos exceto owner)
  const acceptedMembers = members.filter((m) => m !== owner.id);

  return (
    <div className="space-y-6 text-white">
      <div>
        <h2 className="text-lg font-semibold mb-2">Owner: {owner.username}</h2>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-2">Membros Aceitos (IDs)</h2>
        {acceptedMembers.length === 0 ? (
          <p>Nenhum membro aceito ainda.</p>
        ) : (
          <ul>
            {acceptedMembers.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
