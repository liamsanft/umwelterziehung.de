/**
 * Format paths to remove the file extension and any directories
 */
export const formatPaths = (path: string): string => path.replace(/^.*[\\/]/, "").replace(".md", "");