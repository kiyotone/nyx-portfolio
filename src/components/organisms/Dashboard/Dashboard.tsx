import * as React from "react";
import { cn } from "@/utils/cn";
import { Typography } from "@/components/atoms/Typography";
import { Button } from "@/components/atoms/Button";
import { StatCard } from "@/components/molecules/StatCard";
import type { DashboardProps } from "./Dashboard.types";

const Dashboard = React.forwardRef<HTMLDivElement, DashboardProps>(
  (
    {
      className,
      title = "Dashboard",
      description,
      breadcrumbs,
      stats = [],
      statsColumns = 4,
      children,
      headerActions,
      isLoading = false,
      filters,
      sidebar,
      fullWidth = false,
      ...props
    },
    ref
  ) => {
    const gridColsClasses = {
      1: "grid-cols-1",
      2: "grid-cols-1 md:grid-cols-2",
      3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
      4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
    };

    return (
      <div ref={ref} className={cn("flex min-h-screen w-full", className)} {...props}>
        {/* Sidebar (if provided) */}
        {sidebar && <aside className="hidden w-64 border-r bg-muted/30 lg:block">{sidebar}</aside>}

        {/* Main Content */}
        <div className="flex flex-1 flex-col">
          <div className={cn("mx-auto w-full", fullWidth ? "max-w-none" : "max-w-7xl")}>
            <div className="flex flex-col gap-6 p-4 md:p-6 lg:p-8">
              {/* Breadcrumbs */}
              {breadcrumbs && breadcrumbs.length > 0 && (
                <nav className="flex items-center gap-2 text-sm text-muted-foreground">
                  {breadcrumbs.map((crumb, index) => (
                    <React.Fragment key={index}>
                      {index > 0 && <span className="text-muted-foreground/50">/</span>}
                      {crumb.href ? (
                        <a href={crumb.href} className="hover:text-foreground transition-colors">
                          {crumb.label}
                        </a>
                      ) : (
                        <span
                          className={cn(
                            index === breadcrumbs.length - 1 && "text-foreground font-medium"
                          )}
                        >
                          {crumb.label}
                        </span>
                      )}
                    </React.Fragment>
                  ))}
                </nav>
              )}

              {/* Header */}
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div className="flex-1 space-y-1">
                  <Typography variant="h1" weight="bold">
                    {title}
                  </Typography>
                  {description && (
                    <Typography variant="body" className="text-muted-foreground max-w-2xl">
                      {description}
                    </Typography>
                  )}
                </div>

                {headerActions && (
                  <div className="flex flex-wrap items-center gap-2">{headerActions}</div>
                )}
              </div>

              {/* Filters/Tabs */}
              {filters && filters.length > 0 && (
                <div className="flex items-center gap-2 overflow-x-auto pb-2 -mx-1 px-1">
                  {filters.map((filter) => (
                    <Button
                      key={filter.value}
                      variant={filter.active ? "primary" : "ghost"}
                      size="sm"
                      onClick={filter.onClick}
                      disabled={filter.disabled}
                      className={cn(filter.active && "shadow-sm", "whitespace-nowrap")}
                    >
                      {filter.label}
                      {filter.count !== undefined && (
                        <span
                          className={cn(
                            "ml-2 rounded-full px-2 py-0.5 text-xs",
                            filter.active ? "bg-white/20" : "bg-muted"
                          )}
                        >
                          {filter.count}
                        </span>
                      )}
                    </Button>
                  ))}
                </div>
              )}

              {/* Stats Grid */}
              {stats.length > 0 && (
                <div className={cn("grid gap-4 md:gap-6", gridColsClasses[statsColumns])}>
                  {stats.map((stat) => (
                    <StatCard
                      key={stat.id}
                      label={stat.title}
                      value={stat.value}
                      change={stat.change}
                      icon={stat.icon}
                      isLoading={isLoading || stat.isLoading}
                      {...(stat.href && { href: stat.href })}
                    />
                  ))}
                </div>
              )}

              {/* Main Content */}
              {children && <div className="flex flex-col gap-6">{children}</div>}
            </div>
          </div>
        </div>
      </div>
    );
  }
);

Dashboard.displayName = "Dashboard";

export { Dashboard };
