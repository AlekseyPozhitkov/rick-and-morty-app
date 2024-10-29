export const getItemById = (state, itemId, itemType) => {
  switch (itemType) {
    case "character":
      return state.characters.items.find((item) => item.id === itemId) || null;
    case "location":
      return state.locations.items.find((item) => item.id === itemId) || null;
    case "episode":
      return state.episodes.items.find((item) => item.id === itemId) || null;
    default:
      return null;
  }
};