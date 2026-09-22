import type { Category } from "@/lib/mock-data";
import { categoryColor } from "@/lib/category-colors";

export function CategoryTag({ category }: { category: Category }) {
  const color = categoryColor[category];
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-xs font-medium"
      style={{ color, borderColor: `${color}4D`, backgroundColor: `${color}1A` }}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: color }} />
      {category}
    </span>
  );
}
