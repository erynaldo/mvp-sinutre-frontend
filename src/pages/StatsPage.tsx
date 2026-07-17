import { SimpleHeader } from '@/components/layout/SimpleHeader';

export const StatsPage = ({ user, averageCalories }: { user: any, averageCalories: number }) => {
  // Cálculo do IMC (considerando altura em cm conforme seu formulário anterior)
  const heightM = user.height / 100;
  const imc = user.weight / (heightM * heightM);
  
  const getImcLabel = (value: number) => {
    if (value < 18.5) return "Abaixo do peso";
    if (value < 25) return "Peso normal";
    return "Acima do peso";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-6 space-y-6">
        <SimpleHeader title="Estatísticas" subtitle="Seus dados de saúde" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card IMC */}
          <div className="bg-white p-6 rounded-xl border shadow-sm">
            <h3 className="font-bold text-lg mb-2">Seu IMC</h3>
            <p className="text-3xl font-bold">{imc.toFixed(1)}</p>
            <p className="text-gray-600">Faixa: {getImcLabel(imc)}</p>
          </div>

          {/* Card Média Calórica */}
          <div className="bg-white p-6 rounded-xl border shadow-sm">
            <h3 className="font-bold text-lg mb-2">Média Calórica (7 dias)</h3>
            <p className="text-3xl font-bold">{averageCalories.toFixed(0)} kcal</p>
            <p className="text-gray-600">
              {averageCalories > user.calorieGoal ? "Acima da sua meta" : "Dentro da meta"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};