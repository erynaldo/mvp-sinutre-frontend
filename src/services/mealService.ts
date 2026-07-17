import { api } from '@/lib/api';

export async function createMeal(
  meal: {
    type: string;
    eatTime: string;
    description?: string;

    items: {
      foodId: number;
      grams: number;
    }[];
  },
) {
  return api.post('/meals', meal);
}


// xxxxxxxxxxxxxxxxxxxxxxxxxxx


export async function updateMeal(
  id: number | string,
  meal: {
    type: string;
    eatTime: string;
    description?: string;
    items: {
      foodId: number;
      grams: number;
    }[];
  },
) {
  return api.put(`/meals/${id}`, meal);
}

export const updateMealFood = async (id: string, data: any) => {
  return await api.put(`/meal-foods/${id}`, data);
};

export const deleteMealFood = async (id: number | string) => {
  return await api.delete(`/meals/${id}`);
};