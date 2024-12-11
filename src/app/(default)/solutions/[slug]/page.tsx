import { SliceZone } from "@prismicio/react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { components } from "slices";

import { fetchAllSolutions, fetchSolutionByUid } from "@/lib/prismic/solution";
import { formatMetaData } from "@/helpers/metaData";
import { RenderSchema } from "@/components/schema";
import { fetchSchema } from "@/lib/prismic/helpers";

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

    //@ts-expect-error - TODO
    const schema = await fetchSchema(content.data.schema);
    return (
      <>
        <RenderSchema schema={schema} />
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
