import type { Category } from "./mock-data";

/**
 * Fixed categorical hue order — never cycled or reassigned when the
 * category list is filtered. Validated (dataviz skill) against
 * --surface-2 (#171B21): all pairs pass contrast + CVD separation.
 */
export const categoryColor: Record<Category, string> = {
  LLM: "#3987e5", // blue — categorical slot 1
  Vision: "#d95926", // orange — slot 2
  Speech: "#199e70", // aqua — slot 3
  Data: "#c98500", // yellow — slot 4
  "Agent Tools": "#9085e9", // violet — slot 7 (kept distinct from status colors)
};
