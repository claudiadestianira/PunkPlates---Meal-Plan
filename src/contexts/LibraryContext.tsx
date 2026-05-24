import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { Menu, MealPlan, GroceryItem, GroceryCategory, MenuIngredient } from '../types';
import { SEED_MENUS } from '../data/seedData';
import { doc, setDoc, getDoc, onSnapshot } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';

interface LibraryContextType {
  menus: Menu[];
  mealPlans: MealPlan[];
  currentMealPlan: MealPlan | null;
  groceryList: GroceryItem[];
  addMenu: (menu: Omit<Menu, 'id' | 'createdAt'>) => Menu;
  updateMenu: (id: string, menu: Partial<Menu>) => void;
  deleteMenu: (id: string) => void;
  getOrCreateMealPlan: (weekStart: string) => MealPlan;
  saveMealPlan: (plan: MealPlan) => void;
  deleteMealPlan: (id: string) => void;
  generateGroceryList: (plan: MealPlan) => void;
  updateGroceryItem: (id: string, updates: Partial<GroceryItem>) => void;
  addCustomGroceryItem: (name: string, quantity: number | null, unit: string, category: GroceryCategory) => void;
  deleteGroceryItem: (id: string) => void;
  resetGroceryChecklist: () => void;
  checkAllGroceryItems: (checked: boolean) => void;
  loadMealPlan: (planId: string) => void;
  cloneMealPlan: (planId: string, newWeekStart: string) => void;
  syncCode: string | null;
  syncStatus: 'disconnected' | 'syncing' | 'synced' | 'error';
  lastSyncedAt: string | null;
  enableSync: () => Promise<string>;
  linkSyncCode: (code: string) => Promise<boolean>;
  disableSync: () => void;
  selectedMonth: string;
  setSelectedMonth: (month: string) => void;
  addMenuIngredientsToGroceryList: (menuId: string, month: string) => void;
}

const LibraryContext = createContext<LibraryContextType | undefined>(undefined);

// Simple auto-categorizer for ingredients to grocery categories
const autoCategorizeIngredient = (name: string): GroceryCategory => {
  const normalized = name.toLowerCase();
  
  const produceKeywords = [
    'lettuce', 'tomato', 'cucumber', 'onion', 'garlic', 'lemon', 'lime', 'basil', 'chili', 
    'cilantro', 'ginger', 'potato', 'carrot', 'spinach', 'avocado', 'apple', 'banana', 'pepper', 
    'bell pepper', 'cabbage', 'broccoli', 'mushroom', 'shallot', 'shallots', 'herb', 'parsley',
    'mint', 'kale', 'strawberry', 'veg', 'vegetable', 'fruit', 'scallion', 'scallions'
  ];
  
  const proteinKeywords = [
    'chicken', 'beef', 'pork', 'lamb', 'shrimp', 'prawn', 'fish', 'salmon', 'tuna', 'egg', 'eggs', 
    'meatball', 'meatballs', 'sausage', 'bacon', 'turkey', 'breast', 'fillet', 'steak', 'tofu', 'tempeh'
  ];
  
  const pantryKeywords = [
    'rice', 'flour', 'sugar', 'oil', 'sauce', 'sweet soy', 'kecap', 'mustard', 'broth', 'stock', 
    'breadcrumbs', 'panko', 'honey', 'vinegar', 'pasta', 'spaghetti', 'macaroni', 'noodle', 'noodles',
    'canned', 'beans', 'coconut milk', 'curry paste', 'roux', 'sesame', 'mayo', 'mayonnaise', 'ketchup'
  ];
  
  const dairyKeywords = [
    'mozzarella', 'parmesan', 'parmigiano', 'cheese', 'cheddar', 'cream', 'heavy cream', 'butter', 
    'milk', 'yogurt', 'sour cream', 'gruyere', 'feta'
  ];
  
  const spicesKeywords = [
    'salt', 'pepper', 'oregano', 'thyme', 'powder', 'cumin', 'paprika', 'turmeric', 'coriander', 
    'cinnamon', 'nutmeg', 'chili flakes', 'seasoning', 'msg'
  ];

  const toiletriesKeywords = [
    'shampoo', 'conditioner', 'spons', 'sabun', 'tissue', 'pelembab', 'lulur', 'face wash', 'cling', 
    'harpic', 'detergen', 'pembersih', 'kamper', 'pewangi', 'pembalut', 'softex', 'regulator', 'shower', 
    'lampu', 'ember', 'pan mr dy', 'pan mr diy', '3m', 'superglue', 'aibon', 'pisau cukur', 'sikat gigi', 
    'pasta gigi', 'listerine', 'dental floss', 'koran', 'kitchen paper'
  ];

  const medicineKeywords = [
    'insidal', 'polisilane', 'obat', 'parasetamol', 'paracetamol', 'panadol', 'vitamin'
  ];

  if (produceKeywords.some(kw => normalized.includes(kw))) return 'Produce';
  if (proteinKeywords.some(kw => normalized.includes(kw))) return 'Protein';
  if (pantryKeywords.some(kw => normalized.includes(kw))) return 'Pantry';
  if (dairyKeywords.some(kw => normalized.includes(kw))) return 'Dairy';
  if (spicesKeywords.some(kw => normalized.includes(kw))) return 'Spices';
  if (toiletriesKeywords.some(kw => normalized.includes(kw))) return 'Toiletries/Home';
  if (medicineKeywords.some(kw => normalized.includes(kw))) return 'Medicine';

  return 'Other';
};

