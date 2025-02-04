import { createClient } from "prismicio";
import { Body } from "@/components/ui/body";
import Link from "next/link";
import { Heading } from "@/components/ui/heading";
import { PrismicDocument } from "@prismicio/client";
import { formatMetaData } from "@/helpers/metaData";
import { Metadata } from "next";

const BASE_URL = "https://tutorcruncher.com";

export async function generateMetadata(): Promise<Metadata> {
  const url = `https://tutorcruncher.com`;

  return formatMetaData("Sitemap | TutorCruncher", "", url);
}

function formatTitle(input: string, capitalise: boolean) {
  const formatted = input.replace(/-/g, " ");
  return capitalise
    ? formatted.toUpperCase()
    : formatted.charAt(0).toUpperCase() + formatted.slice(1);
}

function formatEntries(
  docs: PrismicDocument[],
  parent: { title: string; url: string } | null,
  pathFormatter: (doc: PrismicDocument) => string,
  prefix = "",
  capitalise = false
) {
  const children = docs.map((doc) => ({
    title: `${prefix}${formatTitle(doc.uid, capitalise)}`,
    url: `${BASE_URL}/${pathFormatter(doc)}`,
  }));

  return parent
    ? {
        parent,
        children,
      }
    : children;
}

function renderEntries(entries) {
  return entries.map((entry) => (
    <li key={entry.parent ? entry.parent.title : entry.title}>
      {entry.children ? (
        <>
          <Link href={entry.parent.url}>{entry.parent.title}</Link>
          <ul>{renderEntries(entry.children)}</ul>
        </>
      ) : (
        <Link href={entry.url}>{entry.title}</Link>
      )}
    </li>
  ));
}

export default async function sitemap() {
  const client = createClient();

  const [pages, pricing, features, solutions, articles] = await Promise.all([
    client.getAllByType("page"),
    client.getAllByType("pricing"),
    client.getAllByType("feature"),
    client.getAllByType("solutions"),
    client.getAllByType("article"),
  ]);

  const landingPages = [
    { title: "Home Page", url: "/" },
    { title: "Features", url: "/features" },
    { title: "Integrations", url: "/integrations" },
    { title: "Contact", url: "/contact" },
    { title: "Reviews", url: "/reviews" },
    { title: "Changes", url: "/changes" },
  ];

  const allEntries = [
    ...landingPages,
    // @ts-expect-error - pages nested with no parent
    ...formatEntries(pages, null, (doc) => `${doc.uid}`),
    formatEntries(
      solutions,
      { title: "Solutions", url: "/solutions" },
      (doc) => `solutions/${doc.uid}`
    ),
    formatEntries(
      features,
      { title: "Features", url: "/features" },
      (doc) => `features/${doc.uid}`
    ),
    formatEntries(
      pricing,
      { title: "Pricing", url: "/pricing" },
      (doc) => `pricing/${doc.uid}`,
      "Pricing - ",
      true
    ),
    {
      parent: { title: "Knowledge Hub", url: "/blog" },
      children: formatEntries(articles, null, (doc) => `blog/${doc.uid}`),
    },
  ];

  return (
    <Body>
      <Heading size={"xlarge"} variant="h1" center>
        Sitemap
      </Heading>
      <div className="main-content">
        <ul>{renderEntries(allEntries)}</ul>
      </div>
    </Body>
  );
}
