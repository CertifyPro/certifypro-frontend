import { lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

// project import
import MainLayout from '@layout/MainLayout';
import Loadable from '@components/Loadable';

const CertificationsPage = Loadable(lazy(() => import('@pages/certifications/CertificationsPage')));
const CertificationsCreatePage = Loadable(lazy(() => import('@pages/certifications/CertificationsCreatePage')));
const SettingsPage = Loadable(lazy(() => import('@pages/settings/SettingsPage')));

// ==============================|| ROUTING RENDER ||============================== //

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Navigate to="/certifications/all" replace />,
    },
    {
      path: '/',
      element: <MainLayout />,
      children: [
        {
          path: 'certifications',
          children: [
            {
              path: 'all',
              element: <CertificationsPage />,
            },
            {
              path: 'new',
              element: <CertificationsCreatePage />,
            },
            {
              path: 'details/:id',
              element: <CertificationsCreatePage />,
            },
            {
              path: 'edit/:id',
              element: <CertificationsCreatePage />,
            },
          ],
        },
        {
          path: 'settings',
          element: <SettingsPage />,
        },
      ],
    },
  ],
  { basename: import.meta.env.VITE_APP_BASE_NAME },
);

export default router;
