import { ArticleDocument } from "../../../prismicio-types";

export interface ArticlesLayoutProps {
  posts: ArticleDocument<string>[];
  category?: string;
  intro?: string;
  page?: number;
  totalPages?: number;
}
