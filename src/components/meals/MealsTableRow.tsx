import { DotsThree } from '@phosphor-icons/react';
import { PencilSimple, Trash } from "@phosphor-icons/react";
import { MEAL_CATEGORY_BY_ID } from '@/constants/mealCategories';
import type { Meal } from '@/types/mealSummary';
import { formatDate } from '@/utils/date';

interface MealsTableRowProps {
  meal: Meal;
  onActionClick?: (meal: Meal) => void;
  onEdit?: (meal: Meal) => void;
  onDelete?: (meal: Meal) => void;
}

export function MealsTableRow({ meal, onActionClick, onEdit, onDelete }: MealsTableRowProps) {
  const category = MEAL_CATEGORY_BY_ID[meal.type];

  return (
    <tr className="hover">
      <td className="text-center font-bold text-base-content/60">{meal.id}</td>
      <td className="font-medium">{meal.name}</td>
      <td className="font-medium">{formatDate(meal.eatTime)}</td>
      <td className="font-semibold">{category.label}</td>
      <td>
        <span className="badge badge-primary badge-outline">
          {meal.totals.calories} kcal
        </span>
      </td>
      <td className="text-center">
        {/* <button
          type="button"
          onClick={() => onActionClick?.(meal)}
          className="btn btn-sm btn-ghost btn-square"
          aria-label="Mais ações"
        >
          <DotsThree size={20} />
        </button> */}
        <div className="flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => onEdit?.(meal)}
            className="btn btn-sm btn-outline btn-primary"
            aria-label={`Alterar refeição ${meal.name}`}
          >
            <PencilSimple size={16} />
            Alterar
          </button>
          <button
            type="button"
            onClick={() => onDelete?.(meal)}
            className="btn btn-sm btn-outline btn-error"
            aria-label={`Excluir refeição ${meal.name}`}
          >
            <Trash size={16} />
            Excluir
          </button>
        </div>
      </td>
    </tr>
  );
}
