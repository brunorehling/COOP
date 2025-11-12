import type { Project } from "../../../utils/projectType"

interface VisaoGeralProjetoProps {
  project: Project
}

export function VisaoGeralProjeto({ project }: VisaoGeralProjetoProps) {
  return (
    <div className="flex flex-col items-center gap-6 py-10 text-white  bg-[#3C4860] w-[70vw] mx-auto my-10 rounded-3xl">
      <h1 className="text-4xl font-bold">{project.name}</h1>

      <img
        src={project.bannerUrl || "/foto_1.png"}
        alt={project.name}
        className="w-[400px] h-[250px] rounded-xl object-cover shadow-lg"
      />

      <p className="text-lg max-w-[800px] text-center">{project.description}</p>

      <div className="flex flex-col items-center gap-3 bg-[#3C4860] p-6 rounded-2xl w-[90%] max-w-[800px]">
        <p>
          <strong>Status:</strong> {project.status}
        </p>
        <p>
          <strong>Data de criação:</strong>{" "}
          {project.createdAt
            ? new Date(project.createdAt).toLocaleDateString("pt-BR")
            : "—"}
        </p>
        <p>
          <strong>Líder:</strong> {project.owner?.username || "Desconhecido"}
        </p>
        <p>
          <strong>Limite de membros:</strong> {project.membersLimit}
        </p>
      </div>

      {project.tags && project.tags.length > 0 && (
        <div className="flex flex-wrap justify-center gap-4 bg-[#2F3A52] p-6 rounded-2xl w-[90%] max-w-[800px]">
          <h2 className="text-xl font-semibold w-full text-center mb-2">
            Tecnologias
          </h2>
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="bg-[#e64eeb] text-white px-4 py-2 rounded-lg text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
