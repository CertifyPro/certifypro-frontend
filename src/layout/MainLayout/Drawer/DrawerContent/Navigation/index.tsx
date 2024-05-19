import { useState } from 'react';

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';

import FileTextOutlined from '@ant-design/icons/FileTextOutlined';

// project import
import NavItem from './NavItem';
import NavGroup from './NavGroup';

import { useGetMenuMaster } from '@api/menu';

// data definition
const menuItems = {
  items: [{
  id: 'group-certifications',
  type: 'group',
  children: [
    {
      id: 'certification',
      title: 'Certifications',
      type: 'collapse',
      icon: FileTextOutlined,
      breadcrumbs: false,
      children: [
        {
          id: 'certification-list',
          title: "My Certifications",
          type: 'item',
          url: '/certifications/list',
          breadcrumbs: false
        },
        {
          id: 'certification-create',
          title: "New Certification",
          type: 'item',
          url: '/certifications/new',
          breadcrumbs: false
        },
      ]
    },
  ]
}]};

// ==============================|| DRAWER CONTENT - NAVIGATION ||============================== //

export default function Navigation() {
  const { menuMaster } = useGetMenuMaster();
  const drawerOpen = menuMaster.isDashboardDrawerOpened;

  const [selectedItems, setSelectedItems] = useState('');
  const [selectedLevel, setSelectedLevel] = useState(0);

  const navGroups = menuItems.items.map((item, index) => {
    switch (item.type) {
      case 'group':
        if (item.url && item.id) {
          return (
            <List key={item.id}>
              {index !== 0 && <Divider sx={{ my: 0.5 }} />}
              <NavItem item={item} level={1} isParents />
            </List>
          );
        }

        return (
          <NavGroup
            key={item.id}
            setSelectedItems={setSelectedItems}
            setSelectedLevel={setSelectedLevel}
            selectedLevel={selectedLevel}
            selectedItems={selectedItems}
            item={item}
          />
        );
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Fix - Navigation Group
          </Typography>
        );
    }
  });

  return (
    <Box
      sx={{
        pt: drawerOpen ? 2 : 0,
        ...({ '& > ul:first-of-type': { mt: 0 } }),
        display: 'block'
      }}
    >
      {navGroups}
    </Box>
  );
}
