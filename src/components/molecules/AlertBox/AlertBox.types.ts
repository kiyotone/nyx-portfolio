export type AlertVariant = "info" | "success" | "warning" | "destructive";

export interface AlertBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Visual variant of the alert
   * @default "info"
   */
  variant?: AlertVariant;

  /**
   * Alert title
   */
  title?: string;

  /**
   * Alert description/message
   */
  description?: string | React.ReactNode;

  /**
   * Whether the alert can be dismissed
   * @default false
   */
  dismissible?: boolean;

  /**
   * Callback when alert is dismissed
   */
  onDismiss?: () => void;

  /**
   * Custom icon to display
   */
  icon?: React.ReactNode;

  /**
   * Action button or element
   */
  action?: React.ReactNode;
}
