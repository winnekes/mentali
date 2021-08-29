import { IconType } from "react-icons";
import { BiNetworkChart, BiHome, BiLogIn, BiLogOut, BiSpa, BiCog } from "react-icons/bi";

export const PAGES = {
  root: "/",
  oasis: "/oasis",
  insights: "/insights",
  settings: "/settings",
};

export interface NavigationItem {
  label: string;
  icon: IconType;
  href: string;
  type: "internal" | "external";
}

export const authNavigationItems: NavigationItem[] = [
  {
    label: "Oasis",
    icon: BiSpa,
    href: PAGES.oasis,
    type: "internal",
  },
  {
    label: "Insights",
    icon: BiNetworkChart,
    href: PAGES.insights,
    type: "internal",
  },
  {
    label: "Settings",
    icon: BiCog,
    href: PAGES.settings,
    type: "internal",
  },
  {
    label: "Logout",
    icon: BiLogOut,
    href: "/api/auth/logout",
    type: "external",
  },
];

export const openNavigationItems: NavigationItem[] = [
  {
    label: "Home",
    icon: BiHome,
    href: PAGES.root,
    type: "internal",
  },
  {
    label: "Sign in",
    icon: BiLogIn,
    href: "/api/auth/login",
    type: "external",
  },
];
