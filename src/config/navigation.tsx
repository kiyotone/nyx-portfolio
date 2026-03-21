import type { NavItemProps } from "@/components/molecules/NavItem";
import { BarChart3, HelpCircle, Home, Settings } from "lucide-react";

export const mainNavigation: NavItemProps[] = [
  {
    label: "Home",
    href: "/",
    icon: <Home className="h-4 w-4" />, // ← JSX element!
  },

  {
    label: "Login",
    href: "login",
    icon: <Settings className="h-4 w-4" />,
  },
];

export const secondaryNavigation: NavItemProps[] = [
  {
    label: "Help",
    href: "/help",
    icon: <HelpCircle className="h-4 w-4" />,
  },
  {
    label: "Settings",
    href: "/settings",
    icon: <Settings className="h-4 w-4" />,
  },
];
