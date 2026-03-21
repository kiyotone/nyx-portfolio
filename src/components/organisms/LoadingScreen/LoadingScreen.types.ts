export interface LoadingScreenProps {
  /** Big title text. Defaults to "NEXUS" */
  message?: string;
  onComplete?: () => void;
}
