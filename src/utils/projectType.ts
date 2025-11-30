// projectType.ts - Adicione currentMembers se necessário
export type Project = {
  id: number;
  name: string;
  description?: string | null;
  status: "IN_PROGRESS" | "TESTING" | "FINISHED";
  ownerId: number;
  createdAt: string;

  bannerUrl?: string | null;
  tags?: string[];
  membersLimit?: number;

  owner: {
    id: number;
    username: string;
    email: string;
    role: string;
  };

  memberIds: number[];
  
  // ✅ Adicione se o backend retornar currentMembers
  currentMembers?: number;
};