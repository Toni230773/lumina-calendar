export enum CalendarTheme {
  Nature = "Nature & Landscapes",
  Minimalist = "Abstract Minimalist",
  Cyberpunk = "Neon Cyberpunk",
  Watercolor = "Soft Watercolor",
  Architecture = "Modern Architecture",
  Fantasy = "Ethereal Fantasy"
}

export interface CalendarMonth {
  monthIndex: number; // 0-11
  year: number;
  monthName: string;
  days: (number | null)[]; // null for empty slots at start/end of grid
  imageUrl?: string;
  imagePrompt?: string;
  isGenerating?: boolean;
}

export interface DayCell {
  day: number;
  isWeekend: boolean;
}

export type GeneratedImagesMap = Record<number, string>; // monthIndex -> base64/url
