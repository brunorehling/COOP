import { useState, useEffect } from "react";
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

interface JoinRequest {
  id: number;
  userId: number;
  projectId: number;
  status: string;
  user?: User;
  createdAt?: string;
}

export default function ProjectMembers({ project }: Props) {
  const [membersInfo, setMembersInfo] = useState<MemberInfo[]>([]);
  const [joinRequests, setJoinRequests] = useState<JoinRequest[]>([]);
  const [myPendingInvitations, setMyPendingInvitations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);

  const owner = project.owner as any;
  const memberIds = project.memberIds ?? [];

  // Buscar ID do usuário atual
  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      setCurrentUserId(Number(userId));
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      try {
        setLoading(true);

        // 1. Buscar convites pendentes (apenas para visualização)
        try {
          const myInvitationsResponse = await customFetcher('/projects/my-invitations') as any;
          
          let myInvitations: any[] = [];
          
          if (Array.isArray(myInvitationsResponse)) {
            myInvitations = myInvitationsResponse;
          } else if (myInvitationsResponse && Array.isArray(myInvitationsResponse.data)) {
            myInvitations = myInvitationsResponse.data;
          } else if (myInvitationsResponse && Array.isArray(myInvitationsResponse.invitations)) {
            myInvitations = myInvitationsResponse.invitations;
          } else if (myInvitationsResponse && Array.isArray(myInvitationsResponse.pendingInvitations)) {
            myInvitations = myInvitationsResponse.pendingInvitations;
          }
          
          // Filtrar convites para este projeto
          const myProjectInvitations = myInvitations.filter((inv: any) => {
            const projectIdFromInv = inv.projectId || inv.project?.id;
            return projectIdFromInv === project.id;
          });
          
          if (isMounted) {
            setMyPendingInvitations(myProjectInvitations);
          }
        } catch (error) {
          // Silenciar erro
        }

        // 2. Buscar solicitações pendentes (apenas para visualização)
        try {
          const pendingResponse = await customFetcher(`/projects/${project.id}/pending-invitations`) as any;
          
          let requests: any[] = [];
          if (Array.isArray(pendingResponse)) {
            requests = pendingResponse;
          } else if (pendingResponse && Array.isArray(pendingResponse.data)) {
            requests = pendingResponse.data;
          }
          
          if (isMounted) {
            setJoinRequests(requests);
          }
        } catch (error) {
          // Silenciar erro
        }

        // 3. Carregar informações dos membros (APENAS membros, não o owner)
        const otherMemberIds = memberIds.filter(id => id !== Number(owner.id));
        
        const membersPromises = otherMemberIds.map(async (memberId): Promise<MemberInfo> => {
          try {
            const response = await customFetcher(`/users/${memberId}`) as any;
            
            let userData: User;
            if (response && response.data) {
              userData = response.data as User;
            } else {
              userData = response as User;
            }
            
            return {
              id: userData.id,
              username: userData.username,
              avatarUrl: userData.avatarUrl || undefined,
              role: 'Membro'
            };
          } catch (err) {
            return {
              id: memberId,
              username: `Usuário ${memberId}`,
              avatarUrl: undefined,
              role: 'Membro'
            };
          }
        });

        const membersData = await Promise.all(membersPromises);
        
        if (isMounted) {
          setMembersInfo(membersData);
        }

      } catch (err) {
        // Erro geral silenciado
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    if (currentUserId) {
      loadData();
    } else {
      setLoading(false);
    }

    return () => {
      isMounted = false;
    };
  }, [project.id, owner.id, owner.username, owner.avatarUrl, memberIds, currentUserId]);

  // Criar objeto do owner separado
  const projectOwner: MemberInfo = {
    id: owner.id,
    username: owner.username,
    avatarUrl: owner.avatarUrl || undefined,
    role: 'Owner'
  };

  // Membros ativos são apenas os que não são owner
  const activeMembers = membersInfo; // Já filtramos no carregamento

  // Verificar se o usuário atual é o owner
  const isOwner = currentUserId === owner.id;

  // Contar total de pessoas no projeto (owner + membros)
  const totalProjectMembers = 1 + activeMembers.length; // Owner + membros

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

  return (
    <div className="space-y-6 text-white items-center">
      {/* Informações sobre os membros */}
      <div className="flex flex-col justify-center items-center bg-gray-800 border border-gray-600 rounded-lg p-4 text-xs">
        <div className="flex justify-between items-center">
          <span className="font-semibold">Informações sobre os membros</span>
        </div>
        <div className="flex justify-between w-[30vw] gap-5 mt-2">
          <div className="bg-pink-600 px-2 py-1 rounded text-center">
            Limite: {project.membersLimit}
          </div>
          <div className="bg-blue-700 px-2 py-1 rounded text-center">
            Atuais: {totalProjectMembers}
          </div>
          <div className="bg-purple-600 px-2 py-1 rounded text-center">
            Convites: {myPendingInvitations.length}
          </div>
          <div className="bg-yellow-600 px-2 py-1 rounded text-center">
            Solicitações: {joinRequests.length}
          </div>
        </div>
      </div>

      {/* Owner - SEPARADO */}
      <div>
        <h2 className="text-lg font-semibold mb-4 border-b border-gray-600 pb-2">
          Dono do Projeto
        </h2>
        <div className="flex items-center gap-3 p-3 bg-[#364159] rounded-lg">
          {projectOwner.avatarUrl ? (
            <img src={projectOwner.avatarUrl} alt={projectOwner.username} className="w-10 h-10 rounded-full object-cover" />
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
      </div>

      {/* Membros Ativos - APENAS membros (sem owner) */}
      <div>
        <h2 className="text-lg font-semibold mb-4 border-b border-gray-600 pb-2">
          Membros do Projeto ({activeMembers.length})
        </h2>
        
        {activeMembers.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <p>Nenhum membro ativo no projeto</p>
            <p className="text-sm mt-2">
              {isOwner 
                ? 'Você é o único membro neste momento' 
                : 'Apenas o owner faz parte do projeto'
              }
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {activeMembers.map((member) => (
              <div key={member.id} className="flex items-center gap-3 p-3 bg-[#364159] rounded-lg">
                {member.avatarUrl ? (
                  <img src={member.avatarUrl} alt={member.username} className="w-10 h-10 rounded-full object-cover" />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-[#2d3d5b] flex items-center justify-center text-white font-semibold border border-gray-600">
                    {member.username.charAt(0).toUpperCase()}
                  </div>
                )}
                <div className="flex-1">
                  <p className="font-medium">{member.username}</p>
                  <p className="text-sm text-gray-300">{member.role}</p>
                </div>
                <span className="text-xs bg-green-600 px-2 py-1 rounded">Ativo</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}