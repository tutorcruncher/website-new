import { Integration } from "./types";

export function groupIntegrationsByCategory(
  items: Integration[],
): Record<string, Integration[]> {
  const customOrder = [
    "Payments",
    "Online Classrooms",
    "Integrations",
    "Single Sign Ons",
  ];

  const groupedItems = items.reduce(
    (acc, item) => {
      const categoryTitle = item.category;

      if (!categoryTitle) {
        return acc;
      }

      if (!acc[categoryTitle]) {
        acc[categoryTitle] = [];
      }

      acc[categoryTitle].push(item);

      return acc;
    },
    {} as Record<string, Integration[]>,
  );

  const sortedGroupedItems = customOrder.reduce(
    (sortedAcc, category) => {
      if (groupedItems[category]) {
        sortedAcc[category] = groupedItems[category];
      }
      return sortedAcc;
    },
    {} as Record<string, Integration[]>,
  );

  return sortedGroupedItems;
}
