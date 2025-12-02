import { CalendarMonth } from '../types';

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export const getMonthData = (year: number, monthIndex: number): CalendarMonth => {
  const firstDay = new Date(year, monthIndex, 1);
  const lastDay = new Date(year, monthIndex + 1, 0);
  
  const daysInMonth = lastDay.getDate();
  const startDayOfWeek = firstDay.getDay(); // 0 = Sunday, 6 = Saturday

  const days: (number | null)[] = [];

  // Pad start
  for (let i = 0; i < startDayOfWeek; i++) {
    days.push(null);
  }

  // Fill days
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  // Pad end to complete the last row (optional, but looks better if fixed grid)
  while (days.length % 7 !== 0) {
    days.push(null);
  }

  return {
    monthIndex,
    year,
    monthName: MONTH_NAMES[monthIndex],
    days
  };
};

export const getSeasonalPrompt = (monthIndex: number, theme: string): string => {
  const seasons = [
    "winter, snowy, cozy, fresh start, white and light blue tones", // Jan
    "winter, late winter, subtle warmth, soft pink sunrise", // Feb
    "spring, blooming, buds, fresh green, gentle rain, pastel colors", // Mar
    "spring, flowers, vibrant, easter lilies, soft sunlight", // Apr
    "spring, full bloom, sunny, lush gardens, bright", // May
    "summer, bright sun, beach, clear blue sky, high energy", // Jun
    "summer, hot, vacation, golden sunset, ocean breeze", // Jul
    "summer, late summer, golden hour, wheat fields, warm light", // Aug
    "autumn, soft orange leaves, cozy atmosphere, sepia tones", // Sep
    "autumn, pumpkin patch, mist, cozy cabin, warm aesthetic", // Oct
    "autumn, late fall, bare trees, crisp air, muted earth tones", // Nov
    "winter, holidays, festive lights, snow, magical atmosphere, gold and white" // Dec
  ];

  return `A beautiful, high-quality, aesthetic calendar header image for ${MONTH_NAMES[monthIndex]} 2026. 
  Theme: ${theme}. 
  Seasonal Context: ${seasons[monthIndex]}. 
  Style: Photorealistic or highly detailed digital art, professional composition, bright natural lighting, aesthetic color palette, high resolution. 
  Aspect Ratio: 16:9. No text overlays. Clean and minimal.`;
};