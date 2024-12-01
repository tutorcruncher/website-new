import { ArticleDocument, Simplify } from "../../../../prismicio-types";
import { PrismicNextImage } from "@prismicio/next";
import { RichTextField } from "@prismicio/types";
import Image from "next/image";

export interface ArticlePage {
  content: {
    title: string;
    url: string;
    body: RichTextField;
    author: {
      name: string;
      image: any;
    };
    createdDate: Date;
    publishedDate: Date;
    updatedDate: Date;
    featuredImage: JSX.Element;
    featuredImageUrl: string;
    category: {
      id: string;
      title: string;
    };
  };

  meta: {
    title: string;
    description: string;
  };
}

export const formatArticlePage = (
  page: Simplify<ArticleDocument>
): ArticlePage => {
  const { data } = page;

  const content = {
    title: data.title,
    url: `/blog/${page.uid}`,
    body: data.content,
    author: {
      name: data.author_name || "TutorCruncher",
      image: data.author_image ? (
        <PrismicNextImage field={data.author_image} />
      ) : (
        <Image src="/img/placeholder.webp" width={100} height={100} alt={""} />
      ),
    },
    createdDate: new Date(page.first_publication_date),
    publishedDate: new Date(data.publishDate),
    updatedDate: new Date(page.last_publication_date),
    featuredImage: <PrismicNextImage field={data.featured_image} />,
    featuredImageUrl: data.featured_image.url,
    category: {
      // @ts-ignore
      id: data.category.id,
      // @ts-ignore
      title: data.category.data.title,
    },
  };

  const meta = {
    title: data.meta_title,
    description: data.meta_description,
  };

  return { content, meta };
};
