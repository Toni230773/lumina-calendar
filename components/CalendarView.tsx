import React, { forwardRef } from 'react';
import { CalendarMonth } from '../types';
import CalendarGrid from './CalendarGrid';

interface CalendarViewProps {
  monthData: CalendarMonth;
  generatedImage?: string;
  isGenerating?: boolean;
}

const CalendarView = forwardRef<HTMLDivElement, CalendarViewProps>(({ monthData, generatedImage, isGenerating }, ref) => {
  
  return (
    <div 
      ref={ref}
      id="calendar-export-target"
      className="bg-white relative flex flex-col text-gray-900 overflow-hidden"
      style={{ 
        width: '100%',
        aspectRatio: '1 / 1.4142', // A4 aspect ratio
      }}
    >
      {/* Top Half: Visual Header (approx 45% height) */}
      <div className="h-[45%] relative bg-gray-50 overflow-hidden group">
        {generatedImage ? (
          <img 
            src={generatedImage} 
            alt={`${monthData.monthName} illustration`} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center flex-col bg-slate-50 text-slate-300">
             {isGenerating ? (
                 <div className="flex flex-col items-center gap-3">
                     <div className="w-10 h-10 rounded-full border-4 border-t-indigo-500 border-indigo-100 animate-spin"></div>
                     <span className="text-xs font-medium tracking-widest uppercase text-gray-400 animate-pulse">Creating masterpiece...</span>
                 </div>
             ) : (
                 <div className="text-center">
                     <div className="w-16 h-16 border border-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="opacity-20 text-2xl">❖</span>
                     </div>
                     <p className="text-xs tracking-widest uppercase opacity-50">Image Space</p>
                 </div>
             )}
          </div>
        )}
        
        {/* Artistic Month Label Overlay - Modern & Clean */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex flex-col justify-end p-8 md:p-10">
            <div className="translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <h2 className="text-6xl md:text-8xl font-elegant text-white drop-shadow-lg tracking-tight">
                    {monthData.monthName}
                </h2>
                <div className="h-1 w-24 bg-white/80 mt-2 mb-2 rounded-full backdrop-blur-sm"></div>
                <p className="text-white/90 text-2xl font-serif-display tracking-widest">
                    2026
                </p>
            </div>
        </div>
      </div>

      {/* Bottom Half: Grid */}
      <div className="flex-grow p-6 md:p-10 bg-white flex flex-col">
        <CalendarGrid data={monthData} />
        
        {/* Footer */}
        <div className="mt-auto pt-4 flex justify-between items-center text-gray-400">
            <div className="text-[9px] tracking-[0.2em] uppercase font-sans">Lumina Collection</div>
            <div className="text-[10px] font-serif italic text-gray-300">2026 Calendar Series</div>
        </div>
      </div>
    </div>
  );
});

CalendarView.displayName = 'CalendarView';

export default CalendarView;