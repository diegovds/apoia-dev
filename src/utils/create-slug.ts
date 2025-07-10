export function createSlug(username: string): string {
  return (
    username
      // 1. Remove acentos e diacríticos como ç, á, é, etc.
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      // 2. Substitui espaços por hífens
      .replace(/\s+/g, '-')
      // 3. Remove caracteres especiais, mantendo apenas letras, números e hífens
      .replace(/[^a-zA-Z0-9-]/g, '')
      // 4. Converte para minúsculas
      .toLowerCase()
      .trim()
  )
}
