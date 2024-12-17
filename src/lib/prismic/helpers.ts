import { createClient } from "@/lib/prismic/prismicio";
import { SchemaDocument } from "../../../prismicio-types";
import { RichTextField } from "@prismicio/types";

export const fetchSchemas = async (schemas): Promise<RichTextField[]> => {
  const client = createClient();

  if (!schemas) return null;

  const schemaPromises = schemas.map(async ({ schema }) => {
    const schemaId = schema?.id;
    if (schemaId) {
      try {
        const schemaDocument: SchemaDocument = await client.getByID(schemaId);
        const schemaScript = schemaDocument.data.schema_script;
        // @ts-expect-error TODO
        return JSON.parse(schemaScript[0].text);
      } catch (error) {
        console.error(`Error fetching schema with ID: ${schemaId}`, error);
        return null;
      }
    }
    return null;
  });

  const fetchedSchemas = await Promise.all(schemaPromises);
  return fetchedSchemas.filter((schema) => schema !== null);
};
