import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

// mui
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';

// project import
import Drawer from './Drawer';
import Header from './Header';
import Footer from './Footer';
import Loader from '@components/Loader';
import Breadcrumbs from '@components/@extended/Breadcrumbs';

import useConfig from '@hooks/useConfig';
import { handlerDrawerOpen, useGetMenuMaster } from '@api/menu';

// ==============================|| MAIN LAYOUT ||============================== //

export default function MainLayout() {
  const { menuMasterLoading } = useGetMenuMaster();
  const downXL = useMediaQuery((theme) => theme.breakpoints.down('xl'));

  const { container, miniDrawer } = useConfig();

  // set media wise responsive drawer
  useEffect(() => {
    if (!miniDrawer) {
      handlerDrawerOpen(!downXL);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [downXL]);

  if (menuMasterLoading) return <Loader />;

  return (
      <Box sx={{ display: 'flex', width: '100%' }}>
        <Header />
        <Drawer />
        <Box component="main" sx={{ width: 'calc(100% - 260px)', flexGrow: 1, p: { xs: 2, sm: 3 } }}>
        <Toolbar sx={{ mt: 'inherit' }} />
         <Container
            maxWidth={container ? 'xl' : false}
            sx={{
              ...(container && { px: { xs: 0, sm: 2 } }),
              position: 'relative',
              minHeight: 'calc(100vh - 110px)',
              display: 'flex',
              flexDirection: 'column'
            }}
          > 
            <Breadcrumbs />
            <Outlet />
            <Footer />
          </Container>
        </Box>
      </Box>
  );
}
