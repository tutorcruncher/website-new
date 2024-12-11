import { createClient } from "@/lib/prismic/prismicio";
import { SchemaDocument } from "../../../prismicio-types";
import { RichTextField } from "@prismicio/types";

export const fetchSchema = async (schemaField: {
  id: string;
}): Promise<RichTextField> => {
  const client = createClient();
  const schemaId = schemaField?.id;
  if (schemaId) {
    const schemaDocument: SchemaDocument = await client.getByID(schemaId);
    const schemaScript = schemaDocument.data.schema_script;
    // @ts-expect-error TODO
    return JSON.parse(schemaScript[0].text);
  }
  return null;
};
