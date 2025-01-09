import * as prismic from "@prismicio/client";
import * as prismicNext from "@prismicio/next";

import { AllDocumentTypes } from "../../../prismicio-types";

export const repositoryName = process.env.NEXT_PUBLIC_PRISMIC_ENVIRONMENT;

let client: prismic.Client<AllDocumentTypes>;

export const createClient = (config: prismicNext.CreateClientConfig = {}) => {
  if (!client) {
    client = prismic.createClient(repositoryName, {
      fetchOptions: {
        next: { revalidate: 0, tags: ["prismic"] },
        cache: "force-cache",
      },
      ...config,
    });

    prismicNext.enableAutoPreviews({ client });
  }

  return client;
};
