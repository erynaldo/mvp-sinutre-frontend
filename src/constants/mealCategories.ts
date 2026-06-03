import type { MealCategory, MealCategoryInfo } from '@/types/meal';

export const MEAL_CATEGORIES: readonly MealCategoryInfo[] = [
  { id: 'breakfast', label: 'Café da Manhã', icon: 'ph-coffee' },
  { id: 'snack', label: 'Lanche', icon: 'ph-hamburger' },
  { id: 'lunch', label: 'Almoço', icon: 'ph-bowl-food' },
  { id: 'dinner', label: 'Jantar', icon: 'ph-moon-stars' },
] as const;

export const MEAL_CATEGORY_BY_ID: Record<MealCategory, MealCategoryInfo> =
  MEAL_CATEGORIES.reduce(
    (acc, category) => {
      acc[category.id] = category;
      return acc;
    },
    {} as Record<MealCategory, MealCategoryInfo>,
  );
