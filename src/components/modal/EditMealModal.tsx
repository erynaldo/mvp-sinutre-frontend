import { useEffect, useMemo, useState } from 'react';
import type { FoodItem } from '@/types/meal';
import type { Meal } from '@/types/mealSummary';
import { MealItemForm } from './MealItemForm';
import { MealItemsTable } from './MealItemsTable';
import { MealMacrosSummary } from './MealMacrosSummary';
import { MealMetadataForm } from './MealMetadataForm';
import { MEAL_CATEGORY_BY_ID } from '@/constants/mealCategories';
import { updateMeal } from '@/services/mealService';
import type { MealState } from '@/types/meal';

interface EditMealModalProps {
  open: boolean;
  meal: Meal | null;
  onClose: () => void;
  onMealUpdated: () => Promise<void>;
}

export function EditMealModal({ open, meal, onClose, onMealUpdated }: EditMealModalProps) {
  const [form, setForm] = useState<MealState>({
    description: '',
    type: '',
    eatTime: '',
  });
  const [items, setItems] = useState<FoodItem[]>([]);
  const [loading, setLoading] = useState(false); 

  useEffect(() => {
    if (!meal) return;

    const category = MEAL_CATEGORY_BY_ID[meal.type];
    setForm({
      description: meal.name ?? '',
      type: category.id,
      eatTime: meal.eatTime ? new Date(meal.eatTime).toISOString().slice(0, 16) : '',
    });

    setItems(
      (meal.items ?? []).map((item) => ({
        id: item.id ?? `${item.mealId ?? meal.id}-${item.foodId}`,
        foodId: item.foodId,
        name: item.food?.name ?? 'Alimento',
        grams: item.grams,
        calories: item.food?.caloriesPer100g ? (item.food.caloriesPer100g * item.grams) / 100 : 0,
        carbs: item.food?.carbsPer100g ? (item.food.carbsPer100g * item.grams) / 100 : 0,
        protein: item.food?.proteinPer100g ? (item.food.proteinPer100g * item.grams) / 100 : 0,
        fat: item.food?.fatPer100g ? (item.food.fatPer100g * item.grams) / 100 : 0,
      })),
    );
  }, [meal]);

  function handleAddItem(item: FoodItem) {
    setItems((current) => [...current, item]);
  }

  function handleRemoveItem(item: FoodItem) {
    setItems((current) => current.filter((x) => x.id !== item.id));
  }

  const macros = useMemo(
    () =>
      items.reduce(
        (acc, item) => {
          acc.carbs += item.carbs;
          acc.proteins += item.protein;
          acc.fats += item.fat;
          acc.calories += item.calories;
          return acc;
        },
        { carbs: 0, proteins: 0, fats: 0, calories: 0, caloriesGoal: 0 },
      ),
    [items],
  );

  async function handleSave() {
    if (!meal) return;

    try {
      setLoading(true);
      await updateMeal(meal.id, {
        type: form.type,
        eatTime: form.eatTime,
        description: form.description,
        items: items.map((item) => ({ foodId: item.foodId, grams: item.grams })),
      });
      await onMealUpdated();
      onClose();
    } finally {
      setLoading(false);
    }
  }

  if (!open || !meal) return null;

  return (
    <div className="modal modal-open" role="dialog">
      <div className="modal-box max-w-6xl">
        <h2 className="text-3xl font-semibold mb-6">Editar Refeição</h2>

        <MealMacrosSummary macros={macros} />
        <MealMetadataForm meal={form} setMeal={setForm} />

        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-4">Itens da Refeição</h3>
          <MealItemForm onAdd={handleAddItem} />
        </div>

        <MealItemsTable items={items} onRemove={handleRemoveItem} />

        <div className="modal-action">
          <button type="button" className="btn btn-ghost" onClick={onClose}>
            Cancelar
          </button>
          <button type="button" className="btn btn-primary" onClick={handleSave} disabled={loading}>
            {loading ? 'Salvando...' : 'Salvar alterações'}
          </button>
        </div>
      </div>
    </div>
  );
}
