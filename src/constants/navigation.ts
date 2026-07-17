import type { Icon } from '@phosphor-icons/react';
import {
  AppleLogo,
  ChartLineUp,
  Gear,
  House,
  CalculatorIcon,
  // PersonIcon,
  // SignOutIcon,
} from '@phosphor-icons/react';

export interface NavItem {
  id: string;
  label: string;
  Icon: Icon;
  to: string;
}

export const NAV_ITEMS: readonly NavItem[] = [
  { id: 'home', label: 'Início', Icon: House, to: "/" },
  { id: 'diet', label: 'Dieta', Icon: AppleLogo, to: "/foods" },
  // { id: 'imc', label: 'IMC', Icon: PersonIcon, to: "/imc" },
  { id: 'imc', label: 'Calculadora IMC', Icon: CalculatorIcon, to: "/imc" },
  { id: 'progress', label: 'Progresso', Icon: ChartLineUp, to: "/stats" },
  { id: 'settings', label: 'Configurações', Icon: Gear, to:"/settings" },
] as const;
