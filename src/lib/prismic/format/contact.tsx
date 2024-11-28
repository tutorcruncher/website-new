import { PrismicRichText } from "@prismicio/react";

import {
  ContactDocumentData,
  ContactDocumentDataLocationsItem,
  Simplify,
} from "../../../../prismicio-types";

export const formatContactPage = (data: Simplify<ContactDocumentData>) => {
  const content = <PrismicRichText field={data.content} />;

  const locations = data.locations.map(
    (location: ContactDocumentDataLocationsItem) => ({
      name: location.name,
      address: <PrismicRichText field={location.address} />,
      phoneNumber: location.phone_number,
      email: location.email,
      openingHours: <PrismicRichText field={location.opening_hours} />,
      map: location.map.text,
    }),
  );

  const meta = {
    title: data.meta_title,
    description: data.meta_description,
  };

  return { content, locations, meta };
};