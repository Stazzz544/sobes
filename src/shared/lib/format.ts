export const toPlainText = (formatted: string): string =>
  formatted.replace(/\[\[[a-z0-9-]+\|([^\]]+)\]\]/g, '$1').replace(/`|\*\*/g, '');
