import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

// material-ui
import Box from '@mui/material/Box';
// import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';

// project import
import NavItem from './NavItem';
import NavCollapse from './NavCollapse';

import { useGetMenuMaster } from '@api/menu';

export default function NavGroup({
  item,
  setSelectedItems,
  selectedItems,
  setSelectedLevel,
  selectedLevel
}) {
  const { pathname } = useLocation();

  const { menuMaster } = useGetMenuMaster();
  const drawerOpen = menuMaster.isDashboardDrawerOpened;

  const [anchorEl, setAnchorEl] = useState(null);
  const [currentItem, setCurrentItem] = useState(item);

  const openMini = Boolean(anchorEl);

  useEffect(() => {
    setCurrentItem(item);
  }, [item]);

  const checkOpenForParent = (child) => {
    child.forEach((ele) => {
      if (ele.children?.length) {
        checkOpenForParent(ele.children, currentItem.id);
      }
    });
  };

  const checkSelectedOnload = (data) => {
    const childrens = data.children ? data.children : [];
    childrens.forEach((itemCheck) => {
      if (itemCheck?.children?.length) {
        checkOpenForParent(itemCheck.children, currentItem.id);
      }
    });
  };

  useEffect(() => {
    checkSelectedOnload(currentItem);
    if (openMini) setAnchorEl(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, currentItem]);

  const navCollapse = item.children?.map((menuItem, index) => {
    switch (menuItem.type) {
      case 'collapse':
        return (
          <NavCollapse
            key={menuItem.id}
            menu={menuItem}
            setSelectedItems={setSelectedItems}
            setSelectedLevel={setSelectedLevel}
            selectedLevel={selectedLevel}
            selectedItems={selectedItems}
            level={1}
            parentId={currentItem.id}
          />
        );
      case 'item':
        return <NavItem key={menuItem.id} item={menuItem} level={1} />;
      default:
        return (
          <Typography key={index} variant="h6" color="error" align="center">
            Fix - Group Collapse or Items
          </Typography>
        );
    }
  });

  return (
        <List
          subheader={
            <>
              {item.title ? (
                drawerOpen && (
                  <Box sx={{ pl: 3, mb: 1.5 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      {item.title}
                    </Typography>
                    {item.caption && (
                      <Typography variant="caption" color="secondary">
                        {item.caption}
                      </Typography>
                    )}
                  </Box>
                )
              ) : (
                null //<Divider sx={{ my: 0.5 }} />
              )}
            </>
          }
          sx={{ mt: drawerOpen && item.title ? 1.5 : 0, py: 0, zIndex: 0 }}
        >
          {navCollapse}
        </List>
  );
}
