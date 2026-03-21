export interface FilterBarProps {
  filters: FilterOption[];
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  className?: string;
}

export interface FilterOption {
  id: string;
  label: string;
  icon?: React.ReactNode;
}
