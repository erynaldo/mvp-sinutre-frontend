import { useEffect, useMemo, useState } from 'react';
import { FormField } from '../forms/FormField';

import { FoodItem } from '@/types/meal';
import { Food } from '@/types/food';
import { searchFoods } from '@/services/foodService';

interface MealItemFormProps {
  onAdd: (item: FoodItem) => void;
}


function calculateItemMacros(food: Food, grams: number) {
  return {
    calories: (food.caloriesPer100g * grams) / 100,
    carbs: (food.carbsPer100g * grams) / 100,
    protein: (food.proteinPer100g * grams) / 100,
    fat: (food.fatPer100g * grams) / 100,
  };
}

export function MealItemForm({ onAdd }: MealItemFormProps) {
  const [query, setQuery] = useState('');

  const [foods, setFoods] = useState<Food[]>([]);

  const [selectedFood, setSelectedFood] =
    useState<Food | null>(null);

  const [grams, setGrams] = useState('');

  const previewMacros = useMemo(() => {
    if (!selectedFood) {
      return null;
    }

    const gramsValue = Number(grams);

    if (!Number.isFinite(gramsValue) || gramsValue <= 0) {
      return null;
    }

    return calculateItemMacros(selectedFood, gramsValue);
  }, [grams, selectedFood]);

  function handleAdd() {
    if (!selectedFood) {
      return;
    }

    const gramsValue = Number(grams);

    if (gramsValue <= 0) {
      return;
    }

    const macros = calculateItemMacros(selectedFood, gramsValue);

    onAdd({
        id: Date.now(),

        foodId: selectedFood.id,

        name: selectedFood.name,

        grams: gramsValue,

        calories: macros.calories,

        carbs: macros.carbs,

        protein: macros.protein,

        fat: macros.fat,
      });

      setSelectedFood(null);
      setQuery('');
      setGrams('');
  }

  useEffect(() => {
    if (query.length < 2) {
      setFoods([]);
      return;
    }

    const timeout = setTimeout(async () => {
      const result =
        await searchFoods(query);

      setFoods(result);
    }, 300);

    return () => clearTimeout(timeout);
  }, [query]);



  return (
    <div className="grid gap-4 items-end lg:grid-cols-[1fr_150px_120px]">
    {/* <div className="grid gap-4 items-end lg:grid-template-columns:1fr_150px_120px"> */}
      <div className="relative">
        
        <FormField
          label="Alimento"
          htmlFor="item-name"
        >
          <input
            id="item-name"
            type="text"
            value={
              selectedFood?.name ?? query
            }
            placeholder="Digite um alimento"
            className="input input-bordered w-full"
            onChange={(e) => {
              setSelectedFood(null);
              setQuery(e.target.value);
            }}
          />
        </FormField>

        {!selectedFood &&
          foods.length > 0 && (
            <ul className="absolute z-50 bg-base-100 border rounded-box shadow w-full mt-1 max-h-60 overflow-auto">

              {foods.map((food) => (
                <li
                  key={food.id}
                  className="px-4 py-2 hover:bg-base-200 cursor-pointer"
                  onClick={() => {
                    setSelectedFood(food);
                    setQuery(food.name);
                    setFoods([]);
                  }}
                >
                  {food.name}
                </li>
              ))}
            </ul>
          )}
      </div>

      <FormField
        label="Gramas"
        htmlFor="item-grams"
      >
        <input
          id="item-grams"
          type="number"
          className="input input-bordered w-full"
          value={grams}
          onChange={(e) =>
            setGrams(e.target.value)
          }
        />
      </FormField>

      <button type="button" className="btn btn-primary btn-outline h-10"  onClick={handleAdd}>
        Adicionar
      </button>

    </div>

    {previewMacros && (
      <div className="rounded-xl border border-base-300 bg-base-50 p-4 lg:col-span-3">
        <p className="text-sm font-semibold text-base-content">Valores estimados para a porção</p>
        <div className="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-lg bg-base-100 p-3">
            <p className="text-xs uppercase tracking-wide text-base-content/60">Calorias</p>
            <p className="mt-1 text-lg font-semibold">{previewMacros.calories.toFixed(0)} kcal</p>
          </div>
          <div className="rounded-lg bg-base-100 p-3">
            <p className="text-xs uppercase tracking-wide text-base-content/60">Proteínas</p>
            <p className="mt-1 text-lg font-semibold">{previewMacros.protein.toFixed(1)} g</p>
          </div>
          <div className="rounded-lg bg-base-100 p-3">
            <p className="text-xs uppercase tracking-wide text-base-content/60">Gordura</p>
            <p className="mt-1 text-lg font-semibold">{previewMacros.fat.toFixed(1)} g</p>
          </div>
          <div className="rounded-lg bg-base-100 p-3">
            <p className="text-xs uppercase tracking-wide text-base-content/60">Carboidratos</p>
            <p className="mt-1 text-lg font-semibold">{previewMacros.carbs.toFixed(1)} g</p>
          </div>
        </div>
      </div>
    )}
  );
}