import { useEffect, useState } from 'react';

import { SimpleHeader } from '@/components/layout/SimpleHeader';

import { getFoods } from '@/services/foodService';
import type { Food } from '@/types/food';


export function DietFoodPage() {
  const [, setFoods] = useState<Food[]>([]);
  const [, setLoading] = useState(true);

  async function loadFoods() {
    try {
      const data = await getFoods();
      setFoods(data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadFoods(); }, []);

  return (
    <div className="w-full max-w-300 mx-auto">
      <SimpleHeader title="Progresso" subtitle="Acompanhe seu progresso" />
    </div>
  );
}
