const parts = (version: string): number[] => version.split('.').map((part) => Number.parseInt(part, 10) || 0);

export const compareVersions = (left: string, right: string): number => {
  const leftParts = parts(left);
  const rightParts = parts(right);
  for (let index = 0; index < Math.max(leftParts.length, rightParts.length); index += 1) {
    const difference = (leftParts[index] ?? 0) - (rightParts[index] ?? 0);
    if (difference !== 0) {
      return Math.sign(difference);
    }
  }
  return 0;
};
