export interface IAuthor {
  authorImage?: {
    url: string;
    alt?: string;
    width: number;
    height: number;
  };
  authorName?: string;
  date?: string;
}