const getEmojiForName = (name: string): string => {
  const lower = name.toLowerCase();
  const emojis: string[] = [];
  
  if (lower.includes('ayam') || lower.includes('chicken') || lower.includes('katsu')) {
    emojis.push('🍗');
  }
  if (lower.includes('dori') || lower.includes('dory') || lower.includes('ikan') || lower.includes('fish')) {
    emojis.push('🐟');
  }
  if (lower.includes('udang') || lower.includes('shrimp') || lower.includes('prawn')) {
    emojis.push('🍤');
  }
  if (lower.includes('telur') || lower.includes('telor') || lower.includes('egg')) {
    emojis.push('🍳');
  }
  if (lower.includes('daging') || lower.includes('sapi') || lower.includes('beef') || lower.includes('bakso')) {
    emojis.push('🥩');
  }
  if (lower.includes('sosis') || lower.includes('sausage')) {
    emojis.push('🌭');
  }
  if (lower.includes('cabe') || lower.includes('pedas') || lower.includes('spicy') || lower.includes('chili') || lower.includes('lada')) {
    emojis.push('🌶️');
  }
  if (lower.includes('jamur') || lower.includes('shimeji') || lower.includes('enoki') || lower.includes('mushroom')) {
    emojis.push('🍄');
  }
  if (lower.includes('bawang') || lower.includes('garlic')) {
    emojis.push('🧄');
  }
  if (lower.includes('sayur') || lower.includes('salad') || lower.includes('vegetable') || lower.includes('pakcoy') || lower.includes('capcay') || lower.includes('pecel') || lower.includes('gado') || lower.includes('spinach')) {
    emojis.push('🥗');
  }
  if (lower.includes('mie') || lower.includes('noodles') || lower.includes('noodle') || lower.includes('spaghetti') || lower.includes('pasta') || lower.includes('carbonara')) {
    emojis.push('🍜');
  }
  if (lower.includes('soup') || lower.includes('sup') || lower.includes('soto') || lower.includes('tom yum') || lower.includes('opor')) {
    emojis.push('🍲');
  }
  if (lower.includes('nasi') || lower.includes('rice') || lower.includes('kebuli')) {
    emojis.push('🍛');
  }
  if (lower.includes('tahu') || lower.includes('tofu')) {
    emojis.push('🫘');
  }
  if (lower.includes('tempe') || lower.includes('tempeh')) {
    emojis.push('🌾');
  }
  if (lower.includes('sweet') || lower.includes('manis') || lower.includes('caramel') || lower.includes('mentega') || lower.includes('cheese') || lower.includes('creamy')) {
    emojis.push('🧈');
  }

  // Ensure at least 1-2 emojis
  if (emojis.length === 0) {
    emojis.push('😋');
    emojis.push('🍽️');
  } else if (emojis.length === 1) {
    emojis.push('👩‍🍳');
  }

  return emojis.slice(0, 2).join('');
};

