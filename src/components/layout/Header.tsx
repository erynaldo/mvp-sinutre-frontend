import { SignOut, List } from '@phosphor-icons/react';
import { useAuth } from '@/context/AuthContext';

interface HeaderProps {
  drawerId: string;
  userName: string;
  avatarUrl: string;
}

export function Header({ drawerId, userName, avatarUrl }: HeaderProps) {
  const { logout } = useAuth();
  return (
    <header className="flex items-center gap-3">
      <div className="flex-none lg:hidden">
        <label
          htmlFor={drawerId}
          className="btn btn-square btn-ghost drawer-button"
          aria-label="Abrir menu"
        >
          <List size={24} />
        </label>
      </div>

      <div className="avatar shrink-0">
        <div className="w-10 lg:w-16 rounded-full border border-base-300">
          <img src={avatarUrl} alt={`Avatar de ${userName}`} />
        </div>
      </div>

      <h1 className="text-base lg:text-4xl font-bold tracking-tight">
        Bem vindo, {userName}!
      </h1>
{/* xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx */}
      <button
        type="button"
        onClick={logout}
        className="btn btn-ghost btn-sm ml-auto gap-2"
        aria-label="Sair"
      >
        <SignOut size={20} />
        Sair
      </button>
{/* xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx */}
    </header>
  );
}
