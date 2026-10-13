/* The menu, in order. Plain labels: the horror is in the presentation, never
   in the names, so a visitor always knows what they are opening. Each id is
   also the section's #hash, so every file can be linked to directly. */
export const SECTIONS = [
  { id: 'projects', label: 'Projects' },
  { id: 'numbers', label: 'Numbers' },
  { id: 'paper', label: 'The paper' },
  { id: 'record', label: 'Record' },
  { id: 'next', label: 'Where next' },
  { id: 'contact', label: 'Contact' },
] as const;

export type SectionId = (typeof SECTIONS)[number]['id'];
