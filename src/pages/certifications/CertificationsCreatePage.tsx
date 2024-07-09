// mui
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

// project import
import Breadcrumbs from '@components/@extended/Breadcrumbs';
import { APP_DEFAULT_PATH } from '@config';
import Certificate, { InspectionCheckType } from './Certificate';
import { downloadCertificate } from './CertificateToDocX';

// assets
import FileWordOutlined from '@ant-design/icons/FileWordOutlined';

const CertificationsCreatePage: React.FC = () => {
  const breadcrumbLinks = [
    { title: 'Home', to: APP_DEFAULT_PATH },
    { title: 'Certifications', to: '/certifications/all' },
    { title: 'Create Certificate' },
  ];

  const onDownloadCertificate = async () => {
    const certificate = new Certificate(undefined, undefined, InspectionCheckType.AA);
    console.log(certificate);
    await downloadCertificate(certificate);
  };

  return (
    <>
      <Breadcrumbs custom heading="New Certificate" links={breadcrumbLinks} />
      <Stack direction="row" justifyContent="flex-start">
        <Button onClick={onDownloadCertificate} variant="contained" startIcon={<FileWordOutlined />}>
          Export
        </Button>
      </Stack>
    </>
  );
};

export default CertificationsCreatePage;
