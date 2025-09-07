declare global {
  type ShoppingListItemType = {
    updatedAt: number | null;
    completedAt: number | null;
    name: string;
    id: string;
  };
}
