import React, { useState, useRef, useCallback } from 'react';
import Controls from './components/Controls';
import CalendarView from './components/CalendarView';
import { CalendarTheme, GeneratedImagesMap } from './types';
import { getMonthData } from './utils/calendarUtils';
import { generateMonthImage } from './services/geminiService';

const App: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState(0); // 0 = Jan
  const [theme, setTheme] = useState<CalendarTheme>(CalendarTheme.Nature);
  const [images, setImages] = useState<GeneratedImagesMap>({});
  const [isGenerating, setIsGenerating] = useState(false);
  
  const calendarRef = useRef<HTMLDivElement>(null);

  const handleGenerate = useCallback(async () => {
    if (isGenerating) return;
    setIsGenerating(true);
    try {
      const imageBase64 = await generateMonthImage(currentMonth, theme);
      if (imageBase64) {
        setImages(prev => ({
          ...prev,
          [currentMonth]: imageBase64
        }));
      }
    } catch (e) {
      console.error("Failed to generate", e);
      alert("Failed to generate image. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  }, [currentMonth, theme, isGenerating]);

  const handleDownload = useCallback(async () => {
    if (!calendarRef.current || !(window as any).html2canvas) {
        if (!(window as any).html2canvas) alert("Export library loading...");
        return;
    }

    try {
        const canvas = await (window as any).html2canvas(calendarRef.current, {
            scale: 2.5, // High quality 
            useCORS: true,
            backgroundColor: '#ffffff'
        });
        
        const link = document.createElement('a');
        link.download = `Lumina_Calendar_2026_${currentMonth + 1}.jpg`;
        link.href = canvas.toDataURL('image/jpeg', 0.95);
        link.click();
    } catch (err) {
        console.error("Export failed", err);
        alert("Export failed. Try using the browser print function.");
    }
  }, [currentMonth]);

  const monthData = getMonthData(2026, currentMonth);

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-gray-100 overflow-hidden font-sans">
      {/* Sidebar */}
      <Controls 
        currentTheme={theme}
        setTheme={setTheme}
        onGenerate={handleGenerate}
        onDownload={handleDownload}
        isGenerating={isGenerating}
        currentMonthIndex={currentMonth}
        onPrevMonth={() => setCurrentMonth(m => Math.max(0, m - 1))}
        onNextMonth={() => setCurrentMonth(m => Math.min(11, m + 1))}
      />

      {/* Main Content Area */}
      <main className="flex-grow h-full overflow-y-auto p-4 md:p-8 lg:p-12 flex items-start justify-center relative no-scrollbar">
        {/* Background decoration */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-200/40 rounded-full blur-3xl opacity-50 mix-blend-multiply"></div>
            <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-rose-200/40 rounded-full blur-3xl opacity-50 mix-blend-multiply"></div>
            <div className="absolute bottom-10 right-1/3 w-80 h-80 bg-blue-100/40 rounded-full blur-3xl opacity-50 mix-blend-multiply"></div>
        </div>

        {/* Calendar Page Preview Container */}
        <div className="w-full max-w-2xl lg:max-w-[800px] relative z-0 transition-all duration-500 ease-in-out">
           
           {/* Shadow Wrapper for Visual Depth on Screen (Excluded from Export Ref) */}
           <div className="shadow-2xl shadow-slate-300/60 rounded-sm overflow-hidden bg-white ring-1 ring-black/5">
               <CalendarView 
                 ref={calendarRef}
                 monthData={monthData}
                 generatedImage={images[currentMonth]}
                 isGenerating={isGenerating}
               />
           </div>
           
           {/* Mobile Nav Helper */}
           <div className="lg:hidden flex justify-between mt-6 bg-white/80 backdrop-blur-md p-4 rounded-xl shadow-lg border border-white/20">
              <button 
                onClick={() => setCurrentMonth(m => Math.max(0, m - 1))}
                disabled={currentMonth === 0}
                className="text-sm font-bold text-indigo-600 disabled:opacity-30 px-4 py-2 hover:bg-indigo-50 rounded-lg transition-colors"
              >
                Previous
              </button>
              <span className="font-bold text-gray-800 flex items-center">
                {monthData.monthName}
              </span>
              <button 
                onClick={() => setCurrentMonth(m => Math.min(11, m + 1))}
                disabled={currentMonth === 11}
                className="text-sm font-bold text-indigo-600 disabled:opacity-30 px-4 py-2 hover:bg-indigo-50 rounded-lg transition-colors"
              >
                Next
              </button>
           </div>
        </div>
      </main>
    </div>
  );
};

export default App;