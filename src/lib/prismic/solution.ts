import { createClient } from "prismicio";

export const fetchAllSolutions = async () => {
  const client = createClient();
  try {
    const pages = await client.getAllByType("solutions");
    return pages;
  } catch (error) {
    console.error("Error fetching solutions:", error);
    return [];
  }
};

export const fetchSolutionByUid = async (uid: string) => {
  const client = createClient();
  try {
    return await client.getByUID("solutions", uid);
  } catch (error) {
    console.error("Error fetching solution:", error);
  }
};
