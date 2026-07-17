import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { FormField } from '../forms/FormField';
import { api } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import type { User } from '@/types/user';

export function ProfileSettingsForm({ user }: { user?: User | null }) {
  const { refreshUser } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    githubLogin: '',
    birthDate: '',
    email: '',
    weight: '',
    height: '',
    calorieGoal: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setFormData({
      name: user?.name ?? '',
      githubLogin: user?.githubLogin ?? '',
      birthDate: user?.birthDate ? String(user.birthDate).slice(0, 10) : '',
      email: user?.email ?? '',
      weight: user?.weight != null ? String(user.weight) : '',
      height: user?.height != null ? String(user.height) : '',
      calorieGoal: user?.calorieGoal != null ? String(user.calorieGoal) : '',
    });
    setError(null);
    setSuccess(null);
  }, [user]);

  const imc = useMemo(() => {
    const weight = Number(formData.weight);
    const height = Number(formData.height);

    if (!Number.isFinite(weight) || !Number.isFinite(height) || height <= 0) {
      return null;
    }

    const heightInMeters = height / 100;
    return weight / (heightInMeters * heightInMeters);
  }, [formData.height, formData.weight]);

  const idealCalorieGoal = useMemo(() => {
    if (imc == null) {
      return null;
    }

    const baseGoal = imc < 18.5
      ? 1800
      : imc < 25
        ? 2000
        : imc < 30
          ? 1700
          : 1500;

    const weight = Number(formData.weight);
    return Number.isFinite(weight) ? Math.round(baseGoal + (weight - 70) * 5) : baseGoal;
  }, [formData.weight, imc]);

  const imcLabel = useMemo(() => {
    if (imc == null) {
      return 'Preencha peso e altura para calcular o IMC.';
    }

    if (imc < 18.5) return 'Abaixo do peso';
    if (imc < 25) return 'Peso normal';
    if (imc < 30) return 'Sobrepeso';
    return 'Obesidade';
  }, [imc]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    const parsedWeight = Number(formData.weight);
    const parsedHeight = Number(formData.height);
    const parsedCalorieGoal = Number(formData.calorieGoal);

    if (
      !Number.isFinite(parsedWeight) ||
      !Number.isFinite(parsedHeight) ||
      !Number.isFinite(parsedCalorieGoal)
    ) {
      setError('Preencha todos os campos com valores válidos.');
      return;
    }

    if (parsedWeight <= 0 || parsedHeight <= 0 || parsedCalorieGoal < 0) {
      setError('Peso e altura precisam ser maiores que zero e a meta não pode ser negativa.');
      return;
    }

    try {
      setSubmitting(true);
      await api.put('/auth/profile', {
        name: formData.name,
        githubLogin: formData.githubLogin,
        birthDate: formData.birthDate || null,
        email: formData.email || null,
        weight: parsedWeight,
        height: parsedHeight,
        calorieGoal: parsedCalorieGoal,
      });
      await refreshUser();
      setSuccess('Dados salvos com sucesso.');
    } catch {
      setError('Erro ao salvar dados. Tente novamente.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200">
      <h2 className="text-lg font-bold mb-4">Dados do Usuário</h2>

      {error && <div className="alert alert-error mb-4">{error}</div>}
      {success && <div className="alert alert-success mb-4">{success}</div>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          <FormField label="Nome GitHub" htmlFor="name">
            <input
              id="name"
              type="text"
              className="input input-bordered w-full"
              value={formData.name}
              onChange={(event) => setFormData((current) => ({ ...current, name: event.target.value }))}
            />
          </FormField>

          <FormField label="Usuário GitHub" htmlFor="githubLogin">
            <input
              id="githubLogin"
              type="text"
              className="input input-bordered w-full"
              value={formData.githubLogin}
              onChange={(event) => setFormData((current) => ({ ...current, githubLogin: event.target.value }))}
            />
          </FormField>

          <FormField label="Data Nascimento" htmlFor="birthDate">
            <input
              id="birthDate"
              type="date"
              className="input input-bordered w-full"
              value={formData.birthDate}
              onChange={(event) => setFormData((current) => ({ ...current, birthDate: event.target.value }))}
            />
          </FormField>
          </div>
          
          <h2 className="text-lg font-bold mt-12 mb-4">Dados Complementares</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          <FormField label="Peso (kg)" htmlFor="weight">
            <input
              id="weight"
              type="number"
              className="input input-bordered w-full"
              value={formData.weight}
              onChange={(event) => setFormData((current) => ({ ...current, weight: event.target.value }))}
            />
          </FormField>

          <FormField label="Altura (cm)" htmlFor="height">
            <input
              id="height"
              type="number"
              className="input input-bordered w-full"
              value={formData.height}
              onChange={(event) => setFormData((current) => ({ ...current, height: event.target.value }))}
            />
          </FormField>

          <FormField label="Meta Calórica (kcal)" htmlFor="goal">
            <input
              id="goal"
              type="number"
              className="input input-bordered w-full"
              value={formData.calorieGoal}
              onChange={(event) => setFormData((current) => ({ ...current, calorieGoal: event.target.value }))}
            />
          </FormField>
        </div>

        <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
          <p className="text-sm font-semibold text-blue-800">Seu IMC</p>
          {imc == null ? (
            <p className="mt-1 text-sm text-blue-700">Preencha peso e altura para calcular.</p>
          ) : (
            <>
              <p className="mt-2 text-3xl font-bold text-blue-900">{imc.toFixed(1)}</p>
              <p className="text-sm text-blue-700">{imcLabel}</p>
            </>
          )}
        </div>

        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? 'Salvando...' : 'Salvar Alterações'}
        </button>
      </form>
    </div>
  );
}