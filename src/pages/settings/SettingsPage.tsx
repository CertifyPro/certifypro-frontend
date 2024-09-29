// mui
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// project import
import { Breadcrumbs } from '@components/@extended/Breadcrumbs';
import { APP_DEFAULT_PATH } from '@config';
import ThemeModeSettings from './ThemeModeSettings';

// assets
import HighlightOutlined from '@ant-design/icons/HighlightOutlined';

const SettingsPage: React.FC = () => {
  const breadcrumbLinks = [{ title: 'Αρχική', to: APP_DEFAULT_PATH }, { title: 'Ρυθμίσεις' }];

  return (
    <>
      <Breadcrumbs custom links={breadcrumbLinks} />
      <Stack direction="column" spacing={1.25}>
        <Stack direction="row" spacing={1.25} alignItems="center">
          <HighlightOutlined />
          <Stack>
            <Typography variant="subtitle1" color="text.primary">
              Theme Mode
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Choose light or dark mode
            </Typography>
          </Stack>
        </Stack>
        <ThemeModeSettings />
      </Stack>
    </>
  );
};

export default SettingsPage;
