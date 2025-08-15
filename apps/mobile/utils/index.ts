export function capitalize(content: string): string {
  if (typeof content !== 'string' || content.length === 0) {
    return '';
  }

  return content.charAt(0).toUpperCase() + content.slice(1).toLowerCase();
}
