// material-ui
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export default function Footer() {
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ p: '24px 16px 0px', mt: 'auto' }}>
      <Typography variant="caption">&copy; 2024 CertifyPro</Typography>
      <Stack spacing={1.5} direction="row" justifyContent="space-between" alignItems="center"></Stack>
    </Stack>
  );
}