const ensureEmojisInName = (name: string): string => {
  const trimmed = name.trim();
  const hasEmoji = (str: string): boolean => {
    try {
      return /\p{Extended_Pictographic}/u.test(str);
    } catch (e) {
      return /[\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF]/g.test(str);
    }
  };

  if (hasEmoji(trimmed)) {
    return trimmed;
  }

  return `${trimmed} ${getEmojiForName(trimmed)}`;
};

export const LibraryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [menus, setMenus] = useState<Menu[]>([]);
  const [mealPlans, setMealPlans] = useState<MealPlan[]>([]);
  const [currentMealPlan, setCurrentMealPlan] = useState<MealPlan | null>(null);
  const [groceryList, setGroceryList] = useState<GroceryItem[]>([]);
  const [selectedMonth, setSelectedMonthState] = useState<string>(() => {
    const stored = localStorage.getItem('food_selected_month');
    if (stored) return stored;
    return new Date().toISOString().substring(0, 7); // Default to current month e.g. '2026-05'
  });

  const setSelectedMonth = (month: string) => {
    setSelectedMonthState(month);
    localStorage.setItem('food_selected_month', month);
  };

  // Cloud Sync properties
  const [syncCode, setSyncCode] = useState<string | null>(() => localStorage.getItem('food_sync_code'));
  const [syncStatus, setSyncStatus] = useState<'disconnected' | 'syncing' | 'synced' | 'error'>('disconnected');
  const [lastSyncedAt, setLastSyncedAt] = useState<string | null>(() => localStorage.getItem('food_last_synced_at'));

  const isIncomingSyncRef = useRef(false);

  const stripStockImages = (items: Menu[]): Menu[] => {
    return items.map(item => ({
      ...item,
      name: ensureEmojisInName(item.name),
      imageUrls: item.imageUrls?.filter(url => url && !url.includes('unsplash.com')) || []
    }));
  };

  // Upload state helper
  const triggerCloudUpload = async (
    targetMenus: Menu[],
    targetPlans: MealPlan[],
    targetGroceries: GroceryItem[]
  ) => {
    if (!syncCode || isIncomingSyncRef.current) return;
    try {
      setSyncStatus('syncing');
      const docRef = doc(db, 'sync_rooms', syncCode);
      await setDoc(docRef, {
        roomCode: syncCode,
        menus: targetMenus,
        mealPlans: targetPlans,
        groceryList: targetGroceries,
        updatedAt: new Date().toISOString()
      });
      const nowStr = new Date().toLocaleTimeString();
      setLastSyncedAt(nowStr);
      localStorage.setItem('food_last_synced_at', nowStr);
      setSyncStatus('synced');
    } catch (err) {
      setSyncStatus('error');
      console.error('Error synchronizing to cloud doc:', err);
    }
  };

  // 1. Initial Load from LocalStorage (or seed data if empty) & URL param sync check
  useEffect(() => {
    const storedMenus = localStorage.getItem('food_menus');
    const storedDeleted = localStorage.getItem('food_deleted_menu_ids');
    const deletedIds = new Set<string>(storedDeleted ? JSON.parse(storedDeleted) as string[] : []);

    if (storedMenus) {
      try {
        const parsed = JSON.parse(storedMenus) as Menu[];
        // Filter out any internally tracked deleted items just in case
        const parsedFiltered = parsed.filter(m => !deletedIds.has(m.id));
        
        // Intelligently merge any missing seeded menus into their list so they see new 80 items immediately, ignoring deleted ones
        const existingIds = new Set(parsedFiltered.map(m => m.id));
        const missingSeeds = SEED_MENUS.filter(m => !existingIds.has(m.id) && !deletedIds.has(m.id));
        
        if (missingSeeds.length > 0 || parsedFiltered.length !== parsed.length) {
          const merged = stripStockImages([...parsedFiltered, ...missingSeeds]);
          localStorage.setItem('food_menus', JSON.stringify(merged));
          setMenus(merged);
        } else {
          const cleaned = stripStockImages(parsedFiltered);
          localStorage.setItem('food_menus', JSON.stringify(cleaned));
          setMenus(cleaned);
        }
      } catch (err) {
        const cleaned = stripStockImages(SEED_MENUS.filter(m => !deletedIds.has(m.id)));
        localStorage.setItem('food_menus', JSON.stringify(cleaned));
        setMenus(cleaned);
      }
    } else {
      const cleaned = stripStockImages(SEED_MENUS.filter(m => !deletedIds.has(m.id)));
      localStorage.setItem('food_menus', JSON.stringify(cleaned));
      setMenus(cleaned);
    }

    const storedPlans = localStorage.getItem('food_meal_plans');
    if (storedPlans) {
      setMealPlans(JSON.parse(storedPlans));
    }

    const storedGrocery = localStorage.getItem('food_grocery_list');
    if (storedGrocery) {
      setGroceryList(JSON.parse(storedGrocery));
    }

    const storedCurrentPlanId = localStorage.getItem('food_current_plan_id');
    if (storedCurrentPlanId && storedPlans) {
      const plans = JSON.parse(storedPlans) as MealPlan[];
      const found = plans.find(p => p.id === storedCurrentPlanId);
      if (found) setCurrentMealPlan(found);
    }

    // Auto-link if passed inside URL query string
    const params = new URLSearchParams(window.location.search);
    const urlSyncCode = params.get('sync');
    if (urlSyncCode) {
      const cleanCode = urlSyncCode.trim().toUpperCase();
      linkSyncCode(cleanCode).then(success => {
        if (success) {
          const newUrl = window.location.pathname;
          window.history.replaceState({}, '', newUrl);
        }
      });
    }
  }, []);

  // 2. Real-Time Cloud Subscription listener
  useEffect(() => {
    if (!syncCode) {
      setSyncStatus('disconnected');
      return;
    }

    setSyncStatus('syncing');
    const docRef = doc(db, 'sync_rooms', syncCode);

    const unsubscribe = onSnapshot(docRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data();
        if (data) {
          isIncomingSyncRef.current = true;

          if (data.menus) {
            const parsedMenus = stripStockImages(data.menus);
            setMenus(parsedMenus);
            localStorage.setItem('food_menus', JSON.stringify(parsedMenus));
          }
          if (data.mealPlans) {
            setMealPlans(data.mealPlans);
            localStorage.setItem('food_meal_plans', JSON.stringify(data.mealPlans));

            const currentPlanId = localStorage.getItem('food_current_plan_id');
            if (currentPlanId) {
              const found = (data.mealPlans as MealPlan[]).find(p => p.id === currentPlanId);
              if (found) {
                setCurrentMealPlan(found);
              }
            }
          }
          if (data.groceryList) {
            setGroceryList(data.groceryList);
            localStorage.setItem('food_grocery_list', JSON.stringify(data.groceryList));
          }

          const now = new Date().toLocaleTimeString();
          setLastSyncedAt(now);
          localStorage.setItem('food_last_synced_at', now);
          setSyncStatus('synced');

          setTimeout(() => {
            isIncomingSyncRef.current = false;
          }, 30);
        }
      } else {
        // Document does not exist in Firestore yet. Write local state so we initialize it!
        triggerCloudUpload(menus, mealPlans, groceryList);
      }
    }, (error) => {
      console.error("Firestore real-time subscription failed:", error);
      setSyncStatus('error');
    });

    return () => {
      unsubscribe();
    };
  }, [syncCode]);

  // Save to LocalStorage helpers, updated with Firestore auto-upload integration
  const saveMenusToStorage = (updatedMenus: Menu[]) => {
    setMenus(updatedMenus);
    localStorage.setItem('food_menus', JSON.stringify(updatedMenus));
    if (syncCode && !isIncomingSyncRef.current) {
      triggerCloudUpload(updatedMenus, mealPlans, groceryList);
    }
  };

  const saveMealPlansToStorage = (updatedPlans: MealPlan[]) => {
    setMealPlans(updatedPlans);
    localStorage.setItem('food_meal_plans', JSON.stringify(updatedPlans));
    if (syncCode && !isIncomingSyncRef.current) {
      triggerCloudUpload(menus, updatedPlans, groceryList);
    }
  };

  const saveGroceryToStorage = (updatedGrocery: GroceryItem[]) => {
    setGroceryList(updatedGrocery);
    localStorage.setItem('food_grocery_list', JSON.stringify(updatedGrocery));
    if (syncCode && !isIncomingSyncRef.current) {
      triggerCloudUpload(menus, mealPlans, updatedGrocery);
    }
  };

  const saveCurrentPlanToStorage = (plan: MealPlan | null) => {
    setCurrentMealPlan(plan);
    if (plan) {
      localStorage.setItem('food_current_plan_id', plan.id);
    } else {
      localStorage.removeItem('food_current_plan_id');
    }
  };

  // Sync rooms managing methods
  const enableSync = async (): Promise<string> => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Distinct clean alphanumeric chars
    let rPart = '';
    for (let i = 0; i < 4; i++) {
      rPart += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    const newCode = `PUNK-${rPart}`;

    setSyncCode(newCode);
    localStorage.setItem('food_sync_code', newCode);
    setSyncStatus('syncing');

    try {
      const docRef = doc(db, 'sync_rooms', newCode);
      await setDoc(docRef, {
        roomCode: newCode,
        menus,
        mealPlans,
        groceryList,
        updatedAt: new Date().toISOString()
      });
      const nowStr = new Date().toLocaleTimeString();
      setLastSyncedAt(nowStr);
      localStorage.setItem('food_last_synced_at', nowStr);
      setSyncStatus('synced');
    } catch (err) {
      console.error("Failed to initialize sync room:", err);
      setSyncStatus('error');
    }

    return newCode;
  };

  const linkSyncCode = async (code: string): Promise<boolean> => {
    const formattedCode = code.trim().toUpperCase();
    if (!formattedCode) return false;

    setSyncStatus('syncing');
    try {
      const docRef = doc(db, 'sync_rooms', formattedCode);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        isIncomingSyncRef.current = true;

        setSyncCode(formattedCode);
        localStorage.setItem('food_sync_code', formattedCode);

        if (data.menus) {
          const parsedMenus = stripStockImages(data.menus);
          setMenus(parsedMenus);
          localStorage.setItem('food_menus', JSON.stringify(parsedMenus));
        }
        if (data.mealPlans) {
          setMealPlans(data.mealPlans);
          localStorage.setItem('food_meal_plans', JSON.stringify(data.mealPlans));

          const currentPlanId = localStorage.getItem('food_current_plan_id');
          if (currentPlanId) {
            const found = (data.mealPlans as MealPlan[]).find(p => p.id === currentPlanId);
            if (found) {
              setCurrentMealPlan(found);
            }
          }
        }
        if (data.groceryList) {
          setGroceryList(data.groceryList);
          localStorage.setItem('food_grocery_list', JSON.stringify(data.groceryList));
        }

        const now = new Date().toLocaleTimeString();
        setLastSyncedAt(now);
        localStorage.setItem('food_last_synced_at', now);
        setSyncStatus('synced');

        setTimeout(() => {
          isIncomingSyncRef.current = false;
        }, 50);
        return true;
      } else {
        setSyncStatus('disconnected');
        return false;
      }
    } catch (err) {
      console.error("Failed to link sync code:", err);
      setSyncStatus('error');
      return false;
    }
  };

  const disableSync = () => {
    setSyncCode(null);
    localStorage.removeItem('food_sync_code');
    localStorage.removeItem('food_last_synced_at');
    setLastSyncedAt(null);
    setSyncStatus('disconnected');
  };

  // 2. Menu CRUD Actions
  const addMenu = (newMenuData: Omit<Menu, 'id' | 'createdAt'>) => {
    const newMenu: Menu = {
      ...newMenuData,
      name: ensureEmojisInName(newMenuData.name),
      id: 'menu-' + Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString()
    };
    const updated = [newMenu, ...menus];
    saveMenusToStorage(updated);
    return newMenu;
  };

  const updateMenu = (id: string, updatedFields: Partial<Menu>) => {
    const updatedName = updatedFields.name !== undefined ? ensureEmojisInName(updatedFields.name) : undefined;
    const updated = menus.map(m => {
      if (m.id === id) {
        return {
          ...m,
          ...updatedFields,
          ...(updatedName !== undefined ? { name: updatedName } : {})
        };
      }
      return m;
    });
    saveMenusToStorage(updated);
  };

  const deleteMenu = (id: string) => {
    const updated = menus.filter(m => m.id !== id);
    saveMenusToStorage(updated);

    // Save deleted ID to tracking list in localStorage
    const storedDeleted = localStorage.getItem('food_deleted_menu_ids');
    const deletedIds = storedDeleted ? JSON.parse(storedDeleted) as string[] : [];
    if (!deletedIds.includes(id)) {
      deletedIds.push(id);
      localStorage.setItem('food_deleted_menu_ids', JSON.stringify(deletedIds));
    }

    // Filter from meal planner slots as well!
    const updatedPlans = mealPlans.map(plan => {
      let slotsModified = false;
      const cleanSlots = { ...plan.slots };
      Object.keys(cleanSlots).forEach(key => {
        if (cleanSlots[key] === id) {
          delete cleanSlots[key];
          slotsModified = true;
        }
      });
      return slotsModified ? { ...plan, slots: cleanSlots } : plan;
    });
    
    if (JSON.stringify(updatedPlans) !== JSON.stringify(mealPlans)) {
      saveMealPlansToStorage(updatedPlans);
      if (currentMealPlan) {
        const matchingCurrent = updatedPlans.find(p => p.id === currentMealPlan.id);
        if (matchingCurrent) {
          saveCurrentPlanToStorage(matchingCurrent);
        }
      }
    }
  };

  // 3. Meal Planner Actions
  const getOrCreateMealPlan = (weekStart: string) => {
    const existing = mealPlans.find(p => p.weekStart === weekStart);
    if (existing) {
      return existing;
    }

    // Create a new one
    const newPlan: MealPlan = {
      id: 'plan-' + Math.random().toString(36).substr(2, 9),
      name: `Week of ${new Date(weekStart).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}`,
      weekStart,
      slots: {},
      createdAt: new Date().toISOString()
    };

    return newPlan;
  };

  const saveMealPlan = (plan: MealPlan) => {
    const exists = mealPlans.some(p => p.id === plan.id);
    let updated: MealPlan[];
    if (exists) {
      updated = mealPlans.map(p => p.id === plan.id ? plan : p);
    } else {
      updated = [...mealPlans, plan];
    }
    saveMealPlansToStorage(updated);
    saveCurrentPlanToStorage(plan);
  };

  const deleteMealPlan = (id: string) => {
    const updated = mealPlans.filter(p => p.id !== id);
    saveMealPlansToStorage(updated);
    if (currentMealPlan?.id === id) {
      saveCurrentPlanToStorage(updated.length > 0 ? updated[0] : null);
    }
  };

  const loadMealPlan = (planId: string) => {
    const plan = mealPlans.find(p => p.id === planId);
    if (plan) {
      saveCurrentPlanToStorage(plan);
      // Automatically load the grocery list associated with it, if any
      const storedGrocery = localStorage.getItem('food_grocery_list');
      if (storedGrocery) {
        const parsed = JSON.parse(storedGrocery) as GroceryItem[];
        // Only trigger list filtering if they match the plan
        const planItems = parsed.filter(item => item.planId === planId);
        if (planItems.length > 0) {
          setGroceryList(parsed);
        }
      }
    }
  };

  const cloneMealPlan = (planId: string, newWeekStart: string) => {
    const sourcePlan = mealPlans.find(p => p.id === planId);
    if (!sourcePlan) return;

    const clonedPlan: MealPlan = {
      id: 'plan-' + Math.random().toString(36).substr(2, 9),
      name: `Week of ${new Date(newWeekStart).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })} (Cloned)`,
      weekStart: newWeekStart,
      slots: { ...sourcePlan.slots },
      createdAt: new Date().toISOString()
    };

    const updated = [...mealPlans, clonedPlan];
    saveMealPlansToStorage(updated);
    saveCurrentPlanToStorage(clonedPlan);
  };

  // 4. Grocery List Generation Engine
  const generateGroceryList = (plan: MealPlan) => {
    // 1. Gather all unique non-empty menu IDs in slots
    const activeMenuIds = Object.values(plan.slots).filter(id => !!id);
    
    // Map with Key: "lowercaseName|unit" -> value: { name, quantity, unit, category }
    const mergedIngredients: {
      [key: string]: {
        name: string;
        quantity: number | null;
        unit: string;
        category: GroceryCategory;
      };
    } = {};

    activeMenuIds.forEach(mId => {
      const menu = menus.find(m => m.id === mId);
      if (!menu) return;

      menu.ingredients.forEach(ing => {
        const cleanName = ing.name.trim();
        if (!cleanName) return;

        const key = `${cleanName.toLowerCase()}|${ing.unit.toLowerCase()}`;
        const autoCat = autoCategorizeIngredient(cleanName);

        if (mergedIngredients[key]) {
          // If the ingredient exists and both have values, add them!
          const currentQty = mergedIngredients[key].quantity;
          const nextQty = ing.quantity;

          if (currentQty !== null && nextQty !== null) {
            mergedIngredients[key].quantity = Number((currentQty + nextQty).toFixed(2));
          } else if (currentQty === null && nextQty !== null) {
            mergedIngredients[key].quantity = nextQty;
          }
        } else {
          mergedIngredients[key] = {
            name: cleanName,
            quantity: ing.quantity,
            unit: ing.unit,
            category: autoCat
          };
        }
      });
    });

    const targetMonth = plan.weekStart.substring(0, 7);

    // Convert merged dictionary into structured GroceryItem objects
    let sortIdx = 0;
    const items: GroceryItem[] = Object.values(mergedIngredients).map(item => {
      return {
        id: 'grocery-' + Math.random().toString(36).substr(2, 9),
        planId: plan.id,
        name: item.name,
        quantity: item.quantity,
        unit: item.unit,
        category: item.category,
        isChecked: false,
        sortOrder: sortIdx++,
        month: targetMonth
      };
    });

    // Merge with existing lists but clear any old items linked to this same planId
    const otherItems = groceryList.filter(item => item.planId !== plan.id);
    const updated = [...otherItems, ...items];
    saveGroceryToStorage(updated);
  };

  // Manual actions on Grocery items
  const updateGroceryItem = (id: string, updates: Partial<GroceryItem>) => {
    const updated = groceryList.map(item => {
      if (item.id === id) {
        return { ...item, ...updates };
      }
      return item;
    });
    saveGroceryToStorage(updated);
  };

  const addCustomGroceryItem = (name: string, quantity: number | null, unit: string, category: GroceryCategory) => {
    const newItem: GroceryItem = {
      id: 'grocery-' + Math.random().toString(36).substr(2, 9),
      planId: currentMealPlan?.id || undefined,
      name: name.trim(),
      quantity,
      unit,
      category,
      isChecked: false,
      sortOrder: groceryList.length,
      month: selectedMonth
    };
    const updated = [...groceryList, newItem];
    saveGroceryToStorage(updated);
  };

  const addMenuIngredientsToGroceryList = (menuId: string, targetMonth: string) => {
    const menu = menus.find(m => m.id === menuId);
    if (!menu) return;

    const updated = [...groceryList];
    menu.ingredients.forEach(ing => {
      const cleanName = ing.name.trim();
      if (!cleanName) return;

      const autoCat = autoCategorizeIngredient(cleanName);
      
      const existingIdx = updated.findIndex(
        item =>
          item.name.toLowerCase() === cleanName.toLowerCase() &&
          item.unit.toLowerCase() === ing.unit.toLowerCase() &&
          (item.month === targetMonth || (!item.month && targetMonth === new Date().toISOString().substring(0, 7)))
      );

      if (existingIdx > -1) {
        const currentQty = updated[existingIdx].quantity;
        const nextQty = ing.quantity;
        if (currentQty !== null && nextQty !== null) {
          updated[existingIdx].quantity = Number((currentQty + nextQty).toFixed(2));
        } else if (currentQty === null && nextQty !== null) {
          updated[existingIdx].quantity = nextQty;
        }
      } else {
        updated.push({
          id: 'grocery-' + Math.random().toString(36).substr(2, 9),
          name: cleanName,
          quantity: ing.quantity,
          unit: ing.unit,
          category: autoCat,
          isChecked: false,
          sortOrder: updated.length,
          month: targetMonth
        });
      }
    });

    saveGroceryToStorage(updated);
  };

  const deleteGroceryItem = (id: string) => {
    const updated = groceryList.filter(item => item.id !== id);
    saveGroceryToStorage(updated);
  };

  const resetGroceryChecklist = () => {
    const updated = groceryList.map(item => {
      const itemMonth = item.month || new Date().toISOString().substring(0, 7);
      if (itemMonth === selectedMonth) {
        return { ...item, isChecked: false };
      }
      return item;
    });
    saveGroceryToStorage(updated);
  };

  const checkAllGroceryItems = (checked: boolean) => {
    const updated = groceryList.map(item => {
      const itemMonth = item.month || new Date().toISOString().substring(0, 7);
      if (itemMonth === selectedMonth) {
        return { ...item, isChecked: checked };
      }
      return item;
    });
    saveGroceryToStorage(updated);
  };

  return (
    <LibraryContext.Provider
      value={{
        menus,
        mealPlans,
        currentMealPlan,
        groceryList,
        addMenu,
        updateMenu,
        deleteMenu,
        getOrCreateMealPlan,
        saveMealPlan,
        deleteMealPlan,
        generateGroceryList,
        updateGroceryItem,
        addCustomGroceryItem,
        deleteGroceryItem,
        resetGroceryChecklist,
        checkAllGroceryItems,
        loadMealPlan,
        cloneMealPlan,
        syncCode,
        syncStatus,
        lastSyncedAt,
        enableSync,
        linkSyncCode,
        disableSync,
        selectedMonth,
        setSelectedMonth,
        addMenuIngredientsToGroceryList
      }}
    >
      {children}
    </LibraryContext.Provider>
  );
};

export const useLibrary = () => {
  const context = useContext(LibraryContext);
  if (!context) {
    throw new Error('useLibrary must be used within a LibraryProvider');
  }
  return context;
};
