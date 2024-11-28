export const filterHeadings = (data: any[]): any[] => {
  const headingTexts = data
    .filter((item) => item.type.startsWith("heading"))
    .map((item) => {
      const level = Number(item.type.replace("heading", ""));
      return { text: item.text, level };
    });
  return headingTexts;
};

export const createID = (string: string) => {
  return string
    .toLowerCase()
    .replace(/[^\w\s]/gi, "")
    .replace(/\s+/g, "-");
};
