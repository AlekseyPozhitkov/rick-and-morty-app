export const setToLocalStorage = (itemName: string, updatedFilters: object) => {
  return localStorage.setItem(itemName, JSON.stringify(updatedFilters));
};
