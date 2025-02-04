import { SliceZone } from "@prismicio/react";
import { PrismicRichText } from "@prismicio/react";
import { Metadata } from "next/types";
import { components } from "slices";

import { ReleasesList } from "@/components/features/releases/releases-list";
import { Body } from "@/components/ui/body";
import { formatMetaData } from "@/helpers/metaData";
import { createClient } from "prismicio";

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const { data } = await client.getSingle("releases");

  const url = `https://tutorcruncher.com/changes`;

  return formatMetaData(data.meta_title, data.meta_description, url);
}

export default async function Index() {
  const client = createClient();
  const { data } = await client.getSingle("releases");
  const releases = await client.getAllByType("release");

  const formattedReleases = releases.map((release) => ({
    name: release.data.release_name,
    date: new Date(release.data.date).toLocaleString([], {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }),
    changes: <PrismicRichText field={release.data.changes} />,
  }));

  return (
    <>
      <SliceZone slices={data.slices} components={components} />
      <Body containerSize="small" background="cream">
        <ReleasesList releases={formattedReleases} />
      </Body>
    </>
  );
}
