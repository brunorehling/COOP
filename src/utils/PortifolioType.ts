export type Portfolio = {
  id: number | string
  userId: number | string
  bio: string
  skills: string[]
  location: string
  profileImageUrl: string | null
  phone: string
  highlightedProjects: string[] | null
  highlightedAssets: string[] | null
  user: {
    id: number | string
    username: string
    email: string
    phone: string
    avatarUrl: string 
    role: string
    createdAt: string
  }
}
