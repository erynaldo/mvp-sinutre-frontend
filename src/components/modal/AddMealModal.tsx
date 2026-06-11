import { useState, useMemo } from 'react';
import type { FoodItem, MacroSummary } from '@/types/meal';
import { MealItemForm } from './MealItemForm';
import { MealItemsTable } from './MealItemsTable';
import { MealMacrosSummary } from './MealMacrosSummary';
import { MealMetadataForm } from './MealMetadataForm';
import type { MealCategory } from '@/types/meal';

interface AddMealModalProps {
  open: boolean;
  typeMeal?: MealCategory;
  onClose: () => void;
  onSave: () => void;
  onRemoveItem?: (item: FoodItem) => void;
}

export function AddMealModal({
  open,
  typeMeal,
  onClose,
  onSave,
  onRemoveItem,
}: AddMealModalProps) {
  const [items, setItems] = useState<FoodItem[]>([]);

  function handleAddItem(
    item: FoodItem,
  ) {
    setItems((current) => [
      ...current,
      item,
    ]);
  }

  function handleRemoveItem(
    item: FoodItem,
  ) {
    setItems((current) =>
      current.filter(
        (x) => x.id !== item.id,
      ),
    );
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
        {
          carbs: 0,
          proteins: 0,
          fats: 0,
          calories: 0,
          caloriesGoal: 0,
        },
      ),
    [items],
  );
  

  return (
    <div className={`modal ${open ? 'modal-open' : ''}`} role="dialog">
      <div className="modal-box max-w-6xl">
        <h2 className="text-3xl font-semibold mb-6">Adicionar Refeição</h2>
        
        <MealMacrosSummary macros={macros} />
        <MealMetadataForm typeMeal={typeMeal}/>

        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-4">Itens da Refeição</h3>
          <MealItemForm  onAdd={handleAddItem} />
        </div>

        <MealItemsTable items={items} onRemove={handleRemoveItem} />

        <div className="modal-action">
          <button type="button" className="btn btn-ghost" onClick={onClose}>
            Cancelar
          </button>
          <button type="button" className="btn btn-primary" onClick={onSave}>
            Salvar refeição
          </button>
        </div>
      </div>
    </div>
  );
}
