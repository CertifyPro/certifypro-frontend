import { RouterProvider } from 'react-router-dom';

// project import
import router from '@routes';
import ThemeCustomization from '@theming';
// import PWABadge from './PWABadge.tsx'

import ScrollTop from '@components/ScrollTop';

function App() {
  return (
    <ThemeCustomization>
      <ScrollTop>
          <RouterProvider router={router} />
          {/* <PWABadge /> */}
      </ScrollTop>
    </ThemeCustomization>
  )
}

export default App
