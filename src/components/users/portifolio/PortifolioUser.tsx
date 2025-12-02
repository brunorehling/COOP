import { Link } from "react-router-dom";
import type { Portfolio } from "../../../utils/PortifolioType";
import SkillCard from "./SkillCard";
import { 
  SiReact, SiAngular, SiVuedotjs, SiNodedotjs, SiPython, SiTypescript, 
  SiJavascript, SiPostgresql, SiMongodb, SiDocker, SiKubernetes, 
  SiAmazon, SiGit 
} from "react-icons/si";
import { FaJava } from "react-icons/fa";
import { VscAzure } from "react-icons/vsc";

type PortfolioWithHighlights = Portfolio & {
  highlightedProjects?: { id: string; name: string; imageUrl: string }[];
  highlightedAssets?: { id: string; name: string }[];
};

interface Props {
  portfolio: PortfolioWithHighlights | null;
  isPublic?: boolean;
}

// Mapeamento de ícones
const skillIconsMap: Record<string, React.ReactNode> = {
  "react": <SiReact size={24} color="#61DAFB" />,
  "angular": <SiAngular size={24} color="#DD0031" />,
  "vue": <SiVuedotjs size={24} color="#4FC08D" />,
  "node.js": <SiNodedotjs size={24} color="#339933" />,
  "nodejs": <SiNodedotjs size={24} color="#339933" />,
  "python": <SiPython size={24} color="#3776AB" />,
  "java": <FaJava size={24} color="#007396" />,
  "typescript": <SiTypescript size={24} color="#3178C6" />,
  "javascript": <SiJavascript size={24} color="#F7DF1E" />,
  "postgresql": <SiPostgresql size={24} color="#336791" />,
  "mongodb": <SiMongodb size={24} color="#47A248" />,
  "docker": <SiDocker size={24} color="#2496ED" />,
  "kubernetes": <SiKubernetes size={24} color="#326CE5" />,
  "aws": <SiAmazon size={24} color="#FF9900" />,
  "azure": <VscAzure size={24} color="#0089D6" />,
  "git": <SiGit size={24} color="#F05032" />
};

export function PortfolioSection({ portfolio, isPublic = false }: Props) {

  // ------- SEM PORTFÓLIO -------
  if (!portfolio) {
    return (
      <div className="flex flex-col items-center justify-center bg-white w-[60vw] p-10 rounded-b-xl gap-4">
        <p className="font-bold text-black">Este usuário ainda não possui um portfólio</p>

        {!isPublic && (
          <Link
            to="/criar_portifolio"
            className="bg-[#E64EEB] p-2 rounded-lg text-white font-semibold"
          >
            Criar portfólio
          </Link>
        )}
      </div>
    );
  }

  const highlightedProjects = portfolio.highlightedProjects ?? [];

  // Função para obter o ícone da tecnologia
  const getSkillIcon = (skillName: string) => {
    const skillKey = skillName.toLowerCase().trim();
    
    // Tenta encontrar no mapeamento
    const icon = skillIconsMap[skillKey];
    
    if (icon) {
      return icon;
    }
  }

  // ------- COM PORTFÓLIO -------
  return (
    <div className="p-6 text-black w-[60vw] bg-white rounded-b-xl flex flex-col gap-6">
      
      {/* Cabeçalho do portfólio */}
      <div className="flex items-center gap-4">
        <div>
          <h2 className="text-xl font-bold">{portfolio.user.username}</h2>
          {portfolio.location && <p className="text-sm">{portfolio.location}</p>}
        </div>
      </div>

      {/* Skills com ícones reais */}
      {portfolio.skills && portfolio.skills.length > 0 && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-4 text-black border-b border-gray-300 pb-2">
            🛠️ Skills & Tecnologias
          </h3>
          <div className="flex flex-wrap gap-2">
            {portfolio.skills.map((skill) => {
              const skillIcon = getSkillIcon(skill);
              
              return (
                <div
                  key={skill}
                  className="flex items-center gap-3 bg-white border border-gray-300 rounded-full px-4 py-2 hover:border-[#E64EEB] hover:shadow-md transition-all duration-200"
                >
                  <div className="flex items-center justify-center w-8 h-8">
                    {skillIcon}
                  </div>
                  <span className="text-black font-medium">{skill}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Bio */}
      {portfolio.bio && <p className="text-black">{portfolio.bio}</p>}

      {/* Projetos destacados */}
      {highlightedProjects.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mb-4 text-black border-b border-gray-300 pb-2">
            🚀 Projetos Destacados
          </h3>
          <div className="flex gap-4 flex-wrap">
            {highlightedProjects.map((p) => (
              <div
                key={p.id}
                className="border rounded-lg overflow-hidden w-[150px] text-center"
              >
                <img
                  src={p.imageUrl}
                  alt={p.name}
                  className="w-full h-[100px] object-cover"
                />
                <p className="p-2 text-sm font-medium">{p.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Botão Editar */}
      {!isPublic && (
        <div className="flex justify-center">
          <Link
            to="/criar_portifolio"
            className="w-[10vw] bg-[#E64EEB] p-2 rounded-lg text-white font-semibold text-center"
          >
            Editar portfólio
          </Link>
        </div>
      )}
    </div>
  );
}