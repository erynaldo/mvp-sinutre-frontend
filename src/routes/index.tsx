import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

import { AppLayout } from '@/layouts/AppLayout';
import { LoginPage } from '@/pages/LoginPage';
import { DashboardPage } from '@/pages/DashboardPage';
import { ProtectedRoute } from './ProtectRoute';
import { DietFoodPage } from '@/pages/DietFood';
import { IMCPage } from '../pages/IMCPage';
import { ProfilePage } from '@/pages/ProfilePage';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/login"
          element={<LoginPage />}
        />

        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route
            path="/foods"
            element={<DietFoodPage />}
          />
          <Route
            path="/settings"
            element={<ProfilePage />}
          />
        </Route>

        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >

          <Route
            path="/imc"
            element={<IMCPage />}
          />
        </Route>

        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route
            path="/"
            element={
              <DashboardPage drawerId="main-drawer" />
            }
          />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}