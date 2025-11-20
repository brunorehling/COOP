import { Link } from "react-router-dom";
import type { Portfolio } from "../../../utils/PortifolioType";

type PortfolioWithHighlights = Portfolio & {
  highlightedProjects?: { id: string; name: string; imageUrl: string }[];
  highlightedAssets?: { id: string; name: string }[];
};

interface Props {
  portfolio: PortfolioWithHighlights | null;
  isPublic?: boolean; // <-- adicionamos isso
}

export function PortfolioSection({ portfolio, isPublic = false }: Props) {

  // ------- SEM PORTFÓLIO -------
  if (!portfolio) {
    return (
      <div className="flex flex-col items-center justify-center bg-white w-[60vw] p-10 rounded-b-xl gap-4">
        <p className="font-bold text-black">Este usuário ainda não possui um portfólio</p>

        {/* Só aparece se NÃO for perfil público */}
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

      {/* Skills */}
      {portfolio.skills && portfolio.skills.length > 0 && (
        <div>
          <p className="font-semibold mb-1">Skills:</p>
          <ul className="flex flex-wrap gap-2">
            {portfolio.skills.map((skill) => (
              <li key={skill} className="bg-gray-200 text-black px-2 py-1 rounded">
                {skill}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Bio */}
      {portfolio.bio && <p className="text-black">{portfolio.bio}</p>}

      {/* Projetos destacados */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <p className="text-black font-semibold">Projetos destacados</p>

          {/* Só aparece no perfil do dono */}
          {!isPublic && (
            <Link
              to="/criar_portifolio"
              className="bg-[#E64EEB] p-2 rounded-lg text-white font-semibold"
            >
              Editar portfólio
            </Link>
          )}
        </div>

        {highlightedProjects.length === 0 ? (
          <p className="text-black mb-4">Nenhum projeto destacado.</p>
        ) : (
          <div className="flex gap-4 flex-wrap mb-6">
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
        )}
      </div>

      {/* Assets destacados */}
      <div>
        <p className="text-black font-semibold mb-2">Assets destacados</p>

        {portfolio.highlightedAssets && portfolio.highlightedAssets.length > 0 ? (
          <div className="flex gap-4 flex-wrap">
            {portfolio.highlightedAssets.map((a, idx) => (
              <div key={idx} className="border rounded-lg p-2">
                {a.name ?? "Asset"}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-black">Nenhum asset destacado.</p>
        )}
      </div>

    </div>
  );
}
