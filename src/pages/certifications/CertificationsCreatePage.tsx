import { Document, Packer, Paragraph, TextRun } from 'docx';
import { saveAs } from 'file-saver';

// mui
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

// project import
import Breadcrumbs from '@components/@extended/Breadcrumbs';

import { APP_DEFAULT_PATH } from '@config';

// assets
import FileWordOutlined from '@ant-design/icons/FileWordOutlined';

const CertificationsCreatePage: React.FC = () => {
  const breadcrumbLinks = [
    { title: 'Home', to: APP_DEFAULT_PATH },
    { title: 'Certifications', to: '/certifications/all' },
    { title: "Create Certificate"}
  ];

  const downloadCertificate = async () => {
    // Create a new Document
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              children: [
                new TextRun("Hello there! This is a sample certificate .docx file."),
              ],
            }),
          ],
        },
      ],
    });

    // Create a blob from the document
    const blob = await Packer.toBlob(doc);

    // Use file-saver to save the blob as a .docx file
    saveAs(blob, "certificate-example.docx");
  };

  return (
    <>
      <Breadcrumbs custom heading="New Certificate" links={breadcrumbLinks} />
      <Stack direction="row" justifyContent="flex-start">
        <Button onClick={downloadCertificate} variant="contained" startIcon={<FileWordOutlined />}>Export</Button>
      </Stack>
    </>
  )
};

export default CertificationsCreatePage;
