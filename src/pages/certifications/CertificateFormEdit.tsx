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
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import FormHelperText from '@mui/material/FormHelperText';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';

// project imports
import IconButton from 'components/@extended/IconButton';
import { deleteCertificate, updateCertificate } from 'utils/db';
import Certificate, {
  InspectionArticleCategory,
  InspectionArticleField,
  InspectionArticleFieldValue,
} from './Certificate';

// third party
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

// assets
import DeleteFilled from '@ant-design/icons/DeleteFilled';

import { useFormik, Form, FormikProvider } from 'formik';
import { ThemeMode } from '@config';
import { useCallback, useState } from 'react';

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
    onSubmit: async (submittedCertificate) => {
      console.log('SUBMITTED: ', submittedCertificate);
      await updateCertificate(submittedCertificate.id!, submittedCertificate)
        .catch((e) => {
          console.error('Failed to update certificate to db with error: ', e);
        })
        .finally(() => {
          fetchCertificates();
          closeModal();
        });
    },
  });
  const { handleSubmit, setFieldValue } = formik;

  const handleCategoryChange = useCallback(
    (name: string) => () => {
      setExpanded((prev) => (prev === name ? false : name));
    },
    [],
  );

  const handleSubCategoryChange = useCallback(
    (name: string) => () => {
      setSubExpanded((prev) => (prev === name ? false : name));
    },
    [],
  );

  const handleEvaluationChange = useCallback(
    (inspectionCategoryIndex: number, inspectionArticleIndex: number, fieldIndex?: number) =>
      (event: React.ChangeEvent<HTMLInputElement>) => {
        const path =
          fieldIndex !== undefined
            ? `_inspectionReport.inspectionCategories[${inspectionCategoryIndex}].inspectionArticles[${inspectionArticleIndex}].fields[${fieldIndex}].value`
            : `_inspectionReport.inspectionCategories[${inspectionCategoryIndex}].inspectionArticles[${inspectionArticleIndex}].value`;
        setFieldValue(path, event.target.value);
      },
    [setFieldValue],
  );

  const handleCommentsChange = useCallback(
    (inspectionCategoryIndex: number, inspectionArticleIndex: number, fieldIndex?: number) => (comment: string) => {
      if (fieldIndex !== undefined) {
        setFieldValue(
          `_inspectionReport.inspectionCategories[${inspectionCategoryIndex}].inspectionArticles[${inspectionArticleIndex}].fields[${fieldIndex}].comments`,
          comment,
        );
      } else {
        setFieldValue(
          `_inspectionReport.inspectionCategories[${inspectionCategoryIndex}].inspectionArticles[${inspectionArticleIndex}].comments`,
          comment,
        );
      }
    },
    [setFieldValue],
  );

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
                  onChange={handleCategoryChange(inspectionCategory.name)}
                  key={inspectionCategory.name}
                >
                  <AccordionSummary style={{ paddingLeft: 8 }} aria-controls="panel1d-content" id="panel1d-header">
                    <Typography variant="h6">{inspectionCategory.name}</Typography>
                  </AccordionSummary>
                  {expanded === inspectionCategory.name && (
                    <AccordionDetails
                      style={{ paddingLeft: 8, paddingRight: 0, paddingBottom: 0, borderTop: 0, paddingTop: 0 }}
                    >
                      {inspectionCategory.inspectionArticles.map((inspectionArticle, inspectionArticleIndex) => {
                        if ((inspectionArticle as InspectionArticleCategory).articleTitle) {
                          const _inspectionArticle = inspectionArticle as InspectionArticleCategory;
                          return (
                            <Accordion
                              expanded={subExpanded === _inspectionArticle.articleTitle}
                              onChange={handleSubCategoryChange(_inspectionArticle.articleTitle)}
                              key={_inspectionArticle.articleTitle}
                            >
                              <AccordionSummary
                                style={{ paddingLeft: 8 }}
                                aria-controls="panel2d-content"
                                id="panel2d-header"
                              >
                                <Typography variant="h6">
                                  {_inspectionArticle.articleNumber} {_inspectionArticle.articleTitle}
                                </Typography>
                              </AccordionSummary>
                              {subExpanded === _inspectionArticle.articleTitle && (
                                <AccordionDetails style={{ paddingLeft: 8, paddingRight: 0, paddingBottom: 0 }}>
                                  {_inspectionArticle.fields.map((field, fieldIndex) => (
                                    <Stack
                                      key={`${field.articleNumber}-${field.description}`}
                                      direction={'column'}
                                      alignItems={'flex-start'}
                                      spacing={2}
                                      sx={{ marginBottom: '15px' }}
                                    >
                                      <Stack direction="row" spacing={2} alignItems="center">
                                        <Typography variant="h6">{field.articleNumber}</Typography>
                                        <Typography variant="h6">{field.description}</Typography>
                                      </Stack>

                                      <Grid container direction={'row'} width={'100%'} columnGap={4} rowGap={2}>
                                        <Grid
                                          item
                                          alignItems={'center'}
                                          md={'auto'}
                                          paddingLeft={0}
                                          columnGap={8}
                                          display={'flex'}
                                          flexDirection={'row'}
                                          justifyContent={'space-between'}
                                        >
                                          <Stack direction={'column'} spacing={2} maxWidth={100}>
                                            <Stack spacing={1}>
                                              <FormHelperText>Τύπος Ελέγχου</FormHelperText>
                                              <Typography
                                                sx={{
                                                  textAlign: 'center',
                                                  padding: '6px',
                                                  border: '1px solid rgba(255, 255, 255, 0.15)',
                                                }}
                                                variant="h6"
                                              >
                                                {field.inspectionType}
                                              </Typography>
                                            </Stack>
                                            <Stack spacing={1}>
                                              <FormHelperText>Είδος Ελέγχου</FormHelperText>
                                              <Typography
                                                sx={{
                                                  textAlign: 'center',
                                                  padding: '6px',
                                                  border: '1px solid rgba(255, 255, 255, 0.15)',
                                                }}
                                                variant="h6"
                                              >
                                                {field.inspectionKind}
                                              </Typography>
                                            </Stack>
                                          </Stack>

                                          <Stack>
                                            <FormHelperText>Αξιολόγηση</FormHelperText>
                                            <FormControl margin="dense">
                                              <RadioGroup
                                                row
                                                aria-label="inspectionFieldEvaluation"
                                                value={
                                                  (
                                                    formik.values._inspectionReport.inspectionCategories[
                                                      inspectionCategoryIndex
                                                    ].inspectionArticles[
                                                      inspectionArticleIndex
                                                    ] as InspectionArticleCategory
                                                  ).fields[fieldIndex].value
                                                }
                                                onChange={handleEvaluationChange(
                                                  inspectionCategoryIndex,
                                                  inspectionArticleIndex,
                                                  fieldIndex,
                                                )}
                                                name="inspectionFieldEvaluation"
                                                id="inspectionFieldEvaluation"
                                              >
                                                <FormControlLabel
                                                  value={InspectionArticleFieldValue.OK}
                                                  control={<Radio color="success" />}
                                                  label={InspectionArticleFieldValue.OK}
                                                />
                                                <FormControlLabel
                                                  value={InspectionArticleFieldValue.NOT_OK}
                                                  control={<Radio color="error" />}
                                                  label={InspectionArticleFieldValue.NOT_OK}
                                                />
                                                <FormControlLabel
                                                  value={InspectionArticleFieldValue.NA}
                                                  control={<Radio color="secondary" />}
                                                  label={InspectionArticleFieldValue.NA}
                                                />
                                              </RadioGroup>
                                            </FormControl>
                                          </Stack>
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={6} alignContent={'center'} paddingLeft={0}>
                                          {(
                                            formik.values._inspectionReport.inspectionCategories[
                                              inspectionCategoryIndex
                                            ].inspectionArticles[inspectionArticleIndex] as InspectionArticleCategory
                                          ).fields[fieldIndex].value !== InspectionArticleFieldValue.NA ? (
                                            <Stack spacing={1}>
                                              <FormHelperText>Παρατηρήσεις</FormHelperText>
                                              <ReactQuill
                                                style={{ minWidth: '300px' }}
                                                modules={{
                                                  toolbar: [['bold', 'italic', 'underline', 'strike']],
                                                }}
                                                onChange={handleCommentsChange(
                                                  inspectionCategoryIndex,
                                                  inspectionArticleIndex,
                                                  fieldIndex,
                                                )}
                                                value={
                                                  (
                                                    formik.values._inspectionReport.inspectionCategories[
                                                      inspectionCategoryIndex
                                                    ].inspectionArticles[
                                                      inspectionArticleIndex
                                                    ] as InspectionArticleCategory
                                                  ).fields[fieldIndex].comments
                                                }
                                              />
                                            </Stack>
                                          ) : (
                                            <Stack
                                              style={{ width: '300px', textAlign: 'center' }}
                                              spacing={1}
                                              flexGrow={1}
                                            ></Stack>
                                          )}
                                        </Grid>
                                      </Grid>
                                    </Stack>
                                  ))}
                                </AccordionDetails>
                              )}
                            </Accordion>
                          );
                        } else {
                          const _inspectionArticle = inspectionArticle as InspectionArticleField;
                          return (
                            <Stack
                              key={`${_inspectionArticle.articleNumber}-${_inspectionArticle.description}`}
                              direction={'column'}
                              alignItems={'flex-start'}
                              spacing={2}
                              sx={{ marginBottom: '15px' }}
                            >
                              <Stack direction="row" spacing={2} alignItems="center">
                                <Typography variant="h6">
                                  {_inspectionArticle.articleNumber} {_inspectionArticle.description}
                                </Typography>
                              </Stack>

                              <Grid container direction={'row'} width={'100%'} columnGap={4} rowGap={2}>
                                <Grid
                                  item
                                  alignItems={'center'}
                                  md={'auto'}
                                  paddingLeft={0}
                                  columnGap={8}
                                  display={'flex'}
                                  flexDirection={'row'}
                                  justifyContent={'space-between'}
                                >
                                  <Stack direction={'column'} spacing={2} maxWidth={100}>
                                    <Stack spacing={1}>
                                      <FormHelperText>Τύπος Ελέγχου</FormHelperText>
                                      <Typography
                                        sx={{
                                          textAlign: 'center',
                                          padding: '6px',
                                          border: '1px solid rgba(255, 255, 255, 0.15)',
                                        }}
                                        variant="h6"
                                      >
                                        {_inspectionArticle.inspectionType}
                                      </Typography>
                                    </Stack>
                                    <Stack spacing={1}>
                                      <FormHelperText>Είδος Ελέγχου</FormHelperText>
                                      <Typography
                                        sx={{
                                          textAlign: 'center',
                                          padding: '6px',
                                          border: '1px solid rgba(255, 255, 255, 0.15)',
                                        }}
                                        variant="h6"
                                      >
                                        {_inspectionArticle.inspectionKind}
                                      </Typography>
                                    </Stack>
                                  </Stack>

                                  <Stack spacing={1}>
                                    <FormHelperText>Αξιολόγηση</FormHelperText>
                                    <FormControl margin="dense">
                                      <RadioGroup
                                        row
                                        aria-label="inspectionFieldEvaluation"
                                        value={
                                          (
                                            formik.values._inspectionReport.inspectionCategories[
                                              inspectionCategoryIndex
                                            ].inspectionArticles[inspectionArticleIndex] as InspectionArticleField
                                          ).value
                                        }
                                        onChange={handleEvaluationChange(
                                          inspectionCategoryIndex,
                                          inspectionArticleIndex,
                                        )}
                                        name="inspectionFieldEvaluation"
                                        id="inspectionFieldEvaluation"
                                      >
                                        <FormControlLabel
                                          value={InspectionArticleFieldValue.OK}
                                          control={<Radio color="success" />}
                                          label={InspectionArticleFieldValue.OK}
                                        />
                                        <FormControlLabel
                                          value={InspectionArticleFieldValue.NOT_OK}
                                          control={<Radio color="error" />}
                                          label={InspectionArticleFieldValue.NOT_OK}
                                        />
                                        <FormControlLabel
                                          value={InspectionArticleFieldValue.NA}
                                          control={<Radio color="secondary" />}
                                          label={InspectionArticleFieldValue.NA}
                                        />
                                      </RadioGroup>
                                    </FormControl>
                                  </Stack>
                                </Grid>
                                <Grid item xs={12} sm={6} md={6} alignContent={'center'} paddingLeft={0}>
                                  {(
                                    formik.values._inspectionReport.inspectionCategories[inspectionCategoryIndex]
                                      .inspectionArticles[inspectionArticleIndex] as InspectionArticleField
                                  ).value !== InspectionArticleFieldValue.NA ? (
                                    <Stack spacing={1}>
                                      <FormHelperText>Παρατηρήσεις</FormHelperText>
                                      <ReactQuill
                                        style={{ minWidth: '300px' }}
                                        modules={{
                                          toolbar: [['bold', 'italic', 'underline', 'strike']],
                                        }}
                                        onChange={handleCommentsChange(inspectionCategoryIndex, inspectionArticleIndex)}
                                        value={
                                          (
                                            formik.values._inspectionReport.inspectionCategories[
                                              inspectionCategoryIndex
                                            ].inspectionArticles[inspectionArticleIndex] as InspectionArticleField
                                          ).comments
                                        }
                                      />
                                    </Stack>
                                  ) : (
                                    <Stack
                                      style={{ width: '300px', textAlign: 'center' }}
                                      spacing={1}
                                      flexGrow={1}
                                    ></Stack>
                                  )}
                                </Grid>
                              </Grid>
                            </Stack>
                          );
                        }
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
