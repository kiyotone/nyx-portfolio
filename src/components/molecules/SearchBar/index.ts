/**
 * SearchBar Molecule
 *
 * A search input with icon, clear button, and optional submit functionality.
 * Supports debouncing and loading states.
 *
 * @example
 * ```tsx
 * import { SearchBar } from "@/components/molecules/SearchBar";
 *
 * <SearchBar
 *   placeholder="Search users..."
 *   onSearch={(value) => console.log(value)}
 *   debounceMs={300}
 * />
 *
 * <SearchBar
 *   placeholder="Search..."
 *   isLoading={isSearching}
 *   onChange={(e) => setQuery(e.target.value)}
 * />
 * ```
 */

export { SearchBar } from "./SearchBar";
export type { SearchBarProps } from "./SearchBar.types";
