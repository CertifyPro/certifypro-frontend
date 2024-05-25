import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  WidthType,
  convertMillimetersToTwip,
  convertInchesToTwip,
  Header,
  Footer,
  VerticalAlign,
  TextDirection,
  HeadingLevel,
  PageNumber,
  HeightRule,
  ShadingType,
  AlignmentType,
  LineRuleType,
} from 'docx';
import { saveAs } from 'file-saver';

// mui
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

// project import
import Breadcrumbs from '@components/@extended/Breadcrumbs';

import { APP_DEFAULT_PATH } from '@config';

// assets
import FileWordOutlined from '@ant-design/icons/FileWordOutlined';

const inspectionReport = () => ({});

const CertificationsCreatePage: React.FC = () => {
  const breadcrumbLinks = [
    { title: 'Home', to: APP_DEFAULT_PATH },
    { title: 'Certifications', to: '/certifications/all' },
    { title: 'Create Certificate' },
  ];

  const downloadCertificate = async () => {
    // Function to create a header cell with auto width
    const createHeaderCell = (text: string) =>
      new TableCell({
        children: [
          new Paragraph({
            text,
            style: 'tableHeader',
          }),
        ],
        margins: {
          top: convertInchesToTwip(0.056), // Padding in twips (1/20th of a point), so 10 points is 200 twips
          bottom: convertInchesToTwip(0.056),
          left: convertInchesToTwip(0.056),
          right: convertInchesToTwip(0.056),
        },
        shading: {
          type: ShadingType.CLEAR,
          color: 'auto',
          fill: 'E0E0E0', // Light gray background color
        },
      });

    // Function to create a data cell with specific width
    const createDataCell = (text: string, alignment: any) =>
      new TableCell({
        children: [new Paragraph({ text, alignment, style: 'tableContent' })],
        margins: {
          top: convertInchesToTwip(0.056), // Padding in twips (1/20th of a point), so 10 points is 200 twips
          bottom: convertInchesToTwip(0.056),
          left: convertInchesToTwip(0.056),
          right: convertInchesToTwip(0.056),
        },
      });

    // Create the table cells for header and data
    const headerCells = [
      createHeaderCell('Α/Α'),
      createHeaderCell('ΠΕΡΙΓΡΑΦΗ'),
      createHeaderCell('ΤΥΠΟΣ ΕΛΕΓΧΟΥ'),
      createHeaderCell('ΕΙΔΟΣ ΕΛΕΓΧΟΥ'),
      createHeaderCell('ΟΚ'),
      createHeaderCell('ΝΟΤ ΟΚ'),
      createHeaderCell('Ν/Α'),
      createHeaderCell('ΠΑΡΑΤΗΡΗΣΕΙΣ'),
    ];

    const dataMatrix = [
      ['1.', 'ΣΥΣΤΗΜΑ ΔΙΕΥΘΥΝΣΗΣ', 'ΑΑ, A & B', 'Ο & Λ', '', '', 'X', ''],
      ['2.', 'ΣΥΣΤΗΜΑ ΑΝΑΡΤΗΣΗΣ', 'ΑΑ, A & B', 'Ο & Λ', '', '', 'X', ''],
      ['3.', 'ΣΥΣΤΗΜΑ ΠΕΔΗΣΗΣ', 'ΑΑ, A & B', 'Ο & Λ', '', '', 'X', ''],
      ['4.', 'ΤΡΟΧΟΙ, ΕΛΑΣΤΙΚΑ, ΕΡΠΥΣΤΡΙΕΣ', 'ΑΑ, A & B', 'Ο', '', '', 'X', ''],
      ['5.', 'ΦΩΤΑ', 'ΑΑ, A & B', 'Ο & Λ', '', '', 'X', ''],
    ];
    const dataRows = [];
    for (let i = 0; i < 5; i++) {
      const dataCells = [];
      for (let j = 0; j < 8; j++) {
        const alignment = j == 1 || j == 7 ? AlignmentType.LEFT : AlignmentType.CENTER;
        dataCells.push(createDataCell(dataMatrix[i][j], alignment));
      }
      dataRows.push(
        new TableRow({
          children: dataCells,
          height: {
            value: convertInchesToTwip(0.127),
            rule: HeightRule.ATLEAST,
          },
        }),
      );
    }

    // Create the table with the header row and data rows
    const table = new Table({
      rows: [
        new TableRow({
          children: headerCells,
          tableHeader: true,
          height: {
            value: convertInchesToTwip(0.127),
            rule: HeightRule.ATLEAST,
          },
        }),
        ...dataRows,
      ],
      width: {
        size: 100,
        type: WidthType.PERCENTAGE,
      },
      columnWidths: [
        convertMillimetersToTwip(9.1), // 0.91 cm
        convertMillimetersToTwip(57.7), // 5.77 cm
        convertMillimetersToTwip(16.8), // 1.68 cm
        convertMillimetersToTwip(16.8), // 1.68 cm
        convertMillimetersToTwip(9.6), // 0.96 cm
        convertMillimetersToTwip(9.6), // 0.96 cm
        convertMillimetersToTwip(9.6), // 0.96 cm
        convertMillimetersToTwip(50.5), // 5.05 cm
      ], // You can adjust the width as per your requirement
    });

    // Create a new Document
    const doc = new Document({
      styles: {
        default: {
          document: {
            run: {
              size: 14,
              characterSpacing: 11,
            },
            paragraph: {
              alignment: AlignmentType.LEFT,
              spacing: {
                line: 240,
                before: 40,
                after: 40,
              },
            },
          },
        },
        paragraphStyles: [
          {
            id: 'pagination',
            name: 'Pagination',
            basedOn: 'Normal',
            next: 'Normal',
            run: {
              size: 16,
              characterSpacing: 11,
              bold: true,
            },
            paragraph: {
              alignment: AlignmentType.RIGHT,
            },
          },
          {
            id: 'tableHeader',
            name: 'Table Header',
            basedOn: 'Normal',
            next: 'Normal',
            run: {
              bold: true,
              size: 14,
            },
            paragraph: {
              alignment: AlignmentType.CENTER,
            },
          },
          {
            id: 'tableContent',
            name: 'Table Content',
            basedOn: 'Normal',
            next: 'Normal',
            run: {
              bold: true,
              size: 14,
            },
          },
          {
            id: 'tableTitle',
            name: 'Table Title',
            basedOn: 'Normal',
            next: 'Normal',
            run: {
              bold: true,
              size: 16,
              font: 'Arial',
            },
            paragraph: {
              alignment: AlignmentType.CENTER,
            },
          },
        ],
      },
      sections: [
        {
          headers: {
            default: new Header({ children: [] }),
          },
          footers: {
            default: new Footer({
              children: [
                new Paragraph({
                  style: 'pagination',
                  children: [
                    new TextRun({
                      children: ['σελ. ', PageNumber.CURRENT, ' από ', PageNumber.TOTAL_PAGES],
                    }),
                  ],
                }),
              ],
            }),
          },
          properties: {
            page: {
              margin: {
                top: `1.57cm`,
                bottom: `0.25cm`,
                left: `1.5cm`,
                right: `1.5cm`,
              },
            },
          },
          children: [
            new Paragraph({
              style: 'tableTitle',
              children: [
                new TextRun({ text: 'V. ΕΠΙΠΛΕΟΝ ΑΠΑΙΤΗΣΕΙΣ ΓΙΑ ΜΗΧΑΝΗΜΑΤΑ ΕΡΓΩΝ' }),
                new TextRun({ text: ' ', break: 1, size: 8 }),
              ],
            }),
            // new Paragraph({ children: [new TextRun({ text: '\t', size: 8 })] }),
            table,
          ],
        },
      ],
    });

    // Create a blob from the document
    const blob = await Packer.toBlob(doc);

    // Use file-saver to save the blob as a .docx file
    saveAs(blob, 'certificate-example.docx');
  };

  return (
    <>
      <Breadcrumbs custom heading="New Certificate" links={breadcrumbLinks} />
      <Stack direction="row" justifyContent="flex-start">
        <Button onClick={downloadCertificate} variant="contained" startIcon={<FileWordOutlined />}>
          Export
        </Button>
      </Stack>
    </>
  );
};

export default CertificationsCreatePage;
