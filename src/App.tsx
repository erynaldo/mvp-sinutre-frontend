import { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { DashboardPage } from '@/pages/DashboardPage';
import { LoginPage } from '@/pages/LoginPage';

const DRAWER_ID = 'main-drawer';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (!isAuthenticated) {
    return <LoginPage onLoginWithGithub={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="drawer lg:drawer-open bg-base-200 text-base-content min-h-screen">
      <input id={DRAWER_ID} type="checkbox" className="drawer-toggle" />

      <div className="drawer-content flex flex-col items-center p-4 lg:p-8 w-full">
        <DashboardPage drawerId={DRAWER_ID} />
      </div>

      <Sidebar drawerId={DRAWER_ID} />
    </div>
  );
}
