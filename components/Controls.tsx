import React from 'react';
import { CalendarTheme } from '../types';
import { Download, Image as ImageIcon, ChevronLeft, ChevronRight, RefreshCw, Printer } from 'lucide-react';

interface ControlsProps {
  currentTheme: CalendarTheme;
  setTheme: (t: CalendarTheme) => void;
  onGenerate: () => void;
  onDownload: () => void;
  isGenerating: boolean;
  currentMonthIndex: number;
  onPrevMonth: () => void;
  onNextMonth: () => void;
}

const Controls: React.FC<ControlsProps> = ({
  currentTheme,
  setTheme,
  onGenerate,
  onDownload,
  isGenerating,
  currentMonthIndex,
  onPrevMonth,
  onNextMonth
}) => {
  return (
    <div className="w-full lg:w-80 bg-white border-r border-gray-200 p-6 flex flex-col h-full shadow-sm z-10">
      <div className="mb-8">
        <h1 className="text-2xl font-serif-display font-bold text-gray-900 mb-1">Lumina</h1>
        <p className="text-xs text-gray-500 uppercase tracking-widest">2026 Calendar Studio</p>
      </div>

      <div className="space-y-6 flex-grow">
        {/* Navigation */}
        <div className="flex items-center justify-between bg-gray-50 p-2 rounded-lg">
            <button onClick={onPrevMonth} className="p-2 hover:bg-white rounded-md shadow-sm transition-all disabled:opacity-30" disabled={currentMonthIndex === 0}>
                <ChevronLeft size={20} />
            </button>
            <span className="font-medium text-gray-700 font-sans w-24 text-center">
                {new Date(2026, currentMonthIndex).toLocaleString('default', { month: 'long' })}
            </span>
            <button onClick={onNextMonth} className="p-2 hover:bg-white rounded-md shadow-sm transition-all disabled:opacity-30" disabled={currentMonthIndex === 11}>
                <ChevronRight size={20} />
            </button>
        </div>

        {/* Theme Selection */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">Visual Theme</label>
          <div className="grid grid-cols-1 gap-2">
            {Object.values(CalendarTheme).map((theme) => (
              <button
                key={theme}
                onClick={() => setTheme(theme)}
                className={`px-4 py-3 text-left text-sm rounded-lg border transition-all duration-200 flex items-center
                  ${currentTheme === theme 
                    ? 'border-indigo-600 bg-indigo-50 text-indigo-700 shadow-sm ring-1 ring-indigo-600' 
                    : 'border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300'}`}
              >
                <span className={`w-2 h-2 rounded-full mr-3 ${currentTheme === theme ? 'bg-indigo-600' : 'bg-gray-300'}`}></span>
                {theme}
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 space-y-3">
          <button
            onClick={onGenerate}
            disabled={isGenerating}
            className="w-full flex items-center justify-center gap-2 bg-gray-900 hover:bg-black text-white py-3 px-4 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg active:scale-95"
          >
            {isGenerating ? (
               <RefreshCw className="animate-spin" size={18} />
            ) : (
               <ImageIcon size={18} />
            )}
            {isGenerating ? 'Creating Artwork...' : 'Generate Image'}
          </button>

          <div className="grid grid-cols-2 gap-3">
            <button
                onClick={onDownload}
                className="flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 py-3 px-4 rounded-lg font-medium transition-all shadow-sm hover:shadow active:scale-95"
            >
                <Download size={18} />
                <span>JPG</span>
            </button>
             <button
                onClick={() => window.print()}
                className="flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 py-3 px-4 rounded-lg font-medium transition-all shadow-sm hover:shadow active:scale-95"
            >
                <Printer size={18} />
                <span>Print</span>
            </button>
          </div>
          
          <p className="text-xs text-gray-400 text-center pt-2">
            Tip: Generate an image, then export.
          </p>
        </div>
      </div>

      <div className="text-xs text-gray-400 mt-auto pt-6 border-t">
        Powered by Google Gemini 2.5 Flash
      </div>
    </div>
  );
};

export default Controls;
