// material-ui
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Tooltip from '@mui/material/Tooltip';

// project imports
import IconButton from 'components/@extended/IconButton';
import { deleteCertificate } from 'utils/db';
import Certificate from './Certificate';

// assets
import DeleteFilled from '@ant-design/icons/DeleteFilled';

export type CertificateFormEditProps = {
  certificate?: Certificate;
  closeModal: () => void;
  fetchCertificates: () => void;
};

export const CertificateFormEdit: React.FC<CertificateFormEditProps> = ({
  certificate,
  closeModal,
  fetchCertificates,
}) => {
  return (
    <>
      <DialogTitle>{'Επεξεργασία Πιστοποιητικού'}</DialogTitle>
      <Divider />
      <DialogContent sx={{ p: 2.5 }}></DialogContent>
      <Divider />
      <DialogActions sx={{ p: 2.5 }}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            {certificate && (
              <Tooltip enterDelay={900} title="ΔΙΑΓΡΑΦΗ" placement="top">
                <IconButton
                  onClick={() => {
                    deleteCertificate(certificate.id!).then(() => {
                      fetchCertificates();
                      closeModal();
                    });
                  }}
                  size="large"
                  color="error"
                >
                  <DeleteFilled />
                </IconButton>
              </Tooltip>
            )}
          </Grid>
          <Grid item>
            <Stack direction="row" spacing={2} alignItems="center">
              <Button color="error" onClick={closeModal}>
                {'ΑΚΥΡΩΣΗ'}
              </Button>
              <Button type="submit" variant="contained" onClick={closeModal}>
                {'ΑΠΟΘΗΚΕΥΣΗ'}
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </DialogActions>
    </>
  );
};
