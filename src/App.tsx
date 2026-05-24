import React, { useState } from 'react';
import { LibraryProvider, useLibrary } from './contexts/LibraryContext';
import { Navbar } from './components/Navbar';
import { MenuCard } from './components/MenuCard';
import { MenuDetailModal } from './components/MenuDetailModal';
import { MenuFormModal } from './components/MenuFormModal';
import { WeeklyPlanner } from './components/WeeklyPlanner';
import { GroceryChecklist } from './components/GroceryChecklist';
import { SyncModal } from './components/SyncModal';
import { Menu, CATEGORIES } from './types';
import { Search, Plus, Filter, Salad, CheckSquare, Sparkles, BookOpen } from 'lucide-react';

type SortOption = 'created' | 'alpha-asc' | 'alpha-desc' | 'least-cooked' | 'most-cooked';

function Dashboard() {
  const { menus, addMenu, updateMenu, deleteMenu } = useLibrary();

  // Tab State
  const [activeTab, setActiveTab] = useState<'library' | 'planner' | 'grocery'>('library');

  // Search, Filter & Sort State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState<SortOption>('alpha-asc');

  // Modal view states
  const [viewingMenu, setViewingMenu] = useState<Menu | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [menuToEdit, setMenuToEdit] = useState<Menu | undefined>(undefined);
  const [isSyncOpen, setIsSyncOpen] = useState(false);

  // Filter recipes derived state
  const processedMenus = menus.filter(menu => {
    const matchSearch = menu.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                      (menu.description && menu.description.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchCategory = selectedCategory === 'All' || menu.category === selectedCategory;
    return matchSearch && matchCategory;
  });

  // Sort integrated state
  const filteredMenus = [...processedMenus].sort((a, b) => {
    if (sortBy === 'alpha-asc') {
      return a.name.localeCompare(b.name);
    }
    if (sortBy === 'alpha-desc') {
      return b.name.localeCompare(a.name);
    }
    if (sortBy === 'least-cooked') {
      const countA = a.cookCount || 0;
      const countB = b.cookCount || 0;
      if (countA !== countB) {
        return countA - countB;
      }
      return a.name.localeCompare(b.name);
    }
    if (sortBy === 'most-cooked') {
      const countA = a.cookCount || 0;
      const countB = b.cookCount || 0;
      if (countB !== countA) {
        return countB - countA;
      }
      return a.name.localeCompare(b.name);
    }
    // Default 'created' - recently added first
    const dateA = new Date(a.createdAt || '').getTime();
    const dateB = new Date(b.createdAt || '').getTime();
    return dateB - dateA;
  });

  // Action methods bridging Context
  const handleCreateOrUpdateMenu = (menuData: Omit<Menu, 'id' | 'createdAt'>) => {
    if (menuToEdit) {
      updateMenu(menuToEdit.id, menuData);
    } else {
      addMenu(menuData);
    }
  };

  const handleStartEdit = (menu: Menu) => {
    setViewingMenu(null);
    setMenuToEdit(menu);
    setIsFormOpen(true);
  };

  const handleStartCreate = () => {
    setMenuToEdit(undefined);
    setIsFormOpen(true);
  };

  const handleQuickPlan = (menu: Menu) => {
    // Navigate user to Planner tab directly and align active modal states
    setActiveTab('planner');
  };

  const { groceryList } = useLibrary();

  return (
    <div className="min-h-screen bg-earth-cream text-earth-charcoal flex flex-col selection:bg-earth-sage/30 selection:text-earth-olive pb-12">
      {/* Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        groceryCount={groceryList.length}
        onOpenSyncModal={() => setIsSyncOpen(true)}
      />

      <main className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* TAB 1: MENU LIBRARY VIEW */}
        {activeTab === 'library' && (
          <div className="space-y-8 animate-fade-in">
            {/* Header Block with Search */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white border border-earth-sand rounded-3xl p-6 sm:p-8 shadow-xs">
              <div className="space-y-1">
                <span className="text-xs font-semibold text-earth-clay tracking-wider uppercase">Culinary Registry</span>
                <h1 className="font-serif text-3xl sm:text-4.5xl font-bold text-earth-olive leading-tight flex items-center gap-2">
                  D&C&apos;s Menupedia
                </h1>
                <p className="text-sm text-earth-warm-gray max-w-xl">
                  Browse and search your custom recipes, cuisine links, and core ingredient specifications. Add new delicacies to expand your catalog.
                </p>
              </div>

              {/* Add New Menu Action */}
              <button
                onClick={handleStartCreate}
                className="shrink-0 inline-flex items-center justify-center gap-2 rounded-xl bg-earth-olive hover:bg-earth-olive-light px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:scale-[1.02] active:scale-95 duration-200"
                id="add-new-menu-btn"
              >
                <Plus className="h-4.5 w-4.5" />
                <span>Add New Menu</span>
              </button>
            </div>

            {/* Filter controls panel */}
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between bg-white border border-earth-sand rounded-2xl p-4.5">
              <div className="flex flex-col sm:flex-row gap-3 w-full lg:max-w-xl shrink-0">
                {/* Search Bar */}
                <div className="relative flex-1 w-full">
                  <Search className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-earth-warm-gray" />
                  <input
                    type="text"
                    placeholder="Search recipes, ingredients, backstories..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-xl border border-earth-sand bg-earth-cream/20 pl-11 pr-4 py-3 text-sm focus:border-earth-sage focus:ring-1 focus:ring-earth-sage transition"
                    id="search-library-input"
                  />
                </div>

                {/* Sort dropdown */}
                <div className="relative flex items-center gap-2 w-full sm:w-auto">
                  <span className="text-xs font-bold text-earth-charcoal whitespace-nowrap">Sort:</span>
                  <select
                    id="sort-select"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                    className="w-full sm:w-auto rounded-xl border border-earth-sand bg-white pl-3 pr-8 py-3 text-xs font-bold text-earth-charcoal focus:border-earth-sage focus:ring-1 focus:ring-earth-sage cursor-pointer transition"
                  >
                    <option value="alpha-asc">🔤 Alphabetical (A-Z)</option>
                    <option value="created">🕒 Recently Added</option>
                    <option value="alpha-desc">🔤 Alphabetical (Z-A)</option>
                    <option value="least-cooked">🍳 Least to most cooked</option>
                    <option value="most-cooked">🔥 Most to least cooked</option>
                  </select>
                </div>
              </div>

              {/* Horizontal scrollable category sliders */}
              <div className="flex gap-2 max-w-full overflow-x-auto pb-1/2 justify-start lg:justify-end lg:flex-1">
                <button
                  onClick={() => setSelectedCategory('All')}
                  className={`rounded-full px-4 py-1.5 text-xs font-semibold shrink-0 transition ${
                    selectedCategory === 'All'
                      ? 'bg-earth-olive text-white shadow-xs'
                      : 'bg-earth-cream hover:bg-earth-sand text-earth-warm-gray border border-earth-sand/65'
                  }`}
                >
                  All Cuisine
                </button>
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`rounded-full px-4 py-1.5 text-xs font-semibold shrink-0 transition ${
                      selectedCategory === cat
                        ? 'bg-earth-olive text-white shadow-xs'
                        : 'bg-earth-cream hover:bg-earth-sand text-earth-warm-gray border border-earth-sand/65'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Dishes Cards Grid */}
            {filteredMenus.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-earth-sand bg-white py-20 text-center space-y-4 shadow-3xs">
                <Salad className="h-12 w-12 text-earth-sage mx-auto" />
                <div className="space-y-1">
                  <h3 className="font-serif font-bold text-xl text-earth-olive">No recipes found</h3>
                  <p className="text-sm text-earth-warm-gray max-w-sm mx-auto">
                    Try adjusting your search query, selecting another category, or insert some savory recipes!
                  </p>
                </div>
                <button
                  onClick={handleStartCreate}
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-earth-clay hover:opacity-85"
                >
                  <Plus className="h-4 w-4" />
                  <span>Build custom menu now</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredMenus.map((menu) => (
                  <MenuCard
                    key={menu.id}
                    menu={menu}
                    onOpenDetail={setViewingMenu}
                    onAddToPlanner={handleQuickPlan}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: WEEKLY MEAL PLANNER */}
        {activeTab === 'planner' && (
          <div className="animate-fade-in">
            <WeeklyPlanner
              onNavigateToGrocery={() => setActiveTab('grocery')}
              onOpenSyncModal={() => setIsSyncOpen(true)}
            />
          </div>
        )}

        {/* TAB 3: MONTHLY GROCERY CHECKLIST */}
        {activeTab === 'grocery' && (
          <div className="animate-fade-in">
            <GroceryChecklist />
          </div>
        )}
      </main>

      {/* FOOTER BANNER print-excluded */}
      <footer className="mt-16 border-t border-earth-sand pt-8 text-center text-xs text-earth-warm-gray px-4 print:hidden">
        <p className="max-w-md mx-auto leading-relaxed">
          <strong>Punk Plates Recipe Companion</strong> — Your personal culinary cookbook, grocery manager, and weekly nutrition coordinator. Persisted beautifully to local storage.
        </p>
        <p className="mt-2 text-[10px] tracking-wide text-earth-sage">
          Handcrafted in Elegant Punk Plates Theme.
        </p>
      </footer>

      {/* DETAIL DRAWER / MODAL */}
      {viewingMenu && (
        <MenuDetailModal
          menu={viewingMenu}
          onClose={() => setViewingMenu(null)}
          onEdit={handleStartEdit}
          onDelete={deleteMenu}
          onAddToPlanner={handleQuickPlan}
        />
      )}

      {/* CREATION & EDITING FORM MODAL */}
      {isFormOpen && (
        <MenuFormModal
          menuToEdit={menuToEdit}
          onClose={() => {
            setIsFormOpen(false);
            setMenuToEdit(undefined);
          }}
          onSave={handleCreateOrUpdateMenu}
        />
      )}

      {/* SYNC SETTINGS MODAL */}
      {isSyncOpen && (
        <SyncModal onClose={() => setIsSyncOpen(false)} />
      )}
    </div>
  );
}

export default function App() {
  return (
    <LibraryProvider>
      <Dashboard />
    </LibraryProvider>
  );
}
