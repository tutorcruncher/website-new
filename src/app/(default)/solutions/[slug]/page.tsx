import { SliceZone } from "@prismicio/react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { components } from "slices";

import { fetchAllPages, fetchPageByUid } from "@/lib/prismic/pages";
import { BASE_META } from "@/schema/meta";
import { fetchAllSolutions, fetchSolutionByUid } from "@/lib/prismic/solution";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { data } = await fetchSolutionByUid(params.slug);

  const url = `https://tutorcruncher.com/${params.slug}`;

  return {
    title: data.meta_title || "TutorCruncher",
    description: data.meta_description,
    twitter: {
      ...BASE_META.twitter,
      title: data.meta_title,
    },
    openGraph: {
      ...BASE_META.openGraph,
      url,
      title: data.meta_title,
    },
    alternates: {
      canonical: url,
    },
  };
}

export default async function StaticPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  try {
    const content = await fetchSolutionByUid(slug);

    if (!content) {
      return notFound();
    }

    return <SliceZone slices={content.data.slices} components={components} />;
  } catch (error) {
    console.error("Error rendering content:", error);
    return notFound();
  }
}

export async function generateStaticParams() {
  try {
    const pages = await fetchAllSolutions();
    const documents = pages.map((document) => ({
      uid: document.uid,
    }));
    return documents;
  } catch (error) {
    console.error("Error fetching documents");
  }
}
