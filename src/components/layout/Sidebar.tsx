//import { useState } from 'react';
import { NAV_ITEMS } from '@/constants/navigation';
import { SidebarBrand } from './SidebarBrand';
import { SidebarItem } from './SidebarItem';

import { SignOut } from '@phosphor-icons/react';
import { useAuth } from '@/context/AuthContext';

interface SidebarProps {
  drawerId: string;
}

export function Sidebar({ drawerId }: SidebarProps) {
  // const [activeId, setActiveId] = useState<string>('home');
  const expanded = true;
  const { logout } = useAuth();

  return (
    <aside className="drawer-side z-50">
      <label
        htmlFor={drawerId}
        aria-label="Fechar menu"
        className="drawer-overlay"
      />
      <div
        className={`bg-black text-white flex flex-col min-h-full border-r border-base-200 shadow-sm transition-all duration-300 ${expanded ? 'w-64 items-start' : 'w-20 items-center'
          }`}
      >
        <SidebarBrand expanded={expanded} />
        <ul className="menu w-full grow pt-4 gap-2">

          {NAV_ITEMS.map(item => (
            <span className="hover:bg-gray-500 hover:text-red-600">
              <SidebarItem
                key={item.id}
                label={item.label}
                Icon={item.Icon}
                to={item.to}
                expanded={expanded}
              />
            </span>
          ))}

          <button
            type="button"
            onClick={logout}
            className="text-red-600 gap-2 w-full flex items-center justify-start px-4 py-3 transition-all duration-300 cursor-pointer hover:bg-gray-500 hover:text-white"
            aria-label="Sair"
          >
            <SignOut size={20} />
            Sair
          </button>

        </ul>
      </div>
    </aside>
  );
}
