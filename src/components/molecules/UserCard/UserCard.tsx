import { Avatar } from "@/components/atoms/Avatar";
import { Badge } from "@/components/atoms/Badge";
import { Typography } from "@/components/atoms/Typography";
import { cn } from "@/utils/cn";
import * as React from "react";
import type { UserCardProps } from "./UserCard.types";

const UserCard = React.forwardRef<HTMLDivElement, UserCardProps>(
  (
    {
      className,
      avatarSrc,
      name,
      title,
      email,
      avatarSize = "md",
      status,
      badge,
      action,
      ...props
    },
    ref
  ) => {
    // Get initials from name
    const getInitials = (name: string) => {
      return name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    };

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center gap-3 p-3 rounded-lg border border-border bg-card hover:bg-accent/50 transition-colors",
          className
        )}
        {...props}
      >
        <Avatar
          src={avatarSrc}
          fallback={getInitials(name)}
          size={avatarSize}
          status={status}
          alt={name}
        />

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <Typography variant="body" weight="medium" className="truncate text-foreground">
              {name}
            </Typography>
            {badge && (
              <Badge variant={badge.variant} size="sm">
                {badge.label}
              </Badge>
            )}
          </div>

          {title && (
            <Typography variant="bodySmall" className="text-muted-foreground truncate">
              {title}
            </Typography>
          )}

          {email && (
            <Typography variant="bodySmall" className="text-muted-foreground truncate">
              {email}
            </Typography>
          )}
        </div>

        {action && <div className="flex-shrink-0">{action}</div>}
      </div>
    );
  }
);

UserCard.displayName = "UserCard";

export { UserCard };
