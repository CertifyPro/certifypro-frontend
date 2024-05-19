// material-ui
import { useTheme } from '@mui/material/styles';

// project import
import Logo from '@components/logo';
import DrawerHeaderStyled from './DrawerHeaderStyled';

// ==============================|| DRAWER HEADER ||============================== //

export type DrawerHeaderProps = {
  open: boolean;
};

const DrawerHeader: React.FC<DrawerHeaderProps> = ({ open }) => {
  const theme = useTheme();

  return (
    <DrawerHeaderStyled
      theme={theme}
      open={open}
      sx={{
        minHeight: '60px',
        width: 'inherit',
        paddingTop: '8px',
        paddingBottom: '8px',
        paddingLeft: open ? '24px' : 0
      }}
    >
      <Logo sx={{ width: open ? 'auto' : 35, height: 35 }} isIcon={!open} />
    </DrawerHeaderStyled>
  );
}

export default DrawerHeader;
