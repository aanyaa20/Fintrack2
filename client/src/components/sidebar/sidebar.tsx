import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { PROTECTED_ROUTES } from "@/routes/common/routePath";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Receipt,
  FileText,
  Settings,
  ChevronRight,
} from "lucide-react";
import Logo from "../logo/logo";
import { Button } from "../ui/button";

const Sidebar = () => {
  const { pathname } = useLocation();
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const routes = [
    {
      href: PROTECTED_ROUTES.OVERVIEW,
      label: t("navbar.overview"),
      icon: LayoutDashboard,
    },
    {
      href: PROTECTED_ROUTES.TRANSACTIONS,
      label: t("navbar.transactions"),
      icon: Receipt,
    },
    {
      href: PROTECTED_ROUTES.REPORTS,
      label: t("navbar.reports"),
      icon: FileText,
    },
    {
      href: PROTECTED_ROUTES.SETTINGS,
      label: t("navbar.settings"),
      icon: Settings,
    },
  ];

  return (
    <>
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 bottom-0 bg-[var(--secondary-dark-color)] text-white transition-all duration-300 z-40 border-r border-white/10",
          isOpen ? "w-64" : "w-40"
        )}
      >
        {/* Logo - Always shown */}
        <div className="flex items-center justify-center px-4 py-5 border-b border-white/10">
          <Logo />
        </div>

        {/* Toggle Button */}
        <div className="absolute -right-3 top-24">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            className="h-6 w-6 rounded-full !bg-cyan-500 hover:!bg-cyan-600 !text-white shadow-lg"
          >
            <ChevronRight
              className={cn(
                "h-4 w-4 transition-transform duration-300",
                isOpen && "rotate-180"
              )}
            />
          </Button>
        </div>

        {/* Navigation Links */}
        <nav className={cn("flex flex-col gap-1 mt-4", isOpen ? "px-3" : "px-2")}>
          {routes.map((route) => {
            const Icon = route.icon;
            const isActive = pathname === route.href;

            return (
              <NavLink
                key={route.href}
                to={route.href}
                className={cn(
                  "flex items-center rounded-lg transition-all duration-200 group relative",
                  "hover:bg-white/10",
                  isOpen ? "gap-3 px-3 py-3" : "justify-center px-2 py-3",
                  isActive && "bg-cyan-500/20 text-cyan-400",
                  !isActive && "text-white/60 hover:text-white"
                )}
              >
                <Icon
                  className={cn(
                    "h-5 w-5 flex-shrink-0",
                    isActive && "text-cyan-400"
                  )}
                />
                {isOpen && (
                  <span className="font-medium text-sm">{route.label}</span>
                )}
                {!isOpen && (
                  <div className="absolute left-full ml-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-md opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg z-50">
                    {route.label}
                  </div>
                )}
              </NavLink>
            );
          })}
        </nav>
      </aside>

      {/* Spacer for content */}
      <div
        className={cn(
          "transition-all duration-300 flex-shrink-0",
          isOpen ? "w-64" : "w-40"
        )}
      />
    </>
  );
};

export default Sidebar;
