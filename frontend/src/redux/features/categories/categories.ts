export type CategoryType = "expense" | "income";

export interface Category {
  name: string;
  type: CategoryType;
  id: number;
}
