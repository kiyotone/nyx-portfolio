"use client"; // <-- Add this at the top!

import * as React from "react";
import { usePathname } from "next/navigation"; // <-- Add this import
import { cn } from "@/utils/cn";
import { Typography } from "@/components/atoms/Typography";
import { Badge } from "@/components/atoms/Badge";
import type { NavItemProps } from "./NavItem.types";

const ExternalLinkIcon = () => (
  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
    />
  </svg>
);

export const NavItem = React.forwardRef<HTMLElement, NavItemProps>(
  (
    {
      className,
      label,
      href,
      onClick,
      icon,
      iconRight,
      active, // <-- Now optional, auto-detected if not provided
      badge,
      disabled = false,
      variant = "default",
      size = "default",
      external = false,
      collapsed = false,
      exactMatch = false, // <-- New prop for exact path matching
      ...props
    },
    ref
  ) => {
    const pathname = usePathname(); // <-- Get current route

    // Auto-detect active state if not explicitly provided
    const isActive = React.useMemo(() => {
      if (active !== undefined) return active; // Use explicit value if provided
      if (!href) return false; // No href = not a link

      // Exact match: /dashboard only matches /dashboard
      if (exactMatch) return pathname === href;

      // Prefix match: /dashboard matches /dashboard, /dashboard/settings, etc.
      return pathname.startsWith(href);
    }, [active, href, pathname, exactMatch]);

    const variantStyles = {
      default: cn(
        "text-foreground/70 hover:text-foreground hover:bg-muted/50",
        isActive && "bg-muted text-foreground font-medium" // <-- Use isActive
      ),
      ghost: cn(
        "text-foreground/60 hover:text-foreground hover:bg-transparent",
        isActive && "text-foreground font-medium"
      ),
      primary: cn(
        "text-foreground/70 hover:text-foreground hover:bg-primary/10",
        isActive && "bg-primary text-primary-foreground font-medium"
      ),
    };

    const sizeStyles = {
      sm: "px-3 py-1.5 text-sm gap-2",
      default: "px-3 py-2 text-sm gap-2.5",
      lg: "px-4 py-3 text-base gap-3",
    };

    const baseStyles = cn(
      "flex items-center rounded-lg transition-all duration-200",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      sizeStyles[size],
      variantStyles[variant],
      disabled && "opacity-50 cursor-not-allowed pointer-events-none",
      collapsed ? "justify-center" : "justify-start",
      className
    );

    const content = (
      <>
        {icon && <span className={cn("flex-shrink-0", collapsed && "mx-auto")}>{icon}</span>}

        {!collapsed && (
          <span className="flex-1 min-w-0 truncate">
            <Typography variant="bodySmall" className="truncate">
              {label}
            </Typography>
          </span>
        )}

        {!collapsed && badge && (
          <Badge variant={badge.variant} size="sm">
            {badge.label}
          </Badge>
        )}

        {!collapsed && iconRight && <span className="flex-shrink-0">{iconRight}</span>}

        {!collapsed && external && (
          <span className="flex-shrink-0 text-muted-foreground">
            <ExternalLinkIcon />
          </span>
        )}
      </>
    );

    if (href) {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={baseStyles}
          {...(external && { target: "_blank", rel: "noopener noreferrer" })}
          {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {content}
        </a>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type="button"
        onClick={onClick}
        disabled={disabled}
        className={baseStyles}
        {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {content}
      </button>
    );
  }
);

NavItem.displayName = "NavItem";
