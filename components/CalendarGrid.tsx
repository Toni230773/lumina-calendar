import React from 'react';
import { CalendarMonth } from '../types';

interface CalendarGridProps {
  data: CalendarMonth;
}

const CalendarGrid: React.FC<CalendarGridProps> = ({ data }) => {
  const weekDays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  
  // Calculate required rows (usually 5 or 6)
  const totalSlots = data.days.length;
  const rows = Math.ceil(totalSlots / 7);

  return (
    <div className="w-full h-full flex flex-col">
      {/* Weekday Header */}
      <div className="grid grid-cols-7 mb-2 border-b border-gray-200 pb-2">
        {weekDays.map((day) => (
          <div key={day} className="text-center text-[10px] md:text-xs font-semibold tracking-[0.2em] text-gray-400 font-sans uppercase">
            {day}
          </div>
        ))}
      </div>

      {/* Days Grid */}
      <div className={`grid grid-cols-7 flex-grow border-l border-t border-gray-100`}>
        {data.days.map((day, idx) => {
          const isWeekend = idx % 7 === 0 || idx % 7 === 6;
          
          return (
            <div 
              key={`cell-${idx}`} 
              className={`
                relative border-r border-b border-gray-100 p-2 transition-colors
                ${day === null ? 'bg-gray-50/30' : 'bg-white'}
                flex flex-col items-start justify-start
              `}
              style={{ minHeight: '80px' }}
            >
              {day !== null && (
                <>
                  <span className={`
                    text-lg md:text-2xl font-serif-display leading-none mb-1
                    ${isWeekend ? 'text-indigo-900 font-medium' : 'text-gray-800'}
                  `}>
                    {day}
                  </span>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarGrid;