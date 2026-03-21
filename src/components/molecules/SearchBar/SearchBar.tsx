import * as React from "react";
import { cn } from "@/utils/cn";
import { Input } from "@/components/atoms/Input";
import { Button } from "@/components/atoms/Button";
import { Spinner } from "@/components/atoms/Spinner";
import type { SearchBarProps } from "./SearchBar.types";

const SearchIcon = () => (
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
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

const XIcon = () => (
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
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const SearchBar = React.forwardRef<HTMLInputElement, SearchBarProps>(
  (
    {
      className,
      onSearch,
      isLoading = false,
      showClear = true,
      debounceMs = 0,
      onChange,
      value: controlledValue,
      defaultValue,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState(defaultValue?.toString() || "");
    const debounceTimerRef = React.useRef<NodeJS.Timeout | null>(null);

    const isControlled = controlledValue !== undefined;
    const value = isControlled ? controlledValue : internalValue;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;

      if (!isControlled) {
        setInternalValue(newValue);
      }

      if (onChange) {
        if (debounceMs > 0) {
          if (debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current);
          }
          debounceTimerRef.current = setTimeout(() => {
            onChange(e);
          }, debounceMs);
        } else {
          onChange(e);
        }
      }
    };

    const handleClear = () => {
      if (!isControlled) {
        setInternalValue("");
      }

      const syntheticEvent = {
        target: { value: "" },
        currentTarget: { value: "" },
      } as React.ChangeEvent<HTMLInputElement>;

      onChange?.(syntheticEvent);
      onSearch?.("");
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSearch?.(value?.toString() || "");
    };

    const showClearButton = showClear && value && !isLoading;

    React.useEffect(() => {
      return () => {
        if (debounceTimerRef.current) {
          clearTimeout(debounceTimerRef.current);
        }
      };
    }, []);

    return (
      <form onSubmit={handleSubmit} className="relative w-full">
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
            <SearchIcon />
          </div>

          <Input
            ref={ref}
            type="text"
            value={value}
            onChange={handleChange}
            className={cn(
              "pl-10",
              onSearch ? "pr-20" : showClearButton ? "pr-10" : "pr-3",
              className
            )}
            {...props}
          />

          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
            {isLoading && <Spinner size="sm" />}

            {showClearButton && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleClear}
                className="h-7 w-7 p-0 transition-all hover:scale-110 active:scale-95"
                aria-label="Clear search"
              >
                <XIcon />
              </Button>
            )}

            {onSearch && (
              <Button
                type="submit"
                variant="ghost"
                size="sm"
                className="h-7 px-2 transition-all hover:scale-105 active:scale-95"
                disabled={isLoading}
              >
                Search
              </Button>
            )}
          </div>
        </div>
      </form>
    );
  }
);

SearchBar.displayName = "SearchBar";

export { SearchBar };
