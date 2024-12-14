import { SliceZone } from "@prismicio/react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { components } from "slices";

import { fetchAllSolutions, fetchSolutionByUid } from "@/lib/prismic/solution";
import { formatMetaData } from "@/helpers/metaData";
import { RenderSchemas } from "@/components/schema";
import { fetchSchemas } from "@/lib/prismic/helpers";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { data } = await fetchSolutionByUid(params.slug);

  const url = `https://tutorcruncher.com/${params.slug}`;

  return formatMetaData(data.meta_title, data.meta_description, url);
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

    const schemas = await fetchSchemas(content.data.schemas);
    return (
      <>
        <RenderSchemas schemas={schemas} />
        <SliceZone slices={content.data.slices} components={components} />
      </>
    );
  } catch {
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
  } catch {
    console.error("Error fetching documents");
  }
}
