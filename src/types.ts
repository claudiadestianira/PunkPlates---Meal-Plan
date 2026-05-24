export interface MenuIngredient {
  name: string;
  quantity: number | null;
  unit: string; // e.g., 'g', 'kg', 'ml', 'L', 'tsp', 'tbsp', 'cup', 'oz', 'lb', 'piece', 'bunch', 'clove', 'slice', 'pinch', 'to taste'
}

export type RecipeType = 'written' | 'link';

export interface Menu {
  id: string;
  name: string;
  description?: string;
  imageUrls: string[]; // local storage base64 or preset image name or external URL
  recipeType: RecipeType;
  recipeText?: string;
  recipeUrl?: string;
  category: string; // e.g., 'Indonesian', 'Italian', 'Salad', 'Soup', etc.
  dateLastMade?: string; // YYYY-MM-DD
  cookCount?: number; // times cooked/made
  notes?: string;
  ingredients: MenuIngredient[];
  createdAt: string;
}

export interface MealPlan {
  id: string;
  name: string;
  weekStart: string; // YYYY-MM-DD (typically a Monday)
  slots: {
    // Structure: { [day_of_week + '-' + meal_type]: menu_id }
    // e.g., { "Monday-Breakfast": "menu-uuid-1", "Monday-Lunch": "menu-uuid-2" }
    [slotKey: string]: string; 
  };
  createdAt: string;
}

export type GroceryCategory = 'Produce' | 'Protein' | 'Pantry' | 'Dairy' | 'Spices' | 'Toiletries/Home' | 'Medicine' | 'Other';

export interface GroceryItem {
  id: string;
  planId?: string; // from which meal plan it is generated (optional)
  name: string;
  quantity: number | null;
  unit: string;
  category: GroceryCategory;
  isChecked: boolean;
  sortOrder: number;
  month?: string; // YYYY-MM (e.g., '2026-05')
}

export const CATEGORIES = [
  'Indonesian',
  'Italian',
  'Salad',
  'Soup',
  'Japanese',
  'Mexican',
  'American',
  'Bakery/Dessert',
  'Asian',
  'Other'
];

export const UNITS = [
  'piece',
  'g',
  'kg',
  'ml',
  'L',
  'tsp',
  'tbsp',
  'cup',
  'clove',
  'bunch',
  'slice',
  'pinch',
  'oz',
  'lb',
  'to taste',
  'besar',
  'kecil',
  'kotak',
  'sachet',
  'karton',
  'gr'
];

export const GROCERY_CATEGORIES: GroceryCategory[] = [
  'Produce',
  'Protein',
  'Dairy',
  'Pantry',
  'Spices',
  'Toiletries/Home',
  'Medicine',
  'Other'
];
