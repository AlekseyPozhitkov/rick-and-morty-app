export interface LinkItem {
  path: string;
  title: string;
}

export const LINK_ITEMS: LinkItem[] = [
  {
    path: "/",
    title: "Characters"
  },
  {
    path: "/locations",
    title: "Locations"
  },
  {
    path: "/episodes",
    title: "Episodes"
  }
];
