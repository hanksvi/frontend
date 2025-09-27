import { createBrowserRouter, RouterProvider } from 'react-router-dom';




import LoginPage from '../pages/LoginPage';
import GuidesPage from '../pages/GuidesPage';
import GuideDetailPage from '../pages/GuideDetailPage';
import UserReservationsPage from '../pages/UserReservationsPage';
import ReservationDetailPage from '../pages/ReservationDetailPage';
import { AppLayout } from './ui/AppLayout';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/',
    element: <AppLayout><GuidesPage /></AppLayout>,
  },
  {
    path: '/guides',
    element: <AppLayout><GuidesPage /></AppLayout>,
  },
  {
    path: '/guides/:id',
    element: <AppLayout><GuideDetailPage /></AppLayout>,
  },
  {
    path: '/reservations',
    element: <AppLayout><UserReservationsPage /></AppLayout>,
  },
  {
    path: '/reservations/:id',
    element: <AppLayout><ReservationDetailPage /></AppLayout>,
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
