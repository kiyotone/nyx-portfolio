import * as React from "react";
import { cn } from "@/utils/cn";
import { Typography } from "@/components/atoms/Typography";
import type { BreadcrumbsProps } from "./Breadcrumbs.types";

const ChevronRightIcon = () => (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

export const Breadcrumbs = React.forwardRef<HTMLElement, BreadcrumbsProps>(
  ({ className, items, separator = <ChevronRightIcon />, maxItems, ...props }, ref) => {
    let displayItems = items;

    if (maxItems && items.length > maxItems) {
      const firstItem = items[0];
      const lastItems = items.slice(-(maxItems - 1));
      displayItems = [firstItem, { label: "..." }, ...lastItems];
    }

    return (
      <nav
        ref={ref}
        aria-label="Breadcrumb"
        className={cn("flex items-center gap-2 text-sm", className)}
        {...props}
      >
        <ol className="flex items-center gap-2">
          {displayItems.map((item, index) => {
            const isLast = index === displayItems.length - 1;
            const isEllipsis = item.label === "...";

            return (
              <li key={index} className="flex items-center gap-2">
                {item.href && !isEllipsis ? (
                  <a
                    href={item.href}
                    className={cn(
                      "hover:text-foreground transition-colors",
                      isLast ? "text-foreground font-medium" : "text-muted-foreground"
                    )}
                  >
                    <Typography variant="bodySmall">{item.label}</Typography>
                  </a>
                ) : (
                  <Typography
                    variant="bodySmall"
                    className={cn(isLast ? "text-foreground font-medium" : "text-muted-foreground")}
                  >
                    {item.label}
                  </Typography>
                )}

                {!isLast && <span className="text-muted-foreground/50">{separator}</span>}
              </li>
            );
          })}
        </ol>
      </nav>
    );
  }
);

Breadcrumbs.displayName = "Breadcrumbs";
