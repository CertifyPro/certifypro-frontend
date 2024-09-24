// material-ui
import Modal from '@mui/material/Modal';

// project-imports
import MainCard from 'components/MainCard';
import Certificate from './Certificate';
import { CertificateFormEdit } from './CertificateFormEdit';
import Box from '@mui/material/Box';

// ==============================|| CERTIFICATE ADD / EDIT ||============================== //

export type CertificateModalProps = {
  open: boolean;
  modalToggler: (toggle: boolean) => void;
  fetchCertificates: () => void;
  certificate?: Certificate;
};

export const CertificateModal: React.FC<CertificateModalProps> = ({
  open,
  modalToggler,
  fetchCertificates,
  certificate,
}) => {
  const closeModal = () => modalToggler(false);

  return (
    <>
      {open && (
        <Modal
          open={open}
          onClose={closeModal}
          aria-labelledby="modal-customer-add-label"
          aria-describedby="modal-customer-add-description"
          sx={{
            '& .MuiPaper-root:focus': {
              outline: 'none',
            },
          }}
        >
          <MainCard
            sx={{
              width: `calc(100% - 48px)`,
              minWidth: 340,
              maxWidth: 880,
              height: 'auto',
              maxHeight: 'calc(100vh - 48px)',
            }}
            modal
            content={false}
          >
            <Box sx={{ overflowX: 'auto', maxHeight: `calc(100vh - 48px)` }}>
              <CertificateFormEdit
                certificate={certificate}
                fetchCertificates={fetchCertificates}
                closeModal={closeModal}
              />
            </Box>
          </MainCard>
        </Modal>
      )}
    </>
  );
};
