export function normalizeSlug(slug: string): string {
  return slug.replace(/^\w+\//, '');
}
