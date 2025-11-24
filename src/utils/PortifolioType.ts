export type Portfolio = {
  id: number | string
  userId: number | string

  // --- campos DO PORTFOLIO ---
  name: string                     // <-- aqui agora está correto
  bio: string | null
  skills: string[]
  location: string | null
  profileImageUrl: string | null
  phone: string | null
  // --- dados do usuário dono do portfolio ---
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
// Tipo derivado apenas para páginas que exibem os destaques
export type PortfolioWithHighlights = Portfolio & {
  highlightedProjects?: { id: string; name: string; imageUrl?: string }[]
  highlightedAssets?: { id: string; name: string }[]
}
