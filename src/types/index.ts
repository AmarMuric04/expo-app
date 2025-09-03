declare global {
  type ShoppingListItemType = {
    completedAt: number | null;
    name: string;
    id: string;
  };
}
