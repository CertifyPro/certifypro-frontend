// material-ui
import { useTheme } from '@mui/material/styles';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import FormHelperText from '@mui/material/FormHelperText';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

// project imports
import IconButton from 'components/@extended/IconButton';
import { deleteCertificate } from 'utils/db';
import Certificate, {
  InspectionArticleField,
  InspectionArticleFieldValue,
  InspectionCheckType,
  InspectionKind,
  InspectionType,
} from './Certificate';

// assets
import DeleteFilled from '@ant-design/icons/DeleteFilled';

import { useFormik, Form, FormikProvider } from 'formik';
import { ThemeMode } from '@config';
import { useState } from 'react';

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
  const theme = useTheme();
  const [expanded, setExpanded] = useState<string | false>(false);
  const [subExpanded, setSubExpanded] = useState<string | false>(false);

  const formik = useFormik({
    initialValues: certificate!,
    enableReinitialize: true,
    onSubmit: async (values, { setSubmitting }) => {
      console.log('SUBMIT THAT SHIT', values);
      closeModal();
    },
  });
  const { errors, touched, handleSubmit, isSubmitting, getFieldProps, setFieldValue } = formik;

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

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
            certificate._inspectionReport.inspectionCategories.map((inspectionCategory, inspectionCategoryIndex) => {
              return (
                <Accordion
                  expanded={expanded === inspectionCategory.name}
                  onChange={handleChange(inspectionCategory.name)}
                  key={inspectionCategory.name}
                >
                  <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                    <Typography variant="h6">{inspectionCategory.name}</Typography>
                  </AccordionSummary>
                  {expanded === inspectionCategory.name && (
                    <AccordionDetails>
                      {inspectionCategory.inspectionArticles.map((inspectionArticle, inspectionArticleIndex) => {
                        return inspectionArticle.fields.map((field, fieldIndex) => {
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
                              direction={'column'}
                              alignItems={'flex-start'}
                            >
                              <Stack direction="row" spacing={2} margin={2} alignItems="center">
                                {inspectionArticle.fields.length === 1 && (
                                  <Typography
                                    variant="h6"
                                    sx={{ visibility: inspectionArticle.fields.length === 1 ? 'visible' : 'hidden' }}
                                  >
                                    {inspectionArticle.articleNumber}
                                  </Typography>
                                )}
                                <Typography variant="h6">{field.description}</Typography>
                              </Stack>
                              <Stack direction={'row'}>
                                <Stack marginBottom={0} marginLeft={2}>
                                  <FormHelperText>Τύπος Ελέγχου</FormHelperText>
                                  <FormControl sx={{ minWidth: 110 }}>
                                    <Select
                                      labelId="demo-simple-select-autowidth-label"
                                      {...getFieldProps(
                                        `_inspectionReport.inspectionCategories[${inspectionCategoryIndex}].inspectionArticles[${inspectionArticleIndex}].fields[${fieldIndex}].inspectionType`,
                                      )}
                                      value={
                                        (
                                          formik.values._inspectionReport.inspectionCategories[inspectionCategoryIndex]
                                            .inspectionArticles[inspectionArticleIndex].fields[
                                            fieldIndex
                                          ] as InspectionArticleField
                                        ).inspectionType
                                      }
                                      onChange={(event) =>
                                        setFieldValue(
                                          `_inspectionReport.inspectionCategories[${inspectionCategoryIndex}].inspectionArticles[${inspectionArticleIndex}].fields[${fieldIndex}].inspectionType`,
                                          event.target.value,
                                        )
                                      }
                                      autoWidth
                                    >
                                      {Object.keys(InspectionType).map((inspectionTypeValue) => (
                                        <MenuItem
                                          key={inspectionTypeValue}
                                          value={InspectionType[inspectionTypeValue as keyof typeof InspectionType]}
                                        >
                                          {InspectionType[inspectionTypeValue as keyof typeof InspectionType]}
                                        </MenuItem>
                                      ))}
                                    </Select>
                                  </FormControl>
                                </Stack>
                                <Stack marginBottom={2} marginLeft={2}>
                                  <FormHelperText>Είδος Ελέγχου</FormHelperText>
                                  <FormControl sx={{ minWidth: 85 }}>
                                    <Select
                                      labelId="demo-simple-select-autowidth-label"
                                      {...getFieldProps(
                                        `_inspectionReport.inspectionCategories[${inspectionCategoryIndex}].inspectionArticles[${inspectionArticleIndex}].fields[${fieldIndex}].inspectionKind`,
                                      )}
                                      value={
                                        (
                                          formik.values._inspectionReport.inspectionCategories[inspectionCategoryIndex]
                                            .inspectionArticles[inspectionArticleIndex].fields[
                                            fieldIndex
                                          ] as InspectionArticleField
                                        ).inspectionKind
                                      }
                                      onChange={(event) =>
                                        setFieldValue(
                                          `_inspectionReport.inspectionCategories[${inspectionCategoryIndex}].inspectionArticles[${inspectionArticleIndex}].fields[${fieldIndex}].inspectionKind`,
                                          event.target.value,
                                        )
                                      }
                                      autoWidth
                                    >
                                      {Object.keys(InspectionKind).map((inspectionKindValue) => (
                                        <MenuItem
                                          key={inspectionKindValue}
                                          value={InspectionKind[inspectionKindValue as keyof typeof InspectionKind]}
                                        >
                                          {InspectionKind[inspectionKindValue as keyof typeof InspectionKind]}
                                        </MenuItem>
                                      ))}
                                    </Select>
                                  </FormControl>
                                </Stack>
                              </Stack>
                            </Stack>
                          );
                        });
                      })}
                    </AccordionDetails>
                  )}
                </Accordion>
              );
            })}
        </DialogContent>
        <Divider />
        <DialogActions
          sx={{
            p: 2.5,
            position: 'sticky',
            bottom: 0,
            backgroundColor: theme.palette.mode === ThemeMode.DARK ? '#1e1e1e' : '#ffffff',
          }}
        >
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
