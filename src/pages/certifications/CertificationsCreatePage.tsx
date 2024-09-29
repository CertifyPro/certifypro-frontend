import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';

// mui
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';

// project import
import { Breadcrumbs } from '@components/@extended/Breadcrumbs';
import MainCard from '@components/MainCard';
import { addCertificate } from 'utils/db';
import Certificate, { InspectionCheckType, CertificateType, CertificateCategory } from './Certificate';
import { downloadCertificate } from './CertificateToDocX';

// assets
import FileWordOutlined from '@ant-design/icons/FileWordOutlined';

const CertificationsCreatePage: React.FC = () => {
  const navigate = useNavigate();
  const breadcrumbLinks = [{ title: 'Πιστοποιητικά', to: '/certifications/all' }, { title: 'Δημιουργία' }];

  const formik = useFormik({
    initialValues: {
      certificateCategory: CertificateCategory.LIFTING_MACHINE_PAPAGALAKI,
      certificateType: CertificateType.INSPECTION_CERTIFICATE,
      inspectionCheckType: InspectionCheckType.AA,
    },
    onSubmit: async (data) => {
      const newCertificate = new Certificate(data.certificateType, data.certificateCategory, data.inspectionCheckType);

      await addCertificate(newCertificate)
        .then(() => {
          navigate('/certifications/all');
        })
        .catch((e) => {
          console.error('Failed to add certificate to db with error: ', e);
        });
    },
  });

  const onDownloadCertificate = async () => {
    await downloadCertificate(
      new Certificate(
        formik.values.certificateType,
        formik.values.certificateCategory,
        formik.values.inspectionCheckType,
      ),
    );
  };

  return (
    <>
      <Breadcrumbs divider={false} custom heading="Νέο Πιστοποιητικό" links={breadcrumbLinks} />
      <Grid container spacing={2.5}>
        <Grid item xs={12} md={12} lg={10}>
          <MainCard>
            <form onSubmit={formik.handleSubmit}>
              <Grid container spacing={4} alignItems="center">
                <Grid item xs={12} sm={12} md={6}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="certificateCategory">Κατηγορία</InputLabel>
                    <FormControl>
                      <Select
                        id="certificateCategory"
                        name="certificateCategory"
                        value={formik.values.certificateCategory}
                        onChange={formik.handleChange}
                      >
                        <MenuItem value={CertificateCategory.LIFTING_MACHINE_PAPAGALAKI}>
                          ΓΕΡΑΝΟΣ ΕΠΙ ΟΧΗΜΑΤΟΣ - ΠΑΠΑΓΑΛΑΚΙ
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Stack>
                </Grid>

                <Grid item xs={12} sm={12} md={6}>
                  <InputLabel htmlFor="inspectionCheckType">Έλεγχος τύπου</InputLabel>
                  <FormControl margin="dense">
                    <RadioGroup
                      row
                      aria-label="inspectionCheckType"
                      value={formik.values.inspectionCheckType}
                      onChange={formik.handleChange}
                      name="inspectionCheckType"
                      id="inspectionCheckType"
                    >
                      <FormControlLabel value={InspectionCheckType.AA} control={<Radio />} label="AA" />
                      <FormControlLabel value={InspectionCheckType.A} control={<Radio />} label="A" />
                      <FormControlLabel value={InspectionCheckType.B} control={<Radio />} label="B" />
                    </RadioGroup>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={12} md={6}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="certificateType">Έγγραφο</InputLabel>
                    <FormControl>
                      <Select
                        id="certificateType"
                        name="certificateType"
                        value={formik.values.certificateType}
                        onChange={formik.handleChange}
                      >
                        <MenuItem value={CertificateType.INSPECTION_CERTIFICATE}>ΠΙΣΤΟΠΟΙΗΤΙΚΟ ΕΛΕΓΧΟΥ</MenuItem>
                        <MenuItem disabled value={CertificateType.INSPECTION_REPORT}>
                          ΕΚΘΕΣΗ ΕΠΙΘΕΩΡΗΣΗΣ
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Stack>
                </Grid>

                <Grid item xs={12} marginTop={2}>
                  <Stack direction="row" justifyContent="flex-end" spacing={2}>
                    <Button onClick={onDownloadCertificate} variant="outlined" startIcon={<FileWordOutlined />}>
                      ΕΞΑΓΩΓΗ
                    </Button>
                    <Button variant="contained" type="submit">
                      ΔΗΜΙΟΥΡΓΙΑ
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
            </form>
          </MainCard>
        </Grid>
      </Grid>
    </>
  );
};

export default CertificationsCreatePage;
