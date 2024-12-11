import { OptionalExtra } from "./types";

export function groupByCategory(
  items: OptionalExtra[]
): Record<string, OptionalExtra[]> {
  const customOrder = [
    "Payments",
    "Lessons & Communications",
    "Customisation",
    "Support options",
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
    {} as Record<string, OptionalExtra[]>
  );

  const sortedGroupedItems = customOrder.reduce(
    (sortedAcc, category) => {
      if (groupedItems[category]) {
        sortedAcc[category] = groupedItems[category];
      }
      return sortedAcc;
    },
    {} as Record<string, OptionalExtra[]>
  );

  return sortedGroupedItems;
}
