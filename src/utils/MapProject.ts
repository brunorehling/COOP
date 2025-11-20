import type { Project } from "./projectType";

export function mapProject(p: any): Project {
  return {
    id: Number(p.id),
    name: p.name,
    description: p.description ?? null,
    status: p.status,
    ownerId: Number(p.owner?.id),
    createdAt: p.createdAt,

    bannerUrl: p.bannerUrl ?? "/placeholder.jpg",
    tags: p.tags ?? [],
    membersLimit: p.membersLimit ?? 0,

    owner: {
      id: Number(p.owner?.id),
      username: p.owner?.username ?? "",
      email: p.owner?.email ?? "",
      role: p.owner?.role ?? "",
    },

    memberIds: p.members?.map((m: any) => Number(m.user?.id)) ?? [],
  };
}
