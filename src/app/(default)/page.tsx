import { SliceZone } from "@prismicio/react";
import { Metadata } from "next/types";
import { components } from "slices";

import { HomePageHero } from "@/components/features/home-page-hero";
import { ReadyToGetStarted } from "@/components/features/ready-to-get-started";
import { formatMetaData } from "@/helpers/metaData";
import { fetchHomePage } from "@/lib/prismic/home";

export async function generateMetadata({ params }): Promise<Metadata> {
  const { meta } = await fetchHomePage();

  const url = `https://tutorcruncher.com/${params.slug}`;

  return formatMetaData(meta.title, meta.description, url);
}

export default async function Index() {
  const { heading, intro, slices } = await fetchHomePage();

  return (
    <>
      <HomePageHero heading={heading} intro={intro} />
      <SliceZone slices={slices} components={components} />
      <ReadyToGetStarted />
    </>
  );
}
