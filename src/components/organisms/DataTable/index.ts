/**
 * DataTable Organism
 *
 * A feature-rich data table with sorting, pagination, row selection,
 * and custom cell rendering.
 *
 * @example
 * ```tsx
 * import { DataTable } from "@/components/organisms/DataTable";
 * import { Badge } from "@/components/atoms/Badge";
 *
 * const columns = [
 *   { key: "name", label: "Name", sortable: true },
 *   { key: "email", label: "Email", sortable: true },
 *   {
 *     key: "status",
 *     label: "Status",
 *     render: (value) => (
 *       <Badge variant={value === "active" ? "success" : "secondary"}>
 *         {value}
 *       </Badge>
 *     )
 *   },
 * ];
 *
 * <DataTable
 *   columns={columns}
 *   data={users}
 *   sortable
 *   paginated
 *   selectable
 *   onRowClick={(row) => console.log(row)}
 * />
 * ```
 */

export { DataTable } from "./DataTable";
export type { DataTableProps, Column } from "./DataTable.types";
