export interface Post {
  id: number,
  title: string,
  slug: string,
  excerpt: string,
  description: string,
  is_published: boolean,
  created_at: Date,
  updated_at: Date
}