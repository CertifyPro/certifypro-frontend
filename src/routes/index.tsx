import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

// project import
import MainLayout from '@layout/MainLayout';
import Loadable from '@components/Loadable';

const CertificationsCreatePage = Loadable(lazy(() => import('@pages/certifications/CertificationsCreatePage')));

// ==============================|| ROUTING RENDER ||============================== //

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <MainLayout />,
          children: [        
            {
              path: 'certifications',
                  children: [
                    {
                      path: 'list',
                      element: <CertificationsCreatePage />
                    },
                    {
                      path: 'new',
                      element: <CertificationsCreatePage />
                    },
                    {
                      path: 'details/:id',
                      element: <CertificationsCreatePage />
                    },
                    {
                      path: 'edit/:id',
                      element: <CertificationsCreatePage />
                    },
                  ]
            },
          ]
    }
  ],
  { basename: import.meta.env.VITE_APP_BASE_NAME }
);

export default router;
