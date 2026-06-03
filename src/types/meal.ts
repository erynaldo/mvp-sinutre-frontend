export type MealCategory = 'breakfast' | 'lunch' | 'snack' | 'dinner';

export interface MealCategoryInfo {
  id: MealCategory;
  label: string;
  icon: string;
}

export interface FoodItem {
  id: string;
  name: string;
  grams: number;
  calories: number;
}

export interface Meal {
  id: number;
  date: string;
  category: MealCategory;
  calories: number;
  items?: FoodItem[];
}

export interface MacroSummary {
  carbs: number;
  proteins: number;
  fats: number;
  calories: number;
  caloriesGoal: number;
}

export interface MealsSummary {
  total: number;
  thisMonth: number;
  today: number;
}
