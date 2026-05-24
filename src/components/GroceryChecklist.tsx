import React, { useState } from 'react';
import { useLibrary } from '../contexts/LibraryContext';
import { GroceryCategory, GroceryItem, GROCERY_CATEGORIES, UNITS } from '../types';
import { Printer, Copy, Plus, RefreshCw, CheckSquare, Square, Trash2, Edit2, CheckCircle2, ShoppingBag, Eye, EyeOff, X, Save, Search, Sparkles, Check, CheckSquare as CheckSquareIcon } from 'lucide-react';
import { GROCERY_PRESETS, PresetGroceryItem } from '../data/groceryPresets';

export const GroceryChecklist: React.FC = () => {
  const {
    groceryList,
    currentMealPlan,
    updateGroceryItem,
    addCustomGroceryItem,
    deleteGroceryItem,
    resetGroceryChecklist,
    checkAllGroceryItems,
    selectedMonth,
    setSelectedMonth,
    addMenuIngredientsToGroceryList,
    menus
  } = useLibrary();

  // Custom standalone entry states
  const [customName, setCustomName] = useState('');
  const [customQty, setCustomQty] = useState('');
  const [customUnit, setCustomUnit] = useState('piece');
  const [customCategory, setCustomCategory] = useState<GroceryCategory>('Produce');

  // Interactive editing states
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');
  const [editingQty, setEditingQty] = useState('');
  const [editingUnit, setEditingUnit] = useState('');
  const [editingCategory, setEditingCategory] = useState<GroceryCategory>('Produce');

  // Selected recipe state for adding to list
  const [selectedMenuId, setSelectedMenuId] = useState('');

  // Interface toggles
  const [isAddingOpen, setIsAddingOpen] = useState(false);
  const [hideChecked, setHideChecked] = useState(false);
  const [copiedNotification, setCopiedNotification] = useState(false);

  // Preset Database state
  const [presetSearch, setPresetSearch] = useState('');
  const [presetTab, setPresetTab] = useState<'All' | 'Pantry' | 'Spices' | 'Dairy' | 'Protein' | 'Toiletries/Home' | 'Medicine'>('All');
  const [showPresetDb, setShowPresetDb] = useState(true);

  // Filter grocery items specifically belonging to selected month
  const activeMonthItems = groceryList.filter(item => {
    const itemMonth = item.month || new Date().toISOString().substring(0, 7);
    return itemMonth === selectedMonth;
  });

  const generateMonthsRange = () => {
    const list: string[] = [];
    const baseDate = new Date();
    // Start from 6 months back, go to 6 months forward
    for (let i = -6; i <= 6; i++) {
      const d = new Date(baseDate.getFullYear(), baseDate.getMonth() + i, 1);
      const yyyymm = d.toISOString().substring(0, 7);
      list.push(yyyymm);
    }
    // Also merge in any other months actually present in groceries that are outside this range
    groceryList.forEach(item => {
      if (item.month && !list.includes(item.month)) {
        list.push(item.month);
      }
    });
    // Sort chronologically
    return list.sort();
  };

  const formatMonthLabel = (yyyymm: string) => {
    const [year, month] = yyyymm.split('-');
    const date = new Date(Number(year), Number(month) - 1, 1);
    return date.toLocaleDateString(undefined, { month: 'long', year: 'numeric' });
  };

  const months = generateMonthsRange();

  // Group items by category
  const getMappedItemsByCategory = () => {
    const categoriesMap: { [key in GroceryCategory]: GroceryItem[] } = {
      Produce: [],
      Protein: [],
      Pantry: [],
      Dairy: [],
      Spices: [],
      'Toiletries/Home': [],
      Medicine: [],
      Other: [],
    };

    activeMonthItems.forEach(item => {
      if (hideChecked && item.isChecked) return;
      if (categoriesMap[item.category]) {
        categoriesMap[item.category].push(item);
      } else {
        categoriesMap['Other'].push(item);
      }
    });

    return categoriesMap;
  };

  const groupData = getMappedItemsByCategory();
  const totalItemsCount = activeMonthItems.length;
  const checkedItemsCount = activeMonthItems.filter(item => item.isChecked).length;

  const getFilteredPresets = (): PresetGroceryItem[] => {
    let list = GROCERY_PRESETS;
    if (presetTab !== 'All') {
      list = list.filter(p => p.category === presetTab);
    }
    if (presetSearch.trim()) {
      const q = presetSearch.toLowerCase();
      list = list.filter(p => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
    }
    return list;
  };

  // Insert standalone item
  const handleAddCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customName.trim()) return;

    const qtyNum = customQty === '' ? null : Number(customQty);
    addCustomGroceryItem(
      customName.trim(),
      isNaN(qtyNum as number) ? null : qtyNum,
      customUnit,
      customCategory
    );

    // reset forms
    setCustomName('');
    setCustomQty('');
    setCustomUnit('piece');
    setIsAddingOpen(false);
  };

  const handleDeleteMonthList = () => {
    if (window.confirm(`Are you sure you want to delete all items for ${formatMonthLabel(selectedMonth)}?`)) {
      activeMonthItems.forEach(item => {
        deleteGroceryItem(item.id);
      });
    }
  };

  // Turn on edit mode for single row
  const startEditingItem = (item: GroceryItem) => {
    setEditingItemId(item.id);
    setEditingName(item.name);
    setEditingQty(item.quantity === null ? '' : String(item.quantity));
    setEditingUnit(item.unit);
    setEditingCategory(item.category);
  };

  const saveEditingItem = () => {
    if (!editingName.trim()) return;
    const qtyNum = editingQty === '' ? null : Number(editingQty);

    updateGroceryItem(editingItemId!, {
      name: editingName.trim(),
      quantity: isNaN(qtyNum as number) ? null : qtyNum,
      unit: editingUnit,
      category: editingCategory,
    });

    setEditingItemId(null);
  };

  // Toggle checklist checkbox state
  const handleToggleCheck = (item: GroceryItem) => {
    updateGroceryItem(item.id, { isChecked: !item.isChecked });
  };

  // Build clean text checklist output for system clipboards
  const handleCopyToClipboard = () => {
    if (groceryList.length === 0) {
      alert("List is currently empty.");
      return;
    }

    let textStr = `📋 HARVEST TABLE GROCERY CHECKLIST\n`;
    if (currentMealPlan) {
      textStr += `Assigned Plan: ${currentMealPlan.name}\nWeek: ${currentMealPlan.weekStart}\n`;
    }
    textStr += `Generated: ${new Date().toLocaleDateString()}\n`;
    textStr += `= = = = = = = = = = = = = = = = = = = =\n\n`;

    GROCERY_CATEGORIES.forEach(cat => {
      const catItems = groceryList.filter(item => item.category === cat);
      if (catItems.length === 0) return;

      textStr += `[ ${cat.toUpperCase()} ]\n`;
      catItems.forEach(item => {
        const checkChar = item.isChecked ? '[x]' : '[ ]';
        const qtyStr = item.quantity !== null ? `${item.quantity} ` : '';
        textStr += ` ${checkChar} ${qtyStr}${item.unit} ${item.name}\n`;
      });
      textStr += `\n`;
    });

    navigator.clipboard.writeText(textStr.trim()).then(() => {
      setCopiedNotification(true);
      setTimeout(() => setCopiedNotification(false), 3000);
    });
  };

  // Open standard browser printing dialog for paper checklist use
  const handlePrintList = () => {
    window.print();
  };

  return (
    <div className="space-y-8 print:bg-white print:text-black print:p-0">
      
      {/* Title & Stats */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white border border-earth-sand rounded-3xl p-6 sm:p-8 shadow-xs print:border-none print:shadow-none print:p-0">
        <div className="space-y-2">
          <span className="text-xs font-semibold text-earth-clay tracking-wider uppercase print:hidden">Shopping & Procurement</span>
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="font-serif text-2xl sm:text-3.5xl font-bold text-earth-olive leading-none">
              Grocery List
            </h2>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="text-sm font-bold bg-earth-cream text-earth-olive px-3 py-1.5 rounded-xl border border-earth-sand cursor-pointer focus:outline-none focus:ring-1 focus:ring-earth-sage shrink-0 print:hidden"
            >
              {months.map(m => (
                <option key={m} value={m}>
                  {formatMonthLabel(m)}
                </option>
              ))}
            </select>
            <span className="hidden print:inline font-serif text-xl text-earth-olive font-bold">
              - {formatMonthLabel(selectedMonth)}
            </span>
          </div>
          <p className="text-sm text-earth-warm-gray max-w-lg print:hidden">
            Mark items off on your mobile device as you navigate the aisles. Changes sync in real-time.
          </p>
        </div>

        {/* Action controllers print-excluded */}
        <div className="flex flex-wrap items-center gap-2 print:hidden">
          <button
            onClick={() => setHideChecked(!hideChecked)}
            className="inline-flex h-11 items-center justify-center gap-1.5 rounded-xl border border-earth-sand bg-white hover:bg-earth-sand px-4 text-xs font-bold text-earth-charcoal transition"
          >
            {hideChecked ? <Eye className="h-4 w-4 text-earth-olive" /> : <EyeOff className="h-4 w-4" />}
            <span>{hideChecked ? 'Show All' : 'Hide Checked'}</span>
          </button>

          <button
            onClick={handleCopyToClipboard}
            className="relative inline-flex h-11 items-center justify-center gap-1.5 rounded-xl border border-earth-sand bg-white hover:bg-earth-sand px-4 text-xs font-bold text-earth-charcoal transition"
            id="copy-to-clipboard-btn"
          >
            <Copy className="h-4 w-4" />
            <span>{copiedNotification ? 'Copied!' : 'Export Text'}</span>
          </button>

          <button
            onClick={handlePrintList}
            className="inline-flex h-11 items-center justify-center gap-1.5 rounded-xl border border-earth-sand bg-white hover:bg-earth-sand px-4 text-xs font-bold text-earth-charcoal transition"
          >
            <Printer className="h-4 w-4" />
            <span>Print View</span>
          </button>

          {totalItemsCount > 0 && (
            <button
              onClick={handleDeleteMonthList}
              className="inline-flex h-11 items-center justify-center gap-1.5 rounded-xl border border-red-200 bg-red-50 hover:bg-red-100 px-4 text-xs font-bold text-red-700 transition"
              title="Delete all items on this month's list"
            >
              <Trash2 className="h-4 w-4" />
              <span>Delete Month's List</span>
            </button>
          )}
        </div>
      </div>

      {/* Checklist Stats Progress Bar */}
      {totalItemsCount > 0 && (
        <div className="rounded-2xl border border-earth-sand bg-white p-5 space-y-3 shadow-2xs print:hidden">
          <div className="flex justify-between items-center text-sm">
            <span className="font-bold text-earth-charcoal flex items-center gap-2">
              <ShoppingBag className="h-4.5 w-4.5 text-earth-olive" />
              <span>Basket Progression</span>
            </span>
            <span className="text-xs text-earth-warm-gray font-semibold">
              {checkedItemsCount} of {totalItemsCount} items loaded ({Math.round((checkedItemsCount / totalItemsCount) * 100)}%)
            </span>
          </div>
          <div className="relative h-2 w-full rounded-full bg-earth-sand overflow-hidden">
            <div
              className="absolute left-0 top-0 h-full bg-earth-clay rounded-full transition-all duration-300"
              style={{ width: `${(checkedItemsCount / totalItemsCount) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Two Grid Column layouts (Adding manual row + viewing results list) */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Left Column: Manual insertion form (excludes from print layout) */}
        <div className="lg:col-span-1 space-y-4 print:hidden">
          <div className="bg-white border border-earth-sand rounded-2xl p-5 space-y-4">
            <h3 className="font-serif text-base font-bold text-earth-olive flex items-center gap-2">
              <Plus className="h-4 w-4 text-earth-clay" />
              <span>Add Direct Item</span>
            </h3>

            <form onSubmit={handleAddCustom} className="space-y-3">
              {/* Item name */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-earth-charcoal uppercase block">Item Name</label>
                <input
                  type="text"
                  placeholder="e.g., Avocado, Almond Milk"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  className="w-full rounded-xl border border-earth-sand px-3 py-2 text-xs focus:ring-1 focus:ring-earth-sage bg-earth-cream/40"
                  required
                />
              </div>

              {/* Quantity + Unit line */}
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-earth-charcoal uppercase block">Quantity</label>
                  <input
                    type="number"
                    step="any"
                    placeholder="e.g., 2, 0.5"
                    value={customQty}
                    onChange={(e) => setCustomQty(e.target.value)}
                    className="w-full rounded-xl border border-earth-sand px-3 py-2 text-xs focus:ring-1 focus:ring-earth-sage bg-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-earth-charcoal uppercase block">Unit</label>
                  <select
                    value={customUnit}
                    onChange={(e) => setCustomUnit(e.target.value)}
                    className="w-full rounded-xl border border-earth-sand px-3 py-2 text-xs focus:ring-1 focus:ring-earth-sage bg-white"
                  >
                    {UNITS.map(unit => (
                      <option key={unit} value={unit}>
                        {unit}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Category */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-earth-charcoal uppercase block">Dept / Category</label>
                <select
                  value={customCategory}
                  onChange={(e) => setCustomCategory(e.target.value as GroceryCategory)}
                  className="w-full rounded-xl border border-earth-sand px-3 py-2 text-xs focus:ring-1 focus:ring-earth-sage bg-white"
                >
                  {GROCERY_CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-earth-olive hover:bg-earth-olive-light text-white font-bold text-xs py-2.5 transition mt-2"
                id="add-custom-grocery-item-btn"
              >
                Insert Item
              </button>
            </form>
          </div>

          {/* Add From Library component card */}
          <div className="bg-white border border-earth-sand rounded-2xl p-5 space-y-4">
            <h3 className="font-serif text-base font-bold text-earth-olive flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-earth-clay" />
              <span>Add From Library</span>
            </h3>
            
            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-earth-charcoal uppercase block">Select Recipe</label>
                <select
                  value={selectedMenuId}
                  onChange={(e) => setSelectedMenuId(e.target.value)}
                  className="w-full rounded-xl border border-[#002FA7]/20 px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-[#002FA7] bg-white text-earth-charcoal"
                >
                  <option value="">-- Choose a Recipe --</option>
                  {menus.map(m => (
                    <option key={m.id} value={m.id}>
                      {m.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <button
                onClick={() => {
                  if (!selectedMenuId) return;
                  addMenuIngredientsToGroceryList(selectedMenuId, selectedMonth);
                  setSelectedMenuId('');
                  alert(`Added recipe ingredients to your ${formatMonthLabel(selectedMonth)} checklist!`);
                }}
                disabled={!selectedMenuId}
                className="w-full rounded-xl bg-[#002FA7] hover:bg-[#002FA7]/90 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed text-white font-bold text-xs py-2.5 transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Add Ingredients</span>
              </button>
            </div>
          </div>

          {/* Quick controls reset list */}
          {totalItemsCount > 0 && (
            <div className="flex gap-2.5">
              <button
                onClick={resetGroceryChecklist}
                className="flex-1 rounded-xl border border-earth-sand bg-white text-earth-charcoal hover:bg-earth-sand text-[11px] font-bold py-2.5 transition flex items-center justify-center gap-1.5"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                <span>Uncheck All</span>
              </button>
              <button
                onClick={() => {
                  checkAllGroceryItems(true);
                }}
                className="flex-1 rounded-xl border border-earth-sand bg-white text-earth-charcoal hover:bg-earth-sand text-[11px] font-bold py-2.5 transition flex items-center justify-center gap-1.5"
              >
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>Check All</span>
              </button>
            </div>
          )}
        </div>

        {/* Right Section: Aggregated categories of checklists */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Predefined Master Database Browser Panel */}
          <div className="bg-white border border-earth-sand rounded-3xl overflow-hidden shadow-xs print:hidden">
            <div className="p-5 sm:p-6 border-b border-earth-sand bg-earth-cream/35 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="space-y-1">
                <span className="inline-flex items-center gap-1 rounded-full bg-earth-sage-light text-earth-olive border border-earth-sand px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                  <Sparkles className="h-3 w-3 text-earth-clay" />
                  Predefined Master Database
                </span>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-earth-olive flex items-center gap-2">
                  <span>Grocery Presets Library</span>
                  <span className="text-xs font-sans font-normal text-earth-warm-gray">({GROCERY_PRESETS.length} items cataloged)</span>
                </h3>
                <p className="text-xs text-earth-warm-gray max-w-xl">
                  Quickly tap products to toggle them into your active checklist below.
                </p>
              </div>

              <button
                onClick={() => setShowPresetDb(!showPresetDb)}
                className="inline-flex self-start sm:self-center h-9 items-center justify-center rounded-xl border border-earth-sand bg-white text-xs font-bold text-earth-charcoal px-4 hover:bg-earth-sand transition cursor-pointer gap-1.5"
              >
                {showPresetDb ? 'Hide Preset Library' : 'Browse & Search Presets'}
              </button>
            </div>

            {showPresetDb && (
              <div className="p-5 sm:p-6 bg-white space-y-4">
                {/* Search & Category tabs bar */}
                <div className="flex flex-col md:flex-row gap-3">
                  <div className="relative flex-1">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-earth-warm-gray" />
                    <input
                      type="text"
                      placeholder="Search spaghetti, toiletries, medicine, etc..."
                      value={presetSearch}
                      onChange={(e) => setPresetSearch(e.target.value)}
                      className="w-full rounded-xl border border-earth-sand pl-10 pr-4 py-2 text-xs focus:ring-1 focus:ring-earth-sage"
                    />
                    {presetSearch && (
                      <button
                        onClick={() => setPresetSearch('')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-earth-warm-gray hover:text-earth-charcoal"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>

                  <div className="flex gap-2">
                    {presetSearch || presetTab !== 'All' ? (
                      <button
                        onClick={() => {
                          const list = getFilteredPresets();
                          list.forEach(preset => {
                            const alreadyInList = groceryList.some(item => item.name.toLowerCase() === preset.name.toLowerCase());
                            if (!alreadyInList) {
                              addCustomGroceryItem(
                                preset.name,
                                preset.quantity,
                                preset.unit,
                                preset.category
                              );
                            }
                          });
                        }}
                        className="h-9 inline-flex items-center justify-center rounded-xl bg-earth-olive hover:bg-earth-olive-light text-white font-bold text-xs px-4 transition cursor-pointer gap-1"
                      >
                        <CheckSquareIcon className="h-3.5 w-3.5" />
                        <span>Add Filtered ({getFilteredPresets().length})</span>
                      </button>
                    ) : (
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            const fnb = GROCERY_PRESETS.filter(p => ['Pantry', 'Spices', 'Dairy', 'Protein'].includes(p.category));
                            fnb.forEach(preset => {
                              const alreadyInList = groceryList.some(item => item.name.toLowerCase() === preset.name.toLowerCase());
                              if (!alreadyInList) {
                                addCustomGroceryItem(preset.name, preset.quantity, preset.unit, preset.category);
                              }
                            });
                          }}
                          className="h-9 inline-flex items-center justify-center rounded-xl bg-earth-cream border border-earth-sand hover:bg-earth-sand text-earth-charcoal font-bold text-xs px-3.5 transition cursor-pointer"
                        >
                          + Food & Bev
                        </button>
                        <button
                          onClick={() => {
                            const toiletries = GROCERY_PRESETS.filter(p => p.category === 'Toiletries/Home');
                            toiletries.forEach(preset => {
                              const alreadyInList = groceryList.some(item => item.name.toLowerCase() === preset.name.toLowerCase());
                              if (!alreadyInList) {
                                addCustomGroceryItem(preset.name, preset.quantity, preset.unit, preset.category);
                              }
                            });
                          }}
                          className="h-9 inline-flex items-center justify-center rounded-xl bg-earth-cream border border-earth-sand hover:bg-earth-sand text-earth-charcoal font-bold text-xs px-3.5 transition cursor-pointer"
                        >
                          + Toiletries
                        </button>
                        <button
                          onClick={() => {
                            const meds = GROCERY_PRESETS.filter(p => p.category === 'Medicine');
                            meds.forEach(preset => {
                              const alreadyInList = groceryList.some(item => item.name.toLowerCase() === preset.name.toLowerCase());
                              if (!alreadyInList) {
                                addCustomGroceryItem(preset.name, preset.quantity, preset.unit, preset.category);
                              }
                            });
                          }}
                          className="h-9 inline-flex items-center justify-center rounded-xl bg-earth-cream border border-earth-sand hover:bg-earth-sand text-earth-charcoal font-bold text-xs px-3.5 transition cursor-pointer"
                        >
                          + Medicine
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Subcategory Pill Badges */}
                <div className="flex flex-wrap gap-1.5 border-b border-earth-sand/40 pb-3">
                  {(['All', 'Pantry', 'Spices', 'Dairy', 'Protein', 'Toiletries/Home', 'Medicine'] as const).map(tabKey => {
                    const isActive = presetTab === tabKey;
                    let label = tabKey === 'All' ? '🌟 All/Mixed' : tabKey;
                    if (tabKey === 'Toiletries/Home') label = '🧼 Toiletries';
                    if (tabKey === 'Medicine') label = '💊 Medicine';
                    if (tabKey === 'Pantry') label = '🍳 Pantry';
                    if (tabKey === 'Spices') label = '🧂 Spices';
                    if (tabKey === 'Dairy') label = '🥛 Dairy';
                    if (tabKey === 'Protein') label = '🥩 Protein';

                    return (
                      <button
                        key={tabKey}
                        onClick={() => setPresetTab(tabKey)}
                        className={`px-3 py-1.5 text-xs rounded-xl font-semibold transition cursor-pointer ${
                          isActive
                          ? 'bg-earth-olive text-white shadow-xs'
                          : 'bg-earth-cream/50 text-earth-charcoal border border-earth-sand/55 hover:bg-earth-sand/35'
                        }`}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>

                {/* Scrollable grid container */}
                <div className="max-h-60 overflow-y-auto border border-earth-sand/60 rounded-xl p-3 bg-earth-cream/15 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                  {getFilteredPresets().length === 0 ? (
                    <p className="col-span-full text-center py-6 text-xs text-earth-warm-gray">
                      No matching predefined item found for "{presetSearch}". Fill form to add custom!
                    </p>
                  ) : (
                    getFilteredPresets().map(preset => {
                      const existing = groceryList.find(item => item.name.toLowerCase() === preset.name.toLowerCase());
                      const isAdded = !!existing;

                      const handleToggle = () => {
                        if (existing) {
                          deleteGroceryItem(existing.id);
                        } else {
                          addCustomGroceryItem(
                            preset.name,
                            preset.quantity,
                            preset.unit,
                            preset.category
                          );
                        }
                      };

                      return (
                        <button
                          key={preset.name}
                          onClick={handleToggle}
                          className={`flex items-center justify-between text-left p-2.5 rounded-xl border text-xs transition-all duration-200 cursor-pointer ${
                            isAdded
                            ? 'bg-earth-sage-light/25 border-earth-sage text-earth-olive font-bold'
                            : 'bg-white border-earth-sand text-earth-charcoal hover:bg-earth-sand/20 hover:border-earth-sand-dark'
                          }`}
                        >
                          <div className="min-w-0 pr-1 select-none">
                            <p className="truncate font-medium">{preset.name}</p>
                            <p className="text-[10px] text-earth-warm-gray font-normal truncate mt-0.5">
                              {preset.quantity !== null ? `${preset.quantity} ` : ''}
                              {preset.unit}
                            </p>
                          </div>
                          <span className={`h-5 w-5 rounded-lg flex items-center justify-center shrink-0 transition ${
                            isAdded ? 'bg-earth-olive text-white' : 'bg-earth-cream text-earth-charcoal hover:bg-earth-sand'
                          }`}>
                            {isAdded ? <Check className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
                          </span>
                        </button>
                      );
                    })
                  )}
                </div>
              </div>
            )}
          </div>

          {totalItemsCount === 0 ? (
            <div className="rounded-3xl border border-dashed border-earth-sand bg-white py-16 px-4 text-center space-y-4 shadow-3xs">
              <ShoppingBag className="h-12 w-12 text-earth-sage mx-auto" />
              <div className="space-y-1">
                <h3 className="font-serif font-bold text-xl text-earth-olive">No Groceries generated</h3>
                <p className="text-sm text-earth-warm-gray max-w-sm mx-auto">
                  Select predefined items from the **Grocery Presets Library** above or build a meal plan schedule in the **Meal Planner** tab first to generate!
                </p>
              </div>
            </div>
          ) : (
            GROCERY_CATEGORIES.map(cat => {
              const catItems = groupData[cat] || [];
              if (catItems.length === 0) return null;

              return (
                <div key={cat} className="bg-white border border-earth-sand rounded-2xl overflow-hidden shadow-2xs print:border-none print:shadow-none print:rounded-none">
                  {/* Category Header */}
                  <div className="border-b border-earth-sand bg-earth-cream/50 px-5 py-3.5 flex items-center justify-between print:border-b print:bg-transparent">
                    <h4 className="font-serif text-base font-bold text-earth-olive tracking-tight">
                      {cat === 'Toiletries/Home' ? '🧼 Toiletries & Home Tools' : cat === 'Medicine' ? '💊 Medicine' : cat}
                    </h4>
                    <span className="inline-flex items-center justify-center rounded-full bg-earth-sage/15 text-earth-olive text-xs px-2.5 py-0.5 font-bold print:hidden">
                      {catItems.length} items
                    </span>
                  </div>

                  {/* List of items */}
                  <div className="divide-y divide-earth-sand/50">
                    {catItems.map((item) => {
                      const isEditing = editingItemId === item.id;

                      return (
                        <div
                          key={item.id}
                          className={`flex items-center justify-between p-4 gap-3 transition ${
                            item.isChecked ? 'bg-earth-cream/10' : 'bg-white'
                          }`}
                        >
                          {/* Row Edit Form state */}
                          {isEditing ? (
                            <div className="flex-1 flex flex-wrap gap-2 items-center print:hidden">
                              <input
                                type="text"
                                value={editingName}
                                onChange={(e) => setEditingName(e.target.value)}
                                className="flex-2 min-w-[120px] rounded-lg border border-earth-sand px-2 py-1 text-xs"
                                required
                              />
                              <input
                                type="number"
                                step="any"
                                value={editingQty}
                                onChange={(e) => setEditingQty(e.target.value)}
                                className="w-14 text-center rounded-lg border border-earth-sand px-2 py-1 text-xs"
                                placeholder="Qty"
                              />
                              <select
                                value={editingUnit}
                                onChange={(e) => setEditingUnit(e.target.value)}
                                className="w-20 rounded-lg border border-earth-sand px-1.5 py-1 text-xs"
                              >
                                {UNITS.map(unit => (
                                  <option key={unit} value={unit}>
                                    {unit}
                                  </option>
                                ))}
                              </select>
                              <select
                                value={editingCategory}
                                onChange={(e) => setEditingCategory(e.target.value as GroceryCategory)}
                                className="w-24 rounded-lg border border-earth-sand px-1.5 py-1 text-xs"
                              >
                                {GROCERY_CATEGORIES.map(catVal => (
                                  <option key={catVal} value={catVal}>
                                    {catVal}
                                  </option>
                                ))}
                              </select>
                              <button
                                onClick={saveEditingItem}
                                className="p-1 px-2.5 font-bold rounded-lg bg-earth-olive text-white text-[10px]"
                              >
                                Save
                              </button>
                            </div>
                          ) : (
                            /* Core Display Row State */
                            <div className="flex-1 flex items-center gap-3.5 min-w-0">
                              {/* Checkbox button print-excluded */}
                              <button
                                onClick={() => handleToggleCheck(item)}
                                className="text-earth-sage hover:text-earth-olive transition shrink-0 print:hidden"
                                id={`check-${item.id}`}
                              >
                                {item.isChecked ? (
                                  <CheckSquare className="h-5 w-5 text-earth-clay" />
                                ) : (
                                  <Square className="h-5 w-5 text-earth-sand-dark" />
                                )}
                              </button>

                              {/* Static text bullet print-only */}
                              <span className="hidden print:inline mr-2 text-sm">&#9744;</span>

                              {/* Ingredient quantity / name */}
                              <div className="flex flex-wrap items-baseline gap-1.5 min-w-0">
                                <span className={`text-xs font-bold shrink-0 ${
                                  item.isChecked ? 'text-earth-warm-gray line-through decoration-earth-sand-dark' : 'text-earth-clay'
                                }`}>
                                  {item.quantity !== null ? `${item.quantity} ` : ''}
                                  {item.unit}
                                </span>
                                <span className={`text-sm tracking-tight truncate ${
                                  item.isChecked ? 'text-earth-warm-gray line-through decoration-earth-sand-dark' : 'text-earth-charcoal font-medium'
                                }`}>
                                  {item.name}
                                </span>
                              </div>
                            </div>
                          )}

                          {/* Quick Edit actions print-excluded */}
                          {!isEditing && (
                            <div className="flex items-center gap-1.5 shrink-0 print:hidden">
                              <button
                                onClick={() => startEditingItem(item)}
                                className="p-1.5 text-earth-warm-gray hover:text-earth-olive transition"
                                title="Edit Item"
                                id={`edit-${item.id}`}
                              >
                                <Edit2 className="h-3.5 w-3.5" />
                              </button>
                              <button
                                onClick={() => deleteGroceryItem(item.id)}
                                className="p-1.5 text-earth-warm-gray hover:text-red-500 transition"
                                title="Delete Item"
                                id={`delete-grocery-${item.id}`}
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })
          )}
        </div>

      </div>
    </div>
  );
};
