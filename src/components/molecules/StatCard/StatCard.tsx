import { Badge } from "@/components/atoms/Badge";
import { Spinner } from "@/components/atoms/Spinner";
import { Typography } from "@/components/atoms/Typography";
import { cn } from "@/utils/cn";
import * as React from "react";
import type { StatCardProps } from "./StatCard.types";

const TrendUpIcon = () => (
  <svg
    className="h-4 w-4"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);

const TrendDownIcon = () => (
  <svg
    className="h-4 w-4"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
    <polyline points="17 18 23 18 23 12" />
  </svg>
);

const TrendNeutralIcon = () => (
  <svg
    className="h-4 w-4"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const InfoIcon = () => (
  <svg
    className="h-4 w-4"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
);

const StatCard = React.forwardRef<HTMLDivElement | HTMLAnchorElement, StatCardProps>(
  (props, ref) => {
    const {
      className,
      value,
      label,
      icon,
      change,
      description,
      badge,
      isLoading = false,
      variant = "default",
      size = "default",
      footer,
      tooltip,
      status,
      ...restProps
    } = props;

    const trendColors = {
      up: "text-green-700 dark:text-green-400",
      down: "text-red-700 dark:text-red-400",
      neutral: "text-gray-700 dark:text-gray-300",
    };

    const trendBgColors = {
      up: "bg-green-100 dark:bg-green-900/40",
      down: "bg-red-100 dark:bg-red-900/40",
      neutral: "bg-gray-100 dark:bg-gray-800/40",
    };

    const variantStyles = {
      default: "bg-card border-border",
      primary: "bg-primary/5 border-primary/20",
      success: "bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-900",
      warning: "bg-yellow-50 dark:bg-yellow-950/20 border-yellow-200 dark:border-yellow-900",
      danger: "bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-900",
      info: "bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900",
    };

    const sizeStyles = {
      sm: "p-4",
      default: "p-6",
      lg: "p-8",
    };

    const cardContent = (
      <>
        {/* Header Section */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <Typography variant="bodySmall" className="text-muted-foreground font-medium">
                {label}
              </Typography>
              {badge && (
                <Badge variant={badge.variant} size="sm">
                  {badge.label}
                </Badge>
              )}
              {tooltip && (
                <button
                  type="button"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  title={tooltip}
                >
                  <InfoIcon />
                </button>
              )}
            </div>

            {/* Value */}
            {isLoading ? (
              <div className="py-3">
                <Spinner size="md" />
              </div>
            ) : (
              <div className="flex items-baseline gap-2 flex-wrap">
                <Typography variant="h2" weight="bold" className="mb-1">
                  {value}
                </Typography>
                {status && (
                  <span
                    className={cn(
                      "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium",
                      status.type === "success" &&
                        "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
                      status.type === "warning" &&
                        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
                      status.type === "error" &&
                        "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
                      status.type === "info" &&
                        "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                    )}
                  >
                    {status.label}
                  </span>
                )}
              </div>
            )}

            {/* Change Indicator */}
            {change && !isLoading && (
              <div
                className={cn(
                  "inline-flex items-center gap-1.5 mt-2 px-2.5 py-1.5 rounded-md",
                  change.trend && trendBgColors[change.trend]
                )}
              >
                {change.trend === "up" && <TrendUpIcon />}
                {change.trend === "down" && <TrendDownIcon />}
                {change.trend === "neutral" && <TrendNeutralIcon />}
                <Typography
                  variant="bodySmall"
                  weight="semibold"
                  className={cn(change.trend ? trendColors[change.trend] : "text-muted-foreground")}
                >
                  {change.value}
                </Typography>
                {change.label && (
                  <Typography
                    variant="bodySmall"
                    className={cn(
                      change.trend ? trendColors[change.trend] : "text-muted-foreground"
                    )}
                  >
                    {change.label}
                  </Typography>
                )}
              </div>
            )}

            {/* Description */}
            {description && !isLoading && (
              <Typography variant="bodySmall" className="text-muted-foreground mt-2 line-clamp-2">
                {description}
              </Typography>
            )}
          </div>

          {/* Icon */}
          {icon && (
            <div className="flex-shrink-0 p-3 rounded-xl bg-primary/10 text-primary">{icon}</div>
          )}
        </div>

        {/* Footer Section */}
        {footer && !isLoading && <div className="mt-4 pt-4 border-t border-border">{footer}</div>}
      </>
    );

    // Check if it's a link variant
    if ("href" in restProps && restProps.href) {
      const { href, onClick, ...anchorProps } = restProps as Extract<
        StatCardProps,
        { href: string }
      >;

      const isClickable = !!(href || onClick);

      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          onClick={onClick as React.MouseEventHandler<HTMLAnchorElement> | undefined}
          className={cn(
            "rounded-xl border shadow-sm transition-all duration-200",
            variantStyles[variant],
            sizeStyles[size],
            isClickable && [
              "cursor-pointer hover:shadow-md hover:scale-[1.02] active:scale-[0.98]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            ],
            className
          )}
          {...anchorProps}
        >
          {cardContent}
        </a>
      );
    }

    // Div variant
    const { onClick, ...divProps } = restProps as Extract<StatCardProps, { href?: never }>;

    const isClickable = !!onClick;

    return (
      <div
        ref={ref as React.Ref<HTMLDivElement>}
        onClick={onClick as React.MouseEventHandler<HTMLDivElement> | undefined}
        className={cn(
          "rounded-xl border shadow-sm transition-all duration-200",
          variantStyles[variant],
          sizeStyles[size],
          isClickable && [
            "cursor-pointer hover:shadow-md hover:scale-[1.02] active:scale-[0.98]",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          ],
          className
        )}
        {...divProps}
      >
        {cardContent}
      </div>
    );
  }
);

StatCard.displayName = "StatCard";

export { StatCard };
