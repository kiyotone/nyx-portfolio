/**
 * Input Atom
 *
 * A highly accessible input component with multiple variants, sizes,
 * states, and icon support. Includes label, helper text, and error handling.
 *
 * @example
 * ```tsx
 * import { Input } from "@/components/atoms/Input";
 *
 * <Input label="Email" type="email" placeholder="Enter email" />
 * <Input variant="filled" size="sm" iconBefore={<SearchIcon />} />
 * <Input label="Password" type="password" error="Invalid password" />
 * ```
 */
export { Input } from "./Input";
export type { InputProps } from "./Input.types";
