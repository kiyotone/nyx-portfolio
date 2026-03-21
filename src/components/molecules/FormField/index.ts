/**
 * FormField Molecule
 *
 * A complete form field component that combines Input with label,
 * error messages, and helper text.
 *
 * @example
 * ```tsx
 * import { FormField } from "@/components/molecules/FormField";
 *
 * <FormField
 *   label="Email"
 *   type="email"
 *   placeholder="you@example.com"
 *   required
 *   helperText="We'll never share your email"
 * />
 *
 * <FormField
 *   label="Password"
 *   type="password"
 *   error="Password must be at least 8 characters"
 * />
 * ```
 */

export { FormField } from "./FormField";
export type { FormFieldProps } from "./FormField.types";
