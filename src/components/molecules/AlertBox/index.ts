/**
 * AlertBox Molecule
 *
 * A versatile alert component for displaying important messages
 * with different variants and optional actions.
 *
 * @example
 * ```tsx
 * import { AlertBox } from "@/components/molecules/AlertBox";
 * import { Button } from "@/components/atoms/Button";
 *
 * <AlertBox
 *   variant="success"
 *   title="Success!"
 *   description="Your changes have been saved successfully."
 *   dismissible
 * />
 *
 * <AlertBox
 *   variant="warning"
 *   title="Warning"
 *   description="Your session will expire in 5 minutes."
 *   action={<Button size="sm">Extend Session</Button>}
 * />
 * ```
 */

export { AlertBox } from "./AlertBox";
export type { AlertBoxProps, AlertVariant } from "./AlertBox.types";
