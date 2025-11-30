import { useState, useEffect, useMemo } from "react";
import type { Project } from "../../../utils/projectType";
import type { User } from "../../../utils/UserType";
import { customFetcher } from "../../../api/fetcher";

type Props = {
  project: Project;
};

interface MemberInfo {
  id: number;
  username: string;
  avatarUrl?: string;
  role: string;
}

export default function ProjectMembers({ project }: Props) {
  const [membersInfo, setMembersInfo] = useState<MemberInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const owner = project.owner;
  const memberIds = project.memberIds ?? [];

  const userId = localStorage.getItem('userId');
  if (!userId) {
    console.error('userId não encontrado no localStorage');
    return null;
  }

  // ✅ DEBUG: Ver o que está vindo no project
  console.log('🔍 [DEBUG] Project data:', {
    projectId: project.id,
    projectName: project.name,
    owner: owner,
    memberIds: memberIds,
    memberIdsType: typeof memberIds,
    memberIdsLength: memberIds.length
  });

  // ✅ CORREÇÃO: Criar dependências estáveis com useMemo
  const stableMemberIds = useMemo(() => memberIds, [memberIds.join(',')]); // Join cria string estável
  const stableOwnerId = useMemo(() => owner.id, [owner.id]);

  // Buscar informações dos membros
  // VERSÃO SIMPLES - Só na montagem
  useEffect(() => {
    let isMounted = true;

    async function fetchMembersInfo() {
      try {
        setLoading(true);
        
        const allMemberIds = [...new Set([...memberIds, owner.id])];
        
        // ✅ DEBUG: Ver IDs antes de buscar
        console.log('🔍 [DEBUG] Antes de buscar membros:', {
          memberIds,
          ownerId: owner.id,
          allMemberIds: allMemberIds
        });

        console.log('🔍 Buscando informações dos membros (apenas uma vez):', allMemberIds);

        const membersPromises = allMemberIds.map(async (memberId): Promise<MemberInfo> => {
          try {
            console.log(`🔍 Buscando usuário ${memberId}...`);
            const response = await customFetcher(`/users/${memberId}`);
            const userData = (response as { data: User }).data;
            
            console.log(`✅ Usuário ${memberId} encontrado:`, userData.username);
            
            return {
              id: userData.id,
              username: userData.username,
              avatarUrl: userData.avatarUrl || undefined,
              role: memberId === owner.id ? 'Owner' : 'Membro'
            };
          } catch (err) {
            console.error(`❌ Erro ao buscar usuário ${memberId}:`, err);
            return {
              id: memberId,
              username: `Usuário ${memberId}`,
              avatarUrl: undefined,
              role: memberId === owner.id ? 'Owner' : 'Membro'
            };
          }
        });

        const membersData = await Promise.all(membersPromises);
        
        // ✅ DEBUG: Ver o resultado final
        console.log('📊 [DEBUG] Dados dos membros encontrados:', membersData);
        
        if (isMounted) {
          setMembersInfo(membersData);
          setError(null);
        }

      } catch (err) {
        console.error('❌ Erro ao buscar membros:', err);
        if (isMounted) {
          setError('Erro ao carregar informações dos membros');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchMembersInfo();

    return () => {
      isMounted = false;
    };
  }, []); // ✅ Array vazio = só na montagem

  // ✅ DEBUG: Ver estado final
  console.log('📊 [DEBUG] Estado final:', {
    membersInfo,
    loading,
    error,
    acceptedMembers: membersInfo.filter(member => member.id !== owner.id)
  });

  // Separar owner e membros
  const projectOwner = membersInfo.find(member => member.id === owner.id);
  const acceptedMembers = membersInfo.filter(member => member.id !== owner.id);

  if (loading) {
    return (
      <div className="space-y-6 text-white">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-700 rounded w-1/3 mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-700 rounded"></div>
            <div className="h-4 bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6 text-white">
        <p className="text-red-400">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 text-white">
      {/* Owner */}
      <div>
        <h2 className="text-lg font-semibold mb-4 border-b border-gray-600 pb-2">
          👑 Dono do Projeto
        </h2>
        {projectOwner && (
          <div className="flex items-center gap-3 p-3 bg-[#364159] rounded-lg">
            {projectOwner.avatarUrl ? (
              <img
                src={projectOwner.avatarUrl}
                alt={projectOwner.username}
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-[#e64eeb] flex items-center justify-center text-white font-semibold">
                {projectOwner.username.charAt(0).toUpperCase()}
              </div>
            )}
            <div>
              <p className="font-medium">{projectOwner.username}</p>
              <p className="text-sm text-gray-300">{projectOwner.role}</p>
            </div>
          </div>
        )}
      </div>

      {/* Membros Aceitos */}
      <div>
        <h2 className="text-lg font-semibold mb-4 border-b border-gray-600 pb-2">
          👥 Membros do Projeto ({acceptedMembers.length})
        </h2>
        
        {acceptedMembers.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <p>📭 Nenhum membro no projeto ainda</p>
            <p className="text-sm mt-2">Seja o primeiro a participar!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {acceptedMembers.map((member) => (
              <div
                key={member.id}
                className="flex items-center gap-3 p-3 bg-[#364159] rounded-lg hover:bg-[#3C4860] transition"
              >
                {member.avatarUrl ? (
                  <img
                    src={member.avatarUrl}
                    alt={member.username}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-[#2d3d5b] flex items-center justify-center text-white font-semibold border border-gray-600">
                    {member.username.charAt(0).toUpperCase()}
                  </div>
                )}
                <div className="flex-1">
                  <p className="font-medium">{member.username}</p>
                  <p className="text-sm text-gray-300">{member.role}</p>
                </div>
                <span className="text-xs bg-[#2d3d5b] px-2 py-1 rounded text-gray-300">
                  ID: {member.id}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Estatísticas */}
      <div className="pt-4 border-t border-gray-600">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="text-center p-3 bg-[#364159] rounded">
            <p className="text-2xl font-bold text-[#e64eeb]">{membersInfo.length}</p>
            <p className="text-gray-300">Total</p>
          </div>
          <div className="text-center p-3 bg-[#364159] rounded">
            <p className="text-2xl font-bold text-green-400">{acceptedMembers.length}</p>
            <p className="text-gray-300">Membros</p>
          </div>
        </div>
      </div>
    </div>
  );
}