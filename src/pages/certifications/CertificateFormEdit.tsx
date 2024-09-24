// material-ui
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

// project imports
import IconButton from 'components/@extended/IconButton';
import { deleteCertificate } from 'utils/db';
import Certificate from './Certificate';

// assets
import DeleteFilled from '@ant-design/icons/DeleteFilled';

import { useFormik, Form, FormikProvider } from 'formik';

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
  const formik = useFormik({
    initialValues: certificate!,
    enableReinitialize: true,
    onSubmit: async (values, { setSubmitting }) => {
      console.log('SUBMIT THAT SHIT', values);
      closeModal();
    },
  });
  const { errors, touched, handleSubmit, isSubmitting, getFieldProps, setFieldValue } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <DialogTitle>{'Επεξεργασία Πιστοποιητικού'}</DialogTitle>
        <Divider />
        <Stack spacing={2} marginTop={2} justifyItems={'center'} alignItems="center">
          <Typography variant="h6">ΕΚΘΕΣΗ ΕΠΙΘΕΩΡΗΣΗΣ</Typography>
        </Stack>
        <DialogContent sx={{ p: 2.5 }}>
          {certificate &&
            certificate._inspectionReport.inspectionCategories.map((inspectionCategory) => {
              return (
                <Accordion key={inspectionCategory.name} defaultExpanded>
                  <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                    <Typography variant="h6">{inspectionCategory.name}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    {inspectionCategory.inspectionArticles.map((inspectionArticle) => {
                      return inspectionArticle.fields.map((field) => {
                        return typeof field === 'string' ? (
                          <Stack
                            key={`${inspectionArticle.articleNumber}-${field}`}
                            direction="row"
                            spacing={2}
                            alignItems="center"
                          >
                            <Typography variant="h6">{inspectionArticle.articleNumber}</Typography>
                            <Typography variant="h6">{field}</Typography>
                          </Stack>
                        ) : (
                          <Stack
                            key={`${inspectionArticle.articleNumber}-${field.description}`}
                            direction="row"
                            spacing={2}
                            margin={2}
                            alignItems="center"
                          >
                            <Typography
                              variant="h6"
                              sx={{ visibility: inspectionArticle.fields.length === 1 ? 'visible' : 'hidden' }}
                            >
                              {inspectionArticle.articleNumber}
                            </Typography>
                            <Typography variant="h6">{field.description}</Typography>
                          </Stack>
                        );
                      });
                    })}
                  </AccordionDetails>
                </Accordion>
              );
            })}
        </DialogContent>
        <Divider />
        <DialogActions sx={{ p: 2.5, position: 'sticky', bottom: 0, backgroundColor: '#1e1e1e' }}>
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
                <Button type="submit" variant="contained">
                  {'ΑΠΟΘΗΚΕΥΣΗ'}
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </DialogActions>
      </Form>
    </FormikProvider>
  );
};
