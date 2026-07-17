// import React, { useState } from 'react';

// import { Plus } from '@phosphor-icons/react';

// import { SimpleHeader } from '@/components/layout/SimpleHeader';
// import { AddFoodModal } from '@/components/modal/AddFoodModal';


// const MODAL_ID = 'create-food-modal';

// export const IMCPage = () => {
//   const [peso, setPeso] = useState('');
//   const [altura, setAltura] = useState('');
//   const [resultado, setResultado] = useState<string | null>(null);

//   const calcularIMC = () => {
//     const h = parseFloat(altura);
//     const p = parseFloat(peso);
//     const imc = p / ((h / 100) * (h / 100));
//     // const imc = p / ((h / 100) ** 2);

//     if (imc < 18.5) setResultado(`IMC: ${imc.toFixed(2)} - Abaixo do peso`);
//     else if (imc < 25) setResultado(`IMC: ${imc.toFixed(2)} - Peso normal`);
//     else if (imc < 30) setResultado(`IMC: ${imc.toFixed(2)} - Sobrepeso`);
//     else setResultado(`IMC: ${imc.toFixed(2)} - Obesidade`);
//   };

//   return (
//     <div className="w-full max-w-300 mx-auto p-4">
//       <SimpleHeader
//         title="Calculadora de IMC"
//         subtitle="Calcule seu Índice de Massa Corporal"
//       />

//       <input placeholder="Peso (kg)" onChange={(e) => setPeso(e.target.value)} />
//       <input placeholder="Altura (cm)" onChange={(e) => setAltura(e.target.value)} />
//       <button onClick={calcularIMC}>Calcular</button>
//       {resultado && <p>{resultado}</p>}

//       <AddFoodModal
//         modalId={MODAL_ID} onCreated={function (): Promise<void> | void {
//           throw new Error('Function not implemented.');
//         }}
//       />
//     </div>
//   );
// };


import { useState } from 'react';
import { SimpleHeader } from '@/components/layout/SimpleHeader';

// export const IMCPage = () => {
export function IMCPage() {
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [resultado, setResultado] = useState<{ value: string; label: string } | null>(null);

  const calcularIMC = () => {
    const h = parseFloat(altura) / 100;
    const p = parseFloat(peso);
    if (!h || !p) return;

    const imc = p / (h * h);

    let label = "";
    if (imc < 18.5) label = "Abaixo do peso";
    else if (imc < 25) label = "Peso normal";
    else if (imc < 30) label = "Sobrepeso";
    else label = "Obesidade";

    setResultado({ value: imc.toFixed(1), label });
  };

  return (
    <div className="flex flex-col gap-6 p-6 max-w-2xl mx-auto">

      <SimpleHeader title="Calculadora de IMC" subtitle="IMC - Índice de Massa Corporal" />

      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">Peso (kg)</label>
            <input
              type="number"
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              placeholder="Ex: 75"
              onChange={(e) => setPeso(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">Altura (cm)</label>
            <input
              type="number"
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              placeholder="Ex: 175"
              onChange={(e) => setAltura(e.target.value)}
            />
          </div>
        </div>

        <button
          onClick={calcularIMC}
          className="w-full mt-6 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors cursor-pointer"
        >
          Calcular
        </button>

        {resultado && (
          <div className="mt-8 p-6 bg-blue-50 rounded-xl text-center">
            <p className="text-lg font-medium">Seu IMC é:</p>
            <h2 className="text-4xl font-bold text-blue-800 my-2">{resultado.value}</h2>
            <p className="text-lg font-semibold text-green-800">{resultado.label}</p>
          </div>
        )}
      </div>
    </div>
  );
};