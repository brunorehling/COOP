export type Project = {
  id: number;
  name: string;
  description?: string | null;
  status: 'IN_PROGRESS' | 'TESTING' | 'FINISHED';
  ownerId: number;
  createdAt: string;
  owner: {
    id: number;
    name: string;
    email: string;
  };
};