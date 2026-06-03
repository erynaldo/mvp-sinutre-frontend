import { MEAL_CATEGORIES } from '@/constants/mealCategories';
import { FormField } from '../forms/FormField';

export function MealMetadataForm() {
  return (
    <section className="grid lg:grid-cols-3 gap-4 mb-8">
      <FormField label="Descrição" htmlFor="meal-description" className="lg:col-span-1">
        <input
          id="meal-description"
          type="text"
          placeholder="Ex: almoço pós treino"
          className="input input-bordered w-full"
        />
      </FormField>

      <FormField label="Categoria" htmlFor="meal-category">
        <select
          id="meal-category"
          className="select select-bordered w-full"
          defaultValue=""
        >
          <option disabled value="">
            Selecione categoria
          </option>
          {MEAL_CATEGORIES.map(category => (
            <option key={category.id} value={category.id}>
              {category.label}
            </option>
          ))}
        </select>
      </FormField>

      <FormField label="Data e horário" htmlFor="meal-datetime">
        <input
          id="meal-datetime"
          type="datetime-local"
          className="input input-bordered w-full"
        />
      </FormField>
    </section>
  );
}
