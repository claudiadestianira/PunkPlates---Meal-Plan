import React, { useState, useEffect } from 'react';
import { useLibrary } from '../contexts/LibraryContext';
import { Menu, MealPlan } from '../types';
import { ClipboardList, Plus, Trash2, SwitchCamera, Copy, Calendar, Eye, RefreshCw, CheckCircle, Search, X, Cloud } from 'lucide-react';

interface WeeklyPlannerProps {
  onNavigateToGrocery: () => void;
}

const DAYS_OF_WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const MEALS = ['Lunch', 'Dinner'] as const;

// Helper to align date to nearest Monday
const getMondayDateOfDate = (date: Date): Date => {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  return new Date(d.setDate(diff));
};

const formatDateToYYYYMMDD = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

export const WeeklyPlanner: React.FC<WeeklyPlannerProps> = ({ onNavigateToGrocery }) => {
  const {
    menus,
    mealPlans,
    currentMealPlan,
    getOrCreateMealPlan,
    saveMealPlan,
    deleteMealPlan,
    generateGroceryList,
    loadMealPlan,
    cloneMealPlan,
    syncCode,
    syncStatus,
    lastSyncedAt,
    enableSync,
  } = useLibrary();

  // Active planning week state
  const [selectedWeekStart, setSelectedWeekStart] = useState<string>('');
  const [activePlan, setActivePlan] = useState<MealPlan | null>(null);

  // Selector Modal state
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [targetSlot, setTargetSlot] = useState<{ day: string; meal: typeof MEALS[number] } | null>(null);
  const [pickerSearch, setPickerSearch] = useState('');
  const [pickerCategory, setPickerCategory] = useState('All');

  // Trigger notice
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [planIdToConfirmDelete, setPlanIdToConfirmDelete] = useState<string | null>(null);

  // Track unsaved slots compared to persisted layout
  const storedPlanForThisWeek = mealPlans.find(p => p.weekStart === selectedWeekStart);
  const currentSlotsJSON = JSON.stringify(activePlan?.slots || {});
  const storedSlotsJSON = JSON.stringify(storedPlanForThisWeek?.slots || {});
  const hasUnsavedChanges = currentSlotsJSON !== storedSlotsJSON;

  // Initialize planner to current week's Monday
  useEffect(() => {
    let weekMonday = getMondayDateOfDate(new Date());
    const yyyymmdd = formatDateToYYYYMMDD(weekMonday);
    setSelectedWeekStart(yyyymmdd);
  }, []);

  // Fetch or create plan when the date shifts
  useEffect(() => {
    if (selectedWeekStart) {
      const plan = getOrCreateMealPlan(selectedWeekStart);
      setActivePlan(plan);
    }
  }, [selectedWeekStart, mealPlans]);

  // Sync internal plan directly with Library Context when activePlan loaded
  useEffect(() => {
    if (currentMealPlan && (!activePlan || activePlan.id !== currentMealPlan.id)) {
      setActivePlan(currentMealPlan);
      setSelectedWeekStart(currentMealPlan.weekStart);
    }
  }, [currentMealPlan]);

  // Show status notification
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleWeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) return;
    const alignedMonday = getMondayDateOfDate(new Date(e.target.value));
    setSelectedWeekStart(formatDateToYYYYMMDD(alignedMonday));
  };

  // Explicit save action
  const handleSavePlan = () => {
    if (!activePlan) return;
    saveMealPlan(activePlan);
    triggerToast('🎉 Weekly plan successfully saved & synchronized across devices!');
  };

  // Assign menu to a slot
  const handleAssignMenu = (menuId: string) => {
    if (!activePlan || !targetSlot) return;

    const slotKey = `${targetSlot.day}-${targetSlot.meal}`;
    const updatedSlots = {
      ...activePlan.slots,
      [slotKey]: menuId,
    };

    const updatedPlan: MealPlan = {
      ...activePlan,
      slots: updatedSlots,
    };

    setActivePlan(updatedPlan);
    triggerToast('Added ' + (menus.find(m => m.id === menuId)?.name || 'dish') + ' as a draft slot! Click "Save Plan" to sync.');
    setIsPickerOpen(false);
    setTargetSlot(null);
  };

  // Remove menu from slot
  const handleClearSlot = (day: string, meal: typeof MEALS[number]) => {
    if (!activePlan) return;

    const slotKey = `${day}-${meal}`;
    const updatedSlots = { ...activePlan.slots };
    delete updatedSlots[slotKey];

    const updatedPlan: MealPlan = {
      ...activePlan,
      slots: updatedSlots,
    };

    setActivePlan(updatedPlan);
    triggerToast(`Cleared draft slot for ${day}. Click "Save Plan" to sync changes.`);
  };

  // Prompt Picker
  const handleOpenPicker = (day: string, meal: typeof MEALS[number]) => {
    setTargetSlot({ day, meal });
    setIsPickerOpen(true);
    setPickerSearch('');
    setPickerCategory('All');
  };

  // Generate Grocery Checklist and forward
  const handleTriggerGrocery = () => {
    if (!activePlan) return;
    
    const count = Object.values(activePlan.slots).filter(id => !!id).length;
    if (count === 0) {
      alert("Your weekly planner is currently blank. Try adding a couple of dishes first!");
      return;
    }

    generateGroceryList(activePlan);
    triggerToast("Calculated groceries with matching quantity sums!");
    onNavigateToGrocery();
  };

  // Clone active planner into next week or some selected week
  const handleCloneToNextWeek = () => {
    if (!activePlan) return;
    
    const currentMon = new Date(activePlan.weekStart);
    const nextMon = new Date(currentMon.setDate(currentMon.getDate() + 7));
    const nextFormatted = formatDateToYYYYMMDD(nextMon);
    
    cloneMealPlan(activePlan.id, nextFormatted);
    setSelectedWeekStart(nextFormatted);
    triggerToast("Cloned current plan into next week successfully!");
  };

  // List of active categories in library for filter picker representation
  const activeCategories = ['All', ...new Set(menus.map(m => m.category))];

  // Filtering results for modal search
  const filteredPickerMenus = menus.filter(menu => {
    const matchSearch = menu.name.toLowerCase().includes(pickerSearch.toLowerCase()) || 
                      (menu.description && menu.description.toLowerCase().includes(pickerSearch.toLowerCase()));
    const matchCategory = pickerCategory === 'All' || menu.category === pickerCategory;
    return matchSearch && matchCategory;
  });

  // Find all scheduled meals for the current week plan to display on the menu catalog
  const activeSlots = activePlan?.slots || {};
  const scheduledSlots = Object.entries(activeSlots)
    .filter(([slotKey, menuId]) => !!menuId)
    .map(([slotKey, menuId]) => {
      const [day, meal] = slotKey.split('-');
      const menu = menus.find(m => m.id === menuId);
      return { slotKey, day, meal, menu };
    })
    .filter((item): item is { slotKey: string; day: string; meal: 'Lunch' | 'Dinner'; menu: Menu } => !!item.menu);

  const dayOrder: { [key: string]: number } = {
    'Monday': 1, 'Tuesday': 2, 'Wednesday': 3, 'Thursday': 4, 'Friday': 5, 'Saturday': 6, 'Sunday': 7
  };
  const mealOrder: { [key: string]: number } = {
    'Lunch': 1, 'Dinner': 2
  };
  const sortedScheduled = [...scheduledSlots].sort((a, b) => {
    const dayDiff = (dayOrder[a.day] || 0) - (dayOrder[b.day] || 0);
    if (dayDiff !== 0) return dayDiff;
    return (mealOrder[a.meal] || 0) - (mealOrder[b.meal] || 0);
  });

  return (
    <div className="space-y-8 relative">
      {/* Toast Notice */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-2xl bg-earth-olive px-4.5 py-3 text-sm font-semibold text-white shadow-xl transition-all animate-bounce">
          <CheckCircle className="h-4 w-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Hero header block */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white border border-earth-sand rounded-3xl p-6 sm:p-8 shadow-xs">
        <div className="space-y-1">
          <span className="text-xs font-semibold text-earth-clay tracking-wider uppercase">Culinary Organizer</span>
          <h2 className="font-serif text-2xl sm:text-3.5xl font-bold text-earth-olive leading-tight flex items-center gap-2">
            Weekly Meal Planner
          </h2>
          <p className="text-sm text-earth-warm-gray max-w-xl">
            Schedule delicious dishes. Once completed, click <strong className="text-earth-clay">Save & Sync Plan</strong> to sync across your phones & laptops.
          </p>
        </div>

        {/* Date Selector and Fast actions */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2.5 rounded-xl border border-earth-sand bg-earth-cream/40 px-3.5 py-2.5">
            <Calendar className="h-4.5 w-4.5 text-earth-olive" />
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-bold text-earth-warm-gray leading-none mb-0.5">Week Beginning On</span>
              <input
                type="date"
                value={selectedWeekStart}
                onChange={handleWeekChange}
                className="bg-transparent text-sm font-bold text-earth-charcoal focus:outline-none p-0 h-5"
              />
            </div>
          </div>

          <button
            onClick={handleCloneToNextWeek}
            className="flex h-11.5 items-center justify-center gap-2 rounded-xl border border-earth-sand bg-white hover:bg-earth-sand px-4 text-xs font-bold text-earth-olive transition"
            title="Saves this setup into next week"
          >
            <Copy className="h-4 w-4" />
            <span className="hidden sm:inline">Clone</span>
          </button>

          {/* Explicit Save button */}
          <button
            onClick={handleSavePlan}
            className={`flex h-11.5 items-center justify-center gap-2 rounded-xl px-5 text-xs font-extrabold transition duration-200 shadow-sm ${
              hasUnsavedChanges
                ? 'bg-earth-clay text-white hover:bg-earth-clay-dark ring-2 ring-earth-clay/35 animate-pulse-subtle cursor-pointer'
                : 'bg-white text-earth-sage border border-earth-sand hover:bg-earth-cream/50 cursor-pointer'
            }`}
            title="Save changes and sync to connected devices instantly"
          >
            {hasUnsavedChanges ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin-slow" />
                <span>Save & Sync Plan *</span>
              </>
            ) : (
              <>
                <CheckCircle className="h-4 w-4 text-emerald-600" />
                <span>Plan Saved & Synced</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Device Sync State Assistance bar */}
      <div className="rounded-2xl border border-earth-sand bg-earth-cream/25 px-5 py-4.5 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-left w-full md:w-auto">
          <div className={`h-3 w-3 rounded-full shrink-0 ${syncCode ? 'bg-emerald-500 animate-pulse' : 'bg-earth-warm-gray'}`}></div>
          <div>
            <p className="font-bold text-sm text-earth-charcoal">
              {syncCode ? `Cloud Database Device Sync Active (Pairing Room: ${syncCode})` : 'Standalone Local Browser Mode'}
            </p>
            <p className="text-xs text-earth-warm-gray mt-0.5">
              {syncCode
                ? `Updated across all connected screens in real-time. Last database connection: ${lastSyncedAt || 'Just now'}.`
                : 'Edits will remain only on this browser. Enable pairing to sync across multiple phones & tablets.'}
            </p>
          </div>
        </div>
        {!syncCode ? (
          <button
            onClick={() => {
              enableSync().then((code) => {
                triggerToast(`Joined cloud pairing room ${code}!`);
              });
            }}
            className="w-full md:w-auto shrink-0 inline-flex items-center justify-center gap-2 rounded-xl bg-white hover:bg-earth-cream border border-earth-sand px-4 py-2.5 text-xs font-bold text-earth-olive transition cursor-pointer"
          >
            <Cloud className="h-4 w-4" />
            <span>Enable Multi-Device Sync</span>
          </button>
        ) : (
          <span className="text-[10px] uppercase font-bold tracking-widest bg-emerald-100 text-emerald-800 border border-emerald-250 px-3 py-1.5 rounded-lg shrink-0">
            • Live Linked
          </span>
        )}
      </div>

      {/* Main planner grid */}
      <div className="overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0">
        <div className="min-w-[850px] grid grid-cols-7 gap-4">
          {DAYS_OF_WEEK.map((day) => {
            // Check if day is today
            const today = new Date();
            const todayDayName = today.toLocaleDateString(undefined, { weekday: 'long' });
            // Align calendar dates roughly for aesthetic layout representation
            const isToday = todayDayName === day;

            return (
              <div
                key={day}
                className={`rounded-2xl border flex flex-col min-h-80 bg-white transition ${
                  isToday ? 'border-earth-clay ring-1 ring-earth-clay shadow-sm' : 'border-earth-sand'
                }`}
              >
                {/* Day Header */}
                <div className={`p-3.5 text-center border-b border-earth-sand/70 rounded-t-2xl ${
                  isToday ? 'bg-earth-clay/10 text-earth-clay font-bold' : 'bg-earth-cream text-earth-charcoal font-semibold'
                }`}>
                  <span className="text-sm uppercase tracking-wide block">{day}</span>
                  {isToday && (
                    <span className="text-[9px] font-bold tracking-widest text-earth-clay block uppercase mt-0.5">
                      Today
                    </span>
                  )}
                </div>

                {/* Slots: Breakfast, Lunch, Dinner */}
                <div className="flex-1 divide-y divide-earth-sand/50 p-3 space-y-3.5">
                  {MEALS.map((meal) => {
                    const slotKey = `${day}-${meal}`;
                    const assignedMenuId = activePlan?.slots[slotKey];
                    const menu = menus.find(m => m.id === assignedMenuId);

                    return (
                      <div key={meal} className="first:pt-0 pt-3 space-y-1">
                        <span className="text-[10px] font-bold tracking-wider text-earth-warm-gray uppercase leading-none block">
                          {meal}
                        </span>

                        {menu ? (
                          <div className="relative group rounded-xl border border-earth-sand bg-earth-cream/45 p-2 text-xs space-y-1.5 transition hover:border-earth-sage hover:bg-earth-sage-light/20">
                            {/* Card Cover */}
                            {menu.imageUrls && menu.imageUrls[0] && (
                              <div className="aspect-video w-full rounded-md overflow-hidden bg-earth-sand shrink-0">
                                <img
                                  src={menu.imageUrls[0]}
                                  alt={menu.name}
                                  className="h-full w-full object-cover"
                                  referrerPolicy="no-referrer"
                                />
                              </div>
                            )}

                            <div>
                              <h4 className="font-bold text-earth-charcoal leading-snug truncate pr-3.5 font-serif-title">
                                {menu.name}
                              </h4>
                              <p className="text-[10px] text-earth-warm-gray truncate">{menu.category}</p>
                            </div>

                            {/* Floating Card Actions */}
                            <div className="flex items-center gap-1.5 pt-1.5 border-t border-earth-sand/50 justify-between shrink-0">
                              <button
                                onClick={() => handleOpenPicker(day, meal)}
                                className="inline-flex items-center gap-1 text-[9px] font-semibold text-earth-olive hover:text-earth-olive-light transition"
                                title="Swap Dish"
                                id={`swap-${slotKey}`}
                              >
                                <SwitchCamera className="h-3 w-3" />
                                <span>Swap</span>
                              </button>
                              <button
                                onClick={() => handleClearSlot(day, meal)}
                                className="p-1 text-earth-warm-gray hover:text-red-500 transition"
                                title="Remove Dish"
                                id={`clear-${slotKey}`}
                              >
                                <Trash2 className="h-3 w-3" />
                              </button>
                            </div>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleOpenPicker(day, meal)}
                            className="w-full flex flex-col items-center justify-center py-5 border border-dashed border-earth-sand bg-white text-earth-warm-gray hover:text-earth-olive hover:bg-earth-cream/60 rounded-xl transition group duration-200"
                            id={`add-btn-${slotKey}`}
                          >
                            <Plus className="h-4 w-4 mb-1 text-earth-sage transition group-hover:scale-110" />
                            <span className="text-[10px] font-semibold">Pick Dish</span>
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* NEW SECTION: Meal Plan & Weekly Menu Catalog Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-4">
        {/* Left Side: Active Weekly Menu Catalog */}
        <div className="lg:col-span-2 rounded-3xl border border-earth-sand bg-white p-6 sm:p-8 flex flex-col justify-between shadow-xs">
          <div>
            <div className="flex items-center justify-between border-b border-earth-sand/60 pb-4 mb-5">
              <div>
                <h3 className="font-serif text-xl font-bold text-earth-olive leading-tight">Weekly Menu Catalog</h3>
                <p className="text-xs text-earth-warm-gray mt-1">
                  List of assigned menus for the active week of <strong className="text-earth-clay font-bold">{new Date(selectedWeekStart).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</strong>
                </p>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wide bg-earth-cream border border-earth-sand px-3 py-1 rounded-xl text-earth-charcoal">
                {sortedScheduled.length} scheduled meals
              </span>
            </div>

            {sortedScheduled.length === 0 ? (
              <div className="py-14 text-center text-xs text-earth-warm-gray italic bg-earth-cream/15 rounded-2xl border border-dashed border-earth-sand">
                Your weekly menu is currently empty. Choose "Pick Dish" on the slots above to populate this catalog!
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-80 overflow-y-auto pr-1">
                {sortedScheduled.map(({ slotKey, day, meal, menu }) => (
                  <div
                    key={slotKey}
                    className="flex gap-3.5 items-center p-3.5 rounded-2xl border border-earth-sand/60 bg-earth-cream/10 hover:border-earth-sage hover:bg-white transition duration-200 group"
                  >
                    {/* Cover Frame */}
                    {menu.imageUrls && menu.imageUrls[0] && (
                      <div className="h-14 w-20 rounded-xl overflow-hidden bg-earth-sand shrink-0">
                        <img
                          src={menu.imageUrls[0]}
                          alt={menu.name}
                          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    )}

                    <div className="min-w-0 flex-1 text-left">
                      <span className="text-[9px] font-bold tracking-widest text-earth-clay uppercase bg-white px-2 py-0.5 rounded border border-earth-sand">
                        {day} • {meal}
                      </span>
                      <h4 className="font-serif-title font-bold text-sm text-earth-charcoal leading-snug truncate mt-1.5 group-hover:text-earth-olive">
                        {menu.name}
                      </h4>
                      <p className="text-[10px] text-earth-warm-gray truncate mt-1 flex items-center gap-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-earth-sage"></span>
                        {menu.category} ({menu.ingredients.length} items)
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Meal Plan Archives catalog Selector */}
        <div className="rounded-3xl border border-earth-sand bg-white p-6 flex flex-col justify-between shadow-xs">
          <div>
            <h3 className="font-serif text-lg font-bold text-earth-olive mb-1 leading-tight">Meal Plan History</h3>
            <p className="text-xs text-earth-warm-gray mb-4">Reload past schedules instantly:</p>
            {mealPlans.length === 0 ? (
              <p className="text-xs text-earth-warm-gray italic py-4 text-center bg-earth-cream/40 rounded-xl">
                No archived plans yet.
              </p>
            ) : (
              <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                {mealPlans.map((plan) => (
                  <div
                    key={plan.id}
                    className={`flex items-center justify-between p-2.5 rounded-xl text-xs transition border ${
                      activePlan?.id === plan.id
                        ? 'bg-earth-sage-light/40 border-earth-sage font-bold'
                        : 'bg-white border-earth-sand/60 hover:bg-earth-cream'
                    }`}
                  >
                    <div className="truncate flex-1 cursor-pointer pr-2 text-left" onClick={() => loadMealPlan(plan.id)}>
                      <p className="font-semibold text-earth-charcoal truncate">{plan.name}</p>
                      <p className="text-[10px] text-earth-warm-gray mt-0.5">Week: {plan.weekStart}</p>
                    </div>
                    {planIdToConfirmDelete === plan.id ? (
                      <div className="flex items-center gap-1 animate-fade-in shrink-0">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteMealPlan(plan.id);
                            setPlanIdToConfirmDelete(null);
                          }}
                          className="px-1.5 py-0.5 rounded bg-red-600 hover:bg-red-700 text-[9px] font-bold text-white transition cursor-pointer"
                        >
                          Delete
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setPlanIdToConfirmDelete(null);
                          }}
                          className="px-1.5 py-0.5 rounded border border-earth-sand bg-white text-[9px] font-semibold text-earth-charcoal hover:bg-earth-sand transition cursor-pointer"
                        >
                          No
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setPlanIdToConfirmDelete(plan.id);
                        }}
                        className="text-earth-warm-gray hover:text-red-500 p-1.5 transition shrink-0 cursor-pointer"
                        title="Delete archived plan"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* NEW MOVED COMPONENT: Consolidated Shopping Hub placed below the catalogs */}
      <div className="rounded-3xl bg-earth-olive text-white p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 justify-between border border-earth-olive-light shadow-md">
        <div className="space-y-2 text-center sm:text-left">
          <h3 className="font-serif text-xl sm:text-2xl font-bold">Consolidated Shopping Hub</h3>
          <p className="text-sm text-earth-sage-light max-w-md leading-relaxed">
            Sum quantities automatic for identical ingredients! Take the pain out of checklist scaling.
          </p>
        </div>
        <button
          onClick={handleTriggerGrocery}
          className="shrink-0 inline-flex items-center gap-2.5 rounded-xl bg-earth-clay hover:bg-earth-clay-dark px-6 py-4.5 text-sm font-bold text-white shadow-lg shadow-black/10 transition duration-200 w-full sm:w-auto justify-center cursor-pointer transform hover:scale-[1.01] active:scale-95"
          id="generate-grocery-list-btn"
        >
          <ClipboardList className="h-5 w-5" />
          <span>Generate Groceries</span>
        </button>
      </div>

      {/* Picker Search Modal overlay */}
      {isPickerOpen && targetSlot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs overflow-y-auto">
          <div className="relative w-full max-w-lg rounded-3xl bg-white shadow-2xl overflow-hidden my-8 flex flex-col max-h-[85vh]">
            
            {/* Header */}
            <div className="border-b border-earth-sand px-5.5 py-4 bg-earth-cream flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-earth-clay">Assigning Food</span>
                <h3 className="font-serif text-lg font-bold text-earth-olive text-left">
                  Pick Dish for {targetSlot.day} ({targetSlot.meal})
                </h3>
              </div>
              <button
                onClick={() => {
                  setIsPickerOpen(false);
                  setTargetSlot(null);
                }}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-earth-charcoal border border-earth-sand hover:bg-earth-sand"
              >
                <X className="h-4.5 w-4.5" />
              </button>
            </div>

            {/* Filters */}
            <div className="p-4 border-b border-earth-sand/60 space-y-3 bg-white">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-earth-warm-gray" />
                <input
                  type="text"
                  placeholder="Search recipe by name..."
                  value={pickerSearch}
                  onChange={(e) => setPickerSearch(e.target.value)}
                  className="w-full rounded-xl border border-earth-sand bg-earth-cream/20 pl-9.5 pr-4 py-2 text-xs focus:ring-1 focus:ring-earth-sage focus:border-earth-sage"
                />
              </div>

              {/* Categories */}
              <div className="flex gap-1 overflow-x-auto pb-1 max-w-full">
                {activeCategories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setPickerCategory(cat)}
                    className={`rounded-full px-3 py-1 text-[10px] font-semibold shrink-0 transition ${
                      pickerCategory === cat
                        ? 'bg-earth-olive text-white'
                        : 'bg-earth-cream text-earth-warm-gray border border-earth-sand/50 hover:bg-earth-sand'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto p-4 bg-earth-cream/30 space-y-2">
              {filteredPickerMenus.length === 0 ? (
                <div className="py-12 text-center text-xs text-earth-warm-gray italic">
                  No dishes found matching your criteria.
                </div>
              ) : (
                filteredPickerMenus.map((menu) => (
                  <div
                    key={menu.id}
                    onClick={() => handleAssignMenu(menu.id)}
                    className="flex gap-3 items-center p-2.5 rounded-xl border border-earth-sand bg-white cursor-pointer hover:border-earth-sage hover:bg-earth-sage-light/20 transition group"
                  >
                    {/* Tiny Cover */}
                    <div className="h-12 w-16 rounded-md overflow-hidden bg-earth-sand shrink-0">
                      <img
                        src={menu.imageUrls?.[0] || 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=600&q=80'}
                        alt={menu.name}
                        className="h-full w-full object-cover transition duration-300 group-hover:scale-110"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    <div className="flex-1 text-left min-w-0">
                      <h4 className="font-serif-title font-bold text-sm text-earth-charcoal leading-snug group-hover:text-earth-olive truncate">
                        {menu.name}
                      </h4>
                      <p className="text-[10px] text-earth-warm-gray truncate mt-0.5">{menu.category}</p>
                    </div>

                    <span className="text-[10px] font-bold text-earth-clay shrink-0 bg-earth-sage-light/80 px-2 py-1 rounded-lg">
                      {menu.ingredients.length} items
                    </span>
                  </div>
                ))
              )}
            </div>

          </div>
        </div>
      )}
    </div>
  );
};
