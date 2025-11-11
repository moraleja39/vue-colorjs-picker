export function clamp(value: number, min: number, max: number) {
  return Math.max(value, Math.min(value, max))
}
