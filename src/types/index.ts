declare global {
  type ShoppingListItemType = {
    completedAt: number | null;
    updatedAt: number | null;
    name: string;
    id: string;
  };
}
