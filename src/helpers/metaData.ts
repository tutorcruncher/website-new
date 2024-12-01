import { BASE_META } from "@/schema/meta";

export const formatMetaData = (
  title: string,
  description: string,
  url: string
) => {
  return {
    title: title || "TutorCruncher",
    description,
    twitter: {
      ...BASE_META.twitter,
      title,
      description,
    },
    openGraph: {
      ...BASE_META.openGraph,
      url,
      title,
      description,
    },
    alternates: {
      canonical: url,
    },
  };
};
