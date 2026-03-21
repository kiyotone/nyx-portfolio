/**
 * Dashboard Organism
 *
 * A complete dashboard layout with header, stats grid, filters,
 * and content area.
 *
 * @example
 * ```tsx
 * import { Dashboard } from "@/components/organisms/Dashboard";
 * import { Button } from "@/components/atoms/Button";
 * import { DataTable } from "@/components/organisms/DataTable";
 *
 * const stats = [
 *   {
 *     id: "revenue",
 *     label: "Total Revenue",
 *     value: "$45,231",
 *     change: { value: "+20.1%", trend: "up", label: "from last month" },
 *     icon: <DollarIcon />
 *   },
 *   {
 *     id: "users",
 *     label: "Active Users",
 *     value: "2,350",
 *     change: { value: "+180", trend: "up" },
 *   },
 * ];
 *
 * const filters = [
 *   { label: "All Time", value: "all", active: true },
 *   { label: "Last 30 Days", value: "30d" },
 *   { label: "Last 7 Days", value: "7d" },
 * ];
 *
 * <Dashboard
 *   title="Analytics Dashboard"
 *   description="Monitor your business metrics and performance"
 *   stats={stats}
 *   filters={filters}
 *   headerActions={
 *     <>
 *       <Button variant="outline">Export</Button>
 *       <Button variant="primary">Create Report</Button>
 *     </>
 *   }
 * >
 *   <DataTable columns={columns} data={data} />
 * </Dashboard>
 * ```
 */

export { Dashboard } from "./Dashboard";
export type { DashboardProps, DashboardStat, DashboardFilter, Breadcrumb } from "./Dashboard.types";
