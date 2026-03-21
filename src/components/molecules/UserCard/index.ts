/**
 * UserCard Molecule
 *
 * A card component that displays user information with avatar,
 * name, title, status, and optional actions.
 *
 * @example
 * ```tsx
 * import { UserCard } from "@/components/molecules/UserCard";
 * import { Button } from "@/components/atoms/Button";
 *
 * <UserCard
 *   name="John Doe"
 *   title="Software Engineer"
 *   email="john@example.com"
 *   avatarSrc="/avatar.jpg"
 *   status="online"
 *   badge={{ label: "Admin", variant: "primary" }}
 *   action={<Button size="sm">Follow</Button>}
 * />
 * ```
 */

export { UserCard } from "./UserCard";
export type { UserCardProps } from "./UserCard.types";
