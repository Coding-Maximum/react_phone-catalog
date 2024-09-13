import { RoutesLink } from "../types/routes";

export const getCategoryRoute = (categoryName: string): string => {
  switch (categoryName) {
    case "Phones":
      return RoutesLink.PhonesPage;
    case "Tablets":
      return RoutesLink.TabletsPage;
    case "Accessories":
      return RoutesLink.AccessoriesPage;
    default:
      return RoutesLink.HomePage;
  }
};
