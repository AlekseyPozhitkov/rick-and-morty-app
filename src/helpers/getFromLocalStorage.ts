export const getFromLocalStorage = <T>(itemName: string): T => {
  const result = localStorage.getItem(itemName);

  return result ? JSON.parse(result) : {};
};
