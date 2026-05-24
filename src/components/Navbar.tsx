import React from 'react';
import { BookOpen, CalendarDays, ShoppingCart, Cloud } from 'lucide-react';
import { useLibrary } from '../contexts/LibraryContext';

interface NavbarProps {
  activeTab: 'library' | 'planner' | 'grocery';
  setActiveTab: (tab: 'library' | 'planner' | 'grocery') => void;
  groceryCount: number;
  onOpenSyncModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, groceryCount, onOpenSyncModal }) => {
  const { syncCode } = useLibrary();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-earth-sand bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Branding */}
        <div className="flex items-center gap-2.5 cursor-pointer animate-fade-in" onClick={() => setActiveTab('library')}>
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-earth-olive text-white font-extrabold text-base tracking-tighter w-8 h-8 shrink-0">
            P
          </div>
          <div>
            <span className="font-sans text-base font-bold tracking-tight text-earth-charcoal">Punk Plates</span>
            <span className="hidden sm:inline-block ml-1.5 rounded-md bg-earth-sage-light px-2 py-0.5 text-[10px] font-bold text-earth-olive uppercase tracking-wider">
              Library
            </span>
          </div>
        </div>

        {/* Global Controls */}
        <div className="flex items-center gap-2 sm:gap-4 md:gap-5">
          {/* Navigation Tabs */}
          <nav className="flex items-center gap-1 sm:gap-1.5">
            <button
              onClick={() => setActiveTab('library')}
              className={`flex items-center gap-2 rounded-xl px-2.5 sm:px-3.5 py-2 text-sm font-medium transition-all duration-200 cursor-pointer ${
                activeTab === 'library'
                  ? 'bg-earth-olive text-white shadow-sm'
                  : 'text-earth-warm-gray hover:bg-earth-sand hover:text-earth-charcoal'
              }`}
            >
              <BookOpen className="h-4 w-4 shrink-0" />
              <span className="hidden sm:inline">Our Library</span>
            </button>

            <button
              onClick={() => setActiveTab('planner')}
              className={`flex items-center gap-2 rounded-xl px-2.5 sm:px-3.5 py-2 text-sm font-medium transition-all duration-200 cursor-pointer ${
                activeTab === 'planner'
                  ? 'bg-earth-olive text-white shadow-sm'
                  : 'text-earth-warm-gray hover:bg-earth-sand hover:text-earth-charcoal'
              }`}
            >
              <CalendarDays className="h-4 w-4 shrink-0" />
              <span className="hidden sm:inline">Meal Planner</span>
            </button>

            <button
              onClick={() => setActiveTab('grocery')}
              className={`relative flex items-center gap-2 rounded-xl px-2.5 sm:px-3.5 py-2 text-sm font-medium transition-all duration-200 cursor-pointer ${
                activeTab === 'grocery'
                  ? 'bg-earth-olive text-white shadow-sm'
                  : 'text-earth-warm-gray hover:bg-earth-sand hover:text-earth-charcoal'
              }`}
            >
              <ShoppingCart className="h-4 w-4 shrink-0" />
              <span className="hidden sm:inline">Grocery Checklist</span>
              {groceryCount > 0 && (
                <span className={`inline-flex h-5 min-w-5 items-center justify-center rounded-full text-[10px] font-bold px-1.5 transition ${
                  activeTab === 'grocery' ? 'bg-earth-clay text-white' : 'bg-earth-olive text-white'
                }`}>
                  {groceryCount}
                </span>
              )}
            </button>
          </nav>

          {/* Cloud Sync Status Trigger Button */}
          <button
            onClick={onOpenSyncModal}
            className={`flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold border transition shrink-0 cursor-pointer shadow-3xs ${
              syncCode
                ? 'bg-emerald-50 text-emerald-800 border-emerald-200/60 hover:bg-emerald-100/80'
                : 'bg-white border-earth-sand text-earth-warm-gray hover:bg-earth-sand hover:text-earth-charcoal'
            }`}
            title={syncCode ? `Connected to Cloud pairing room: ${syncCode}` : 'Database pairing is disabled'}
          >
            <Cloud className={`h-4 w-4 text-emerald-600 ${syncCode ? 'animate-pulse' : 'opacity-60'}`} />
            <span className="hidden md:inline">Sync Room: {syncCode || 'Offline'}</span>
            <span className="md:hidden font-mono font-black">{syncCode ? syncCode.split('-')[1] || syncCode : 'Off'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
