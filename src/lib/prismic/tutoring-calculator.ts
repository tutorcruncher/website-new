import { createClient } from "prismicio";

import { fetchSchemas } from "@/lib/prismic/helpers";
import { formatTutoringCalculatorPage } from "./format/tutoringCalculator";

export const fetchTutoringCalculatorPage = async () => {
  const client = createClient();
  try {
    const { data } = await client.getSingle("tutoring_calculator");
    const schemas = await fetchSchemas(data.schemas);
    return formatTutoringCalculatorPage(data, schemas);
  } catch (error) {
    console.error("Error fetching tutoring calculator page:", error);
  }
};
