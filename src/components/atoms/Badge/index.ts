/**
 * Badge Atom
 *
 * A versatile badge component for labels, tags, and status indicators
 * with multiple variants, sizes, and optional icons.
 *
 * @example
 * ```tsx
 * import { Badge } from "@/components/atoms/Badge";
 *
 * <Badge variant="primary">New</Badge>
 * <Badge variant="success" dot>Active</Badge>
 * <Badge removable onRemove={() => console.log('removed')}>Tag</Badge>
 * ```
 */
export { Badge } from "./Badge";
export type { BadgeProps } from "./Badge.types";
