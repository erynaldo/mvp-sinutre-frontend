import { useAuth } from '@/context/AuthContext';
import { SimpleHeader } from '@/components/layout/SimpleHeader';
import { ProfileSettingsForm } from '@/components/forms/ProfileSettingsForm';

export const ProfilePage = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">Carregando perfil...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-6">
        <SimpleHeader
          title="Informações do Usuário e Dados Complementares"
          subtitle="Configure a Meta Calórica"
        />
        <div className="mt-6">
          <ProfileSettingsForm user={user} />
        </div>
      </div>
    </div>
  );
};