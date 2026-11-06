/** "bulbasaur" -> "Bulbasaur", "mr-mime" -> "Mr Mime" */
export function formatName(name: string): string {
  return name
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

/** 1 -> "001" */
export function formatNumber(id: number): string {
  return String(id).padStart(3, '0');
}
