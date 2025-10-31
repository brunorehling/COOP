const imagens = import.meta.glob("./techs/*.png", { eager: true, import: "default" })

export const tecnologias = Object.entries(imagens).map(([path, src]) => {
  const nome = path.split("/").pop()?.replace(".png", "") || ""
  return [src as string, nome] as const
})
