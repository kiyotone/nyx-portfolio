/**
 * StatCard Molecule
 *
 * A card component for displaying statistics with optional trend indicators,
 * icons, and descriptions.
 *
 * @example
 * ```tsx
 * import { StatCard } from "@/components/molecules/StatCard";
 *
 * <StatCard
 *   label="Total Revenue"
 *   value="$45,231"
 *   change={{ value: "+20.1%", trend: "up", label: "from last month" }}
 *   description="Total revenue this quarter"
 *   icon={<DollarIcon />}
 * />
 *
 * <StatCard
 *   label="Active Users"
 *   value="2,350"
 *   change={{ value: "-5.4%", trend: "down" }}
 *   badge={{ label: "Live", variant: "success" }}
 *   isLoading={false}
 * />
 * ```
 */

export { StatCard } from "./StatCard";
export type { StatCardProps } from "./StatCard.types";
