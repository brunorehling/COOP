import { Link } from "react-router-dom";
import type { Project } from "../../../utils/projectType"
import { tecnologias } from "../../projects/ListaTech";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

interface VisaoGeralProjetoProps {
  project: Project
}

const techLookup = Object.fromEntries(
  tecnologias.map(([src, nome]) => [nome.toLowerCase(), src]) 
);

export function VisaoGeralProjeto({ project }: VisaoGeralProjetoProps) {
  const { id } = useParams();
  const [isOwner, setIsOwner] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    
    console.log(" [DEBUG VISÃO GERAL]");
    console.log("  - UserID localStorage:", userId, "tipo:", typeof userId);
    console.log("  - Owner ID do projeto:", project.owner?.id, "tipo:", typeof project.owner?.id);
    
    if (userId && project.owner?.id) {
      const userIdNumber = Number(userId);
      const ownerIdNumber = Number(project.owner.id);
      
      console.log("  - Após conversão:", {
        "userIdNumber": userIdNumber,
        "ownerIdNumber": ownerIdNumber,
        "são iguais?": userIdNumber === ownerIdNumber
      });
      
      const isOwnerResult = userIdNumber === ownerIdNumber;
      
      setCurrentUserId(userIdNumber);
      setIsOwner(isOwnerResult);
      
      console.log(" Resultado final:", isOwnerResult ? " É OWNER" : " NÃO É OWNER");
    } else {
      console.log(" Dados insuficientes para verificação");
      setIsOwner(false);
    }
  }, [project.owner?.id]);

  console.log("ID do projeto:", id);
  console.log("É owner?", isOwner);

  return (
    <div className="flex flex-col items-center gap-6 py-10 text-white bg-[#3C4860] w-[70vw] mx-auto my-10 rounded-3xl">
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
          <span className="text-sm text-gray-300 ml-2">
            (ID: {project.owner?.id})
          </span>
        </p>
        <p>
          <strong>Limite de membros:</strong> {project.membersLimit}
        </p>
      </div>
      
      {project.tags && project.tags.length > 0 && (
        <div className="flex flex-wrap justify-center gap-4 p-6 rounded-2xl w-[40%] max-w-[800px]">
          <h2 className="text-xl font-semibold w-full text-center mb-2">
            Tecnologias
          </h2>
          <div className="grid grid-cols-3 gap-4">
            {project.tags?.map((tag) => {
              const src = techLookup[tag.toLowerCase()];
              if (!src) return null;
              return (
                <div key={tag} className="flex items-center gap-2">
                  <img src={src} alt={tag} className="w-[41px] h-[35px]" />
                </div>
              );
            })}
          </div>         
        </div>        
      )}
      
      {/* Botão de editar - APENAS PARA O OWNER */}
      {isOwner && (
        <div className="flex flex-wrap">
          <Link 
            to={`/projetos/${project.id}/editar`} 
            className="px-6 py-3 bg-[#E64EEB] hover:bg-[#d43dd9] text-white font-semibold rounded-xl transition duration-300"
          >
           Editar Projeto
          </Link>
        </div>
      )}
    </div>
  )
}