export interface SkillTreeNodeProps {
  name: string;
  level: number;
  unlocked?: boolean;
  children?: SkillTreeNodeProps[];
  onUnlock?: () => void;
  className?: string;
}
