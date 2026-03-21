import type { InputProps } from "@/components/atoms/Input";

export interface SearchBarProps extends Omit<InputProps, "type"> {
  /**
   * Callback when search is submitted
   */
  onSearch?: (value: string) => void;

  /**
   * Show loading spinner
   * @default false
   */
  isLoading?: boolean;

  /**
   * Show clear button when input has value
   * @default true
   */
  showClear?: boolean;

  /**
   * Debounce delay in milliseconds for onChange
   * @default 0
   */
  debounceMs?: number;
}
