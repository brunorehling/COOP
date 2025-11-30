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
      console.log('🔐 [DEBUG] Usuário atual do localStorage:', userId);
    } else {
      console.log('❌ [DEBUG] userId NÃO ENCONTRADO no localStorage');
    }
  }, []);

  // FUNÇÃO NOVA: Correção do memberIds
  const fixProjectMembers = async () => {
    try {
      console.log('🔧 [CORREÇÃO] Corrigindo memberIds do projeto...');
      
      // Buscar projeto atual
      const projectResponse = await customFetcher(`/projects/${project.id}`) as any;
      const currentMemberIds = projectResponse.memberIds || [];
      
      console.log('📋 [CORREÇÃO] memberIds atual:', currentMemberIds);
      
      // IDs que DEVEM estar no projeto (owner + membros conhecidos)
      const requiredMemberIds = [
        owner.id,    // Fernando Fernandes (owner)
        11           // Lucas Almeida (já é membro)
      ];
      
      // Adicionar membros que estão faltando
      const missingMembers = requiredMemberIds.filter(id => !currentMemberIds.includes(id));
      
      if (missingMembers.length > 0) {
        console.log('⚠️ [CORREÇÃO] Membros faltando:', missingMembers);
        
        const updatedMemberIds = [...new Set([...currentMemberIds, ...missingMembers])];
        
        console.log('🔄 [CORREÇÃO] Atualizando memberIds para:', updatedMemberIds);
        
        const updateResponse = await customFetcher(`/projects/${project.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            memberIds: updatedMemberIds
          })
        });
        
        console.log('✅ [CORREÇÃO] Projeto atualizado:', updateResponse);
        alert('Membros corrigidos com sucesso!');
        
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        console.log('✅ [CORREÇÃO] memberIds já está correto');
        alert('O projeto já tem todos os membros necessários!');
      }
      
    } catch (error) {
      console.error('❌ [CORREÇÃO] Erro ao corrigir membros:', error);
      alert('Erro ao corrigir os membros do projeto');
    }
  };

  // Função para owner aceitar uma solicitação de entrada
  const acceptJoinRequest = async (userId: number) => {
    try {
      console.log(`✅ [AÇÃO] Owner aceitando solicitação do usuário ${userId}...`);
      
      const response = await customFetcher(`/projects/${project.id}/accept/${userId}`, {
        method: 'POST'
      });
      
      console.log('✅ [AÇÃO] Solicitação aceita:', response);
      alert('Solicitação aceita! Um convite foi enviado para o usuário.');
      
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      
    } catch (error) {
      console.error('❌ [AÇÃO] Erro ao aceitar solicitação:', error);
      alert('Erro ao aceitar a solicitação');
    }
  };

  // Função para owner recusar uma solicitação de entrada
  const rejectJoinRequest = async (userId: number) => {
    try {
      console.log(`❌ [AÇÃO] Owner recusando solicitação do usuário ${userId}...`);
      
      const response = await customFetcher(`/projects/${project.id}/reject/${userId}`, {
        method: 'POST'
      });
      
      console.log('✅ [AÇÃO] Solicitação recusada:', response);
      alert('Solicitação recusada!');
      
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      
    } catch (error) {
      console.error('❌ [AÇÃO] Erro ao recusar solicitação:', error);
      alert('Erro ao recusar a solicitação');
    }
  };

  // Função para usuário responder a um convite (após owner aceitar)
  const respondToInvitation = async (invitationId: number, accept: boolean) => {
    try {
      console.log(`📨 [AÇÃO] ${accept ? 'Aceitando' : 'Recusando'} convite ${invitationId}...`);
      
      const response = await customFetcher(`/projects/${project.id}/respond-invitation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          accept: accept
        })
      });
      
      console.log('✅ [AÇÃO] Resposta do convite:', response);
      alert(`Convite ${accept ? 'aceito' : 'recusado'}! Você agora é um membro do projeto.`);
      
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      
    } catch (error) {
      console.error(`❌ [AÇÃO] Erro ao ${accept ? 'aceitar' : 'recusar'} convite:`, error);
      alert(`Erro ao ${accept ? 'aceitar' : 'recusar'} o convite`);
    }
  };

  // Função para usuário solicitar entrada no projeto
  const requestToJoin = async () => {
    try {
      console.log('🙋 [AÇÃO] Solicitando entrada no projeto...');
      
      const response = await customFetcher(`/projects/${project.id}/request-join`, {
        method: 'POST'
      });
      
      console.log('✅ [AÇÃO] Solicitação enviada:', response);
      alert('Solicitação de entrada enviada para o owner!');
      
    } catch (error) {
      console.error('❌ [AÇÃO] Erro ao solicitar entrada:', error);
      alert('Erro ao solicitar entrada no projeto');
    }
  };

  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      try {
        setLoading(true);
        
        console.log('🔍 [DEBUG INICIADO] ===== CARREGANDO DADOS COMPLETOS =====');
        console.log('👤 [DEBUG] Usuário atual ID:', currentUserId);
        console.log('👑 [DEBUG] Owner do projeto ID:', owner.id);
        console.log('📋 [DEBUG] MemberIds do projeto:', memberIds);
        console.log('🆔 [DEBUG] Project ID:', project.id);
        console.log('📛 [DEBUG] Project Title:', project.name);

        // 1. DEBUG DETALHADO das minhas invitations
        try {
          console.log('🔄 [DEBUG] === BUSCANDO MY-INVITATIONS ===');
          const myInvitationsResponse = await customFetcher('/projects/my-invitations') as any;
          console.log('📋 [DEBUG] Resposta BRUTA de my-invitations:', myInvitationsResponse);
          
          let myInvitations: any[] = [];
          
          if (Array.isArray(myInvitationsResponse)) {
            myInvitations = myInvitationsResponse;
            console.log('✅ [DEBUG] my-invitations é um ARRAY DIRETO');
          } else if (myInvitationsResponse && Array.isArray((myInvitationsResponse as any).data)) {
            myInvitations = (myInvitationsResponse as any).data;
            console.log('✅ [DEBUG] my-invitations está em .data');
          } else if (myInvitationsResponse && Array.isArray((myInvitationsResponse as any).invitations)) {
            myInvitations = (myInvitationsResponse as any).invitations;
            console.log('✅ [DEBUG] my-invitations está em .invitations');
          } else if (myInvitationsResponse && Array.isArray((myInvitationsResponse as any).pendingInvitations)) {
            myInvitations = (myInvitationsResponse as any).pendingInvitations;
            console.log('✅ [DEBUG] my-invitations está em .pendingInvitations');
          } else {
            console.log('❌ [DEBUG] my-invitations NÃO É UM ARRAY VISÍVEL');
            console.log('🔎 [DEBUG] Estrutura completa da resposta:', JSON.stringify(myInvitationsResponse, null, 2));
            console.log('🔎 [DEBUG] Keys da resposta:', Object.keys(myInvitationsResponse || {}));
          }
          
          console.log('📊 [DEBUG] Todas minhas invitations (processadas):', myInvitations);
          console.log('📊 [DEBUG] Quantidade de invitations:', myInvitations.length);
          
          // DEBUG DETALHADO do filtro por projeto
          const myProjectInvitations = myInvitations.filter((inv: any) => {
            const projectIdFromInv = inv.projectId || inv.project?.id;
            const matchesProject = projectIdFromInv === project.id;
            
            console.log(`🔍 [DEBUG FILTRO] Invitation ${inv.id}:`, {
              invitationProjectId: projectIdFromInv,
              currentProjectId: project.id,
              matches: matchesProject,
              invitationData: inv
            });
            
            return matchesProject;
          });
          
          console.log('🎯 [DEBUG] Invitations FILTRADAS para este projeto:', myProjectInvitations);
          console.log('🎯 [DEBUG] Quantidade filtrada:', myProjectInvitations.length);
          
          if (isMounted) {
            setMyPendingInvitations(myProjectInvitations);
          }
        } catch (error) {
          console.log('❌ [DEBUG] ERRO ao buscar my-invitations:', error);
        }

        // 2. DEBUG das solicitações de entrada (apenas owner vê)
        try {
          console.log('🔄 [DEBUG] === BUSCANDO PENDING-INVITATIONS DO PROJETO ===');
          const pendingResponse = await customFetcher(`/projects/${project.id}/pending-invitations`) as any;
          console.log('📋 [DEBUG] Resposta BRUTA de pending-invitations:', pendingResponse);
          
          let requests: any[] = [];
          if (Array.isArray(pendingResponse)) {
            requests = pendingResponse;
            console.log('✅ [DEBUG] pending-invitations é um ARRAY DIRETO');
          } else if (pendingResponse && Array.isArray((pendingResponse as any).data)) {
            requests = (pendingResponse as any).data;
            console.log('✅ [DEBUG] pending-invitations está em .data');
          } else {
            console.log('❌ [DEBUG] pending-invitations NÃO É UM ARRAY VISÍVEL');
            console.log('🔎 [DEBUG] Estrutura:', Object.keys(pendingResponse || {}));
          }
          
          console.log('📊 [DEBUG] Solicitações de entrada (processadas):', requests);
          
          if (isMounted) {
            setJoinRequests(requests);
          }
        } catch (error) {
          console.log('❌ [DEBUG] ERRO ao buscar pending-invitations:', error);
        }

        // 3. Buscar membros ativos
        console.log('🔄 [DEBUG] === BUSCANDO MEMBROS ATIVOS ===');
        const otherMemberIds = memberIds.filter(id => id !== owner.id);
        const allMemberIds = [owner.id, ...otherMemberIds];
        
        console.log('👥 [DEBUG] IDs de membros ativos para buscar:', allMemberIds);

        const membersPromises = allMemberIds.map(async (memberId): Promise<MemberInfo> => {
          try {
            if (memberId === owner.id) {
              return {
                id: owner.id,
                username: owner.username,
                avatarUrl: owner.avatarUrl || undefined,
                role: 'Owner'
              };
            }
            
            const response = await customFetcher(`/users/${memberId}`) as any;
            console.log(`👤 [DEBUG] Resposta do usuário ${memberId}:`, response);
            
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
            console.error(`❌ [DEBUG] Erro ao buscar usuário ${memberId}:`, err);
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
          console.log('✅ [DEBUG] Dados carregados com SUCESSO');
        }

      } catch (err) {
        console.error('❌ [DEBUG] ERRO GERAL ao carregar dados:', err);
      } finally {
        if (isMounted) {
          setLoading(false);
          console.log('🔚 [DEBUG] ===== CARREGAMENTO FINALIZADO =====');
        }
      }
    }

    if (currentUserId) {
      loadData();
    } else {
      console.log('⏳ [DEBUG] Aguardando currentUserId...');
      setLoading(false);
    }

    return () => {
      isMounted = false;
    };
  }, [project.id, owner.id, owner.username, owner.avatarUrl, memberIds, currentUserId]);

  // DEBUG do estado final
  useEffect(() => {
    console.log('📊 [DEBUG ESTADO] Estado atual do componente:', {
      currentUserId,
      isOwner: currentUserId === owner.id,
      isMember: memberIds.includes(currentUserId || 0),
      memberIds,
      joinRequestsCount: joinRequests.length,
      myInvitationsCount: myPendingInvitations.length,
      membersCount: membersInfo.length,
      loading
    });
  }, [currentUserId, owner.id, memberIds, joinRequests, myPendingInvitations, membersInfo, loading]);

  // Separar owner e membros
  const projectOwner = membersInfo.find(member => member.role === 'Owner');
  const activeMembers = membersInfo.filter(member => member.role === 'Membro');

  // Verificar se o usuário atual é o owner
  const isOwner = currentUserId === owner.id;
  // Verificar se o usuário atual já é membro
  const isMember = memberIds.includes(currentUserId || 0);

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
    <div className="space-y-6 text-white">
      {/* DEBUG VISUAL */}
      <div className="bg-gray-800 border border-gray-600 rounded-lg p-4 text-xs">
        <div className="flex justify-between items-center">
          <span className="font-semibold">🔍 DEBUG INFO:</span>
          <span className="bg-blue-600 px-2 py-1 rounded">UserID: {currentUserId}</span>
        </div>
        <div className="grid grid-cols-4 gap-2 mt-2">
          <div className={`px-2 py-1 rounded text-center ${isOwner ? 'bg-green-600' : 'bg-gray-700'}`}>
            {isOwner ? '👑 OWNER' : '👤 USER'}
          </div>
          <div className={`px-2 py-1 rounded text-center ${isMember ? 'bg-green-600' : 'bg-gray-700'}`}>
            {isMember ? '✅ MEMBRO' : '❌ NÃO-MEMBRO'}
          </div>
          <div className="bg-purple-600 px-2 py-1 rounded text-center">
            📨 Convites: {myPendingInvitations.length}
          </div>
          <div className="bg-yellow-600 px-2 py-1 rounded text-center">
            🙋 Solicitações: {joinRequests.length}
          </div>
        </div>
      </div>

      {/* BOTÃO NOVO: Correção de membros */}
      <div className="bg-purple-900 border border-purple-600 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold text-purple-300">🔧 Correção do Sistema</p>
            <p className="text-sm text-purple-200 mt-1">
              Se os membros não aparecem corretamente, clique para corrigir.
            </p>
          </div>
          <button
            onClick={fixProjectMembers}
            className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded text-white font-semibold"
          >
            🔧 Corrigir Membros
          </button>
        </div>
      </div>

      {/* Owner */}
      <div>
        <h2 className="text-lg font-semibold mb-4 border-b border-gray-600 pb-2">
          👑 Dono do Projeto
        </h2>
        {projectOwner && (
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
        )}
      </div>

      {/* Botão para solicitar entrada (apenas para não-membros e não-owner) */}
      {!isOwner && !isMember && currentUserId && (
        <div className="bg-blue-900 border border-blue-600 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-blue-300">🎯 Quer participar deste projeto?</p>
              <p className="text-sm text-blue-200 mt-1">
                Envie uma solicitação para o owner e aguarde a aprovação.
              </p>
            </div>
            <button
              onClick={requestToJoin}
              className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white font-semibold"
            >
              🙋 Solicitar Entrada
            </button>
          </div>
        </div>
      )}

      {/* Solicitações de Entrada (apenas owner vê) */}
      {isOwner && joinRequests.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold mb-4 border-b border-gray-600 pb-2">
            📨 Solicitações de Entrada ({joinRequests.length})
          </h2>
          <div className="space-y-3">
            {joinRequests.map((request) => (
              <div key={request.id} className="flex items-center justify-between p-4 bg-yellow-900 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-yellow-700 flex items-center justify-center text-white font-semibold">
                    {request.user?.username?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <div>
                    <p className="font-medium">{request.user?.username || `Usuário ${request.userId}`}</p>
                    <p className="text-sm text-yellow-200">Quer entrar no projeto</p>
                    <p className="text-xs text-yellow-300">
                      Solicitado em: {request.createdAt ? new Date(request.createdAt).toLocaleDateString() : 'Data desconhecida'}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => acceptJoinRequest(request.userId)}
                    className="bg-green-600 hover:bg-green-700 px-3 py-2 rounded text-white font-semibold"
                  >
                    ✅ Aceitar
                  </button>
                  <button
                    onClick={() => rejectJoinRequest(request.userId)}
                    className="bg-red-600 hover:bg-red-700 px-3 py-2 rounded text-white font-semibold"
                  >
                    ❌ Recusar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Convites do Owner para Mim (usuário vê após ser aceito pelo owner) */}
      {!isOwner && myPendingInvitations.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold mb-4 border-b border-gray-600 pb-2">
            📩 Convite do Owner ({myPendingInvitations.length})
          </h2>
          <div className="space-y-3">
            {myPendingInvitations.map((invitation) => (
              <div key={invitation.id} className="flex items-center justify-between p-4 bg-green-900 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-700 flex items-center justify-center text-white font-semibold">
                    🎉
                  </div>
                  <div>
                    <p className="font-medium">Parabéns! Você foi convidado</p>
                    <p className="text-sm text-green-200">O owner aceitou sua solicitação!</p>
                    <p className="text-xs text-green-300">Aceite o convite para se tornar membro</p>
                    <p className="text-xs text-green-200 mt-1">
                      ID do Convite: {invitation.id} | Status: {invitation.status}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => respondToInvitation(invitation.id, true)}
                    className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white font-semibold"
                  >
                    ✅ Aceitar Convite
                  </button>
                  <button
                    onClick={() => respondToInvitation(invitation.id, false)}
                    className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white font-semibold"
                  >
                    ❌ Recusar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Membros Ativos */}
      <div>
        <h2 className="text-lg font-semibold mb-4 border-b border-gray-600 pb-2">
          👥 Membros do Projeto ({activeMembers.length})
        </h2>
        
        {activeMembers.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <p>📭 Nenhum membro ativo no projeto</p>
            <p className="text-sm mt-2">
              {isOwner 
                ? 'Aguarde solicitações de entrada ou convide usuários!' 
                : 'Solicite entrada para participar'
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