const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5001"

export const getImage = (image: string) => {
  if (!image) return

  // if already full url → return directly
  if (image.startsWith("http")) return image

  return `${BASE_URL}/${image.replace(/^\/+/, "")}`
}
