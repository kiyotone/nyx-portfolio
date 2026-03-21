import * as React from "react";
import { cn } from "@/utils/cn";
import { Button } from "@/components/atoms/Button";
import { Typography } from "@/components/atoms/Typography";
import { Spinner } from "@/components/atoms/Spinner";
import type { DataTableProps, Column } from "./DataTable.types";

const ChevronUpIcon = () => (
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
    <polyline points="18 15 12 9 6 15" />
  </svg>
);

const ChevronDownIcon = () => (
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
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

function DataTableInner<T extends Record<string, unknown>>({
  className,
  columns,
  data,
  isLoading = false,
  emptyMessage = "No data available",
  selectable = false,
  selectedRows = [],
  onSelectionChange,
  rowKey = "id" as keyof T & string,
  onRowClick,
  sortable = false,
  sortConfig,
  onSortChange,
  paginated = false,
  currentPage = 1,
  pageSize = 10,
  totalItems,
  onPageChange,
  ...props
}: DataTableProps<T>) {
  const [internalSelectedRows, setInternalSelectedRows] = React.useState<string[]>([]);

  const selectedRowKeys = selectedRows.length > 0 ? selectedRows : internalSelectedRows;

  const handleSelectAll = () => {
    const allKeys = data.map((row) => String(row[rowKey]));
    const newSelection = selectedRowKeys.length === data.length ? [] : allKeys;

    if (onSelectionChange) {
      onSelectionChange(newSelection);
    } else {
      setInternalSelectedRows(newSelection);
    }
  };

  const handleSelectRow = (key: string) => {
    const newSelection = selectedRowKeys.includes(key)
      ? selectedRowKeys.filter((k) => k !== key)
      : [...selectedRowKeys, key];

    if (onSelectionChange) {
      onSelectionChange(newSelection);
    } else {
      setInternalSelectedRows(newSelection);
    }
  };

  const handleSort = (column: Column<T>) => {
    if (!column.sortable || !onSortChange) return;

    const newDirection =
      sortConfig?.key === column.key && sortConfig.direction === "asc" ? "desc" : "asc";

    onSortChange(column.key, newDirection);
  };

  const getCellValue = (row: T, column: Column<T>): React.ReactNode => {
    const value = row[column.key];
    if (column.render) {
      return column.render(value, row);
    }
    // Handle different value types
    if (value === null || value === undefined) {
      return "-";
    }
    if (typeof value === "boolean") {
      return value ? "Yes" : "No";
    }
    return String(value);
  };

  const totalPages = totalItems
    ? Math.ceil(totalItems / pageSize)
    : Math.ceil(data.length / pageSize);

  const alignmentClasses = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  } as const;

  return (
    <div className={cn("flex flex-col gap-4", className)} {...props}>
      <div className="rounded-lg border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                {selectable && (
                  <th className="w-12 px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedRowKeys.length === data.length && data.length > 0}
                      onChange={handleSelectAll}
                      className="h-4 w-4 rounded border-border"
                    />
                  </th>
                )}
                {columns.map((column) => (
                  <th
                    key={String(column.key)}
                    style={{ width: column.width }}
                    className={cn(
                      "px-4 py-3 font-medium",
                      alignmentClasses[column.align || "left"],
                      column.sortable && sortable && "cursor-pointer select-none hover:bg-muted/80"
                    )}
                    onClick={() => column.sortable && sortable && handleSort(column)}
                  >
                    <div className="flex items-center gap-2">
                      <Typography variant="bodySmall" weight="semibold">
                        {column.label}
                      </Typography>
                      {column.sortable && sortable && (
                        <div className="flex flex-col">
                          {sortConfig?.key === column.key ? (
                            sortConfig.direction === "asc" ? (
                              <ChevronUpIcon />
                            ) : (
                              <ChevronDownIcon />
                            )
                          ) : (
                            <div className="text-muted-foreground">
                              <ChevronUpIcon />
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={columns.length + (selectable ? 1 : 0)} className="py-12">
                    <div className="flex justify-center">
                      <Spinner size="lg" />
                    </div>
                  </td>
                </tr>
              ) : data.length === 0 ? (
                <tr>
                  <td colSpan={columns.length + (selectable ? 1 : 0)} className="py-12 text-center">
                    <Typography variant="body" className="text-muted-foreground">
                      {emptyMessage}
                    </Typography>
                  </td>
                </tr>
              ) : (
                data.map((row) => {
                  const key = String(row[rowKey]);
                  const isSelected = selectedRowKeys.includes(key);

                  return (
                    <tr
                      key={key}
                      className={cn(
                        "border-t border-border transition-colors",
                        onRowClick && "cursor-pointer hover:bg-muted/50",
                        isSelected && "bg-primary/5"
                      )}
                      onClick={() => onRowClick?.(row)}
                    >
                      {selectable && (
                        <td className="px-4 py-3">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={(e) => {
                              e.stopPropagation();
                              handleSelectRow(key);
                            }}
                            onClick={(e) => e.stopPropagation()}
                            className="h-4 w-4 rounded border-border"
                          />
                        </td>
                      )}
                      {columns.map((column) => (
                        <td
                          key={String(column.key)}
                          className={cn("px-4 py-3", alignmentClasses[column.align || "left"])}
                        >
                          <Typography variant="bodySmall">{getCellValue(row, column)}</Typography>
                        </td>
                      ))}
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {paginated && totalPages > 1 && (
        <div className="flex items-center justify-between">
          <Typography variant="bodySmall" className="text-muted-foreground">
            Showing {(currentPage - 1) * pageSize + 1} to{" "}
            {Math.min(currentPage * pageSize, totalItems || data.length)} of{" "}
            {totalItems || data.length} results
          </Typography>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange?.(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </Button>

            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter((page) => {
                  return page === 1 || page === totalPages || Math.abs(page - currentPage) <= 1;
                })
                .map((page, index, array) => {
                  const showEllipsisBefore = index > 0 && page - array[index - 1]! > 1;

                  return (
                    <React.Fragment key={page}>
                      {showEllipsisBefore && (
                        <Typography variant="bodySmall" className="px-2">
                          ...
                        </Typography>
                      )}
                      <Button
                        variant={currentPage === page ? "primary" : "outline"}
                        size="sm"
                        onClick={() => onPageChange?.(page)}
                        className="min-w-[2.5rem]"
                      >
                        {page}
                      </Button>
                    </React.Fragment>
                  );
                })}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange?.(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

// Export with proper generic support
export const DataTable = Object.assign(
  DataTableInner as <T extends Record<string, unknown>>(
    props: DataTableProps<T>
  ) => React.ReactElement,
  { displayName: "DataTable" }
);
