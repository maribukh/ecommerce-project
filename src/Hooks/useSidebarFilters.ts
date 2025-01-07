import { useState } from "react";

export const useSidebarFilters = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

  const toggleSelection = (category: string, value: string) => {
    if (category === "categories") {
      setSelectedCategories((prev) =>
        prev.includes(value)
          ? prev.filter((item) => item !== value)
          : [...prev, value]
      );
    } else if (category === "brands") {
      setSelectedBrands((prev) =>
        prev.includes(value)
          ? prev.filter((item) => item !== value)
          : [...prev, value]
      );
    } else if (category === "features") {
      setSelectedFeatures((prev) =>
        prev.includes(value)
          ? prev.filter((item) => item !== value)
          : [...prev, value]
      );
    }
  };

  return {
    selectedCategories,
    selectedBrands,
    selectedFeatures,
    toggleSelection,
  };
};
