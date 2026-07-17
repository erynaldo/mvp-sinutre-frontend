import { useEffect, useState } from 'react';
import { Plus, PencilSimple, Trash } from '@phosphor-icons/react';

import { SimpleHeader } from '@/components/layout/SimpleHeader';
import { AddFoodModal } from '@/components/modal/AddFoodModal';
// import { EditFoodModal } from '@/components/modal/EditFoodModal';

import { getFoods, deleteFood } from '@/services/foodService';
import type { Food } from '@/types/food';
import { EditFoodModal } from '@/components/modal/EditFoodModal';

// import { fetchMeals } from '@/services/mealService';

const MODAL_ID = 'create-food-modal';
const EDIT_MODAL_ID = 'edit-food-modal';

export function DietFoodPage() {
  const [foods, setFoods] = useState<Food[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingFood, setEditingFood] = useState<Food | null>(null);

  async function loadFoods() {
    try {
      const data = await getFoods();
      setFoods(data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadFoods(); }, []);

  function handleEdit(food: Food) {
    setEditingFood(food);
    (document.getElementById(EDIT_MODAL_ID) as HTMLDialogElement)?.showModal();
  }

  async function handleDelete(food: Food) {
    const confirmed = window.confirm(`Excluir o alimento "${food.name}"?`);
    if (!confirmed) return;
    await deleteFood(food.id);
    await loadFoods();
  }

  return (
    <div className="w-full max-w-300 mx-auto">
      <SimpleHeader title="Dieta" subtitle="Gerencie seus alimentos" />

      {loading ? (
        <p>Carregando...</p>
      ) : (
        <div className="grid gap-4 mt-6">
          {foods.map((food) => (
            <div key={food.id} className="card bg-base-100 shadow-sm">
              <div className="card-body">
                <div className="flex items-start justify-between">
                  <h2 className="card-title">{food.name}</h2>

                  <div className="flex gap-2">
                    <button
                      className="btn btn-sm btn-outline"
                      onClick={() => handleEdit(food)}
                    >
                      <PencilSimple size={16} /> Alterar
                    </button>
                    <button
                      className="btn btn-sm btn-outline btn-error"
                      onClick={() => handleDelete(food)}
                    >
                      <Trash size={16} /> Excluir
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                  <span>🔥 {food.caloriesPer100g} kcal</span>
                  <span>🍞 {food.carbsPer100g} g</span>
                  <span>🍗 {food.proteinPer100g} g</span>
                  <span>🥑 {food.fatPer100g} g</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <button
        className="btn btn-primary btn-circle btn-lg fixed bottom-6 right-6 shadow-lg z-50"
        onClick={() => (document.getElementById(MODAL_ID) as HTMLDialogElement)?.showModal()}
      >
        <Plus size={24} weight="bold" />
      </button>

      <AddFoodModal modalId={MODAL_ID} onCreated={loadFoods} />
      <EditFoodModal modalId={EDIT_MODAL_ID} food={editingFood} onUpdated={loadFoods} />
    </div>
  );
}
