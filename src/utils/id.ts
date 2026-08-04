/** Small dependency-free id generator — swap for nanoid/uuid if you add one later. */
export function createId(prefix = 'id'): string {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`
}
