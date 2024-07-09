import {
  AlignmentType,
  BorderStyle,
  Document,
  Packer,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  TextRun,
  WidthType,
} from 'docx';
import { saveAs } from 'file-saver';

import Certificate from './Certificate';
import {
  createTemplateFooter,
  createTemplateHeader,
  createInspectionArticleTable,
  templateStyles,
} from './LiftingMachineDocXTemplate';

export const downloadCertificate = async (certificate: Certificate) => {
  const tableInfoArticleTableConfig = {
    columns: [
      { title: 'Α/Α', width: 9.1, contentAlignment: AlignmentType.LEFT },
      { title: 'ΠΕΡΙΓΡΑΦΗ', width: 57.7, contentAlignment: AlignmentType.LEFT },
      { title: 'ΤΥΠΟΣ ΕΛΕΓΧΟΥ', width: 16.8, contentAlignment: AlignmentType.CENTER },
      { title: 'ΕΙΔΟΣ ΕΛΕΓΧΟΥ', width: 16.8, contentAlignment: AlignmentType.CENTER },
      { title: 'ΟΚ', width: 9.6, contentAlignment: AlignmentType.CENTER },
      { title: 'NOT OK', width: 9.6, contentAlignment: AlignmentType.CENTER },
      { title: 'N/A', width: 9.6, contentAlignment: AlignmentType.CENTER },
      { title: 'ΠΑΡΑΤΗΡΗΣΕΙΣ', width: 50.05, contentAlignment: AlignmentType.LEFT },
    ],
    inspectionArticleCellHeight: 0.127,
    inspectionArticleCellMargin: 0.056,
  };

  const table0 = createInspectionArticleTable(
    tableInfoArticleTableConfig.columns,
    tableInfoArticleTableConfig.inspectionArticleCellHeight,
    tableInfoArticleTableConfig.inspectionArticleCellMargin,
    certificate._inspectionReport.inspectionCategories[0],
    certificate._inspectionCheckType,
  );

  const table1 = createInspectionArticleTable(
    tableInfoArticleTableConfig.columns,
    tableInfoArticleTableConfig.inspectionArticleCellHeight,
    tableInfoArticleTableConfig.inspectionArticleCellMargin,
    certificate._inspectionReport.inspectionCategories[1],
    certificate._inspectionCheckType,
  );

  const table2 = createInspectionArticleTable(
    tableInfoArticleTableConfig.columns,
    tableInfoArticleTableConfig.inspectionArticleCellHeight,
    tableInfoArticleTableConfig.inspectionArticleCellMargin,
    certificate._inspectionReport.inspectionCategories[2],
    certificate._inspectionCheckType,
  );

  const table3 = createInspectionArticleTable(
    tableInfoArticleTableConfig.columns,
    tableInfoArticleTableConfig.inspectionArticleCellHeight,
    tableInfoArticleTableConfig.inspectionArticleCellMargin,
    certificate._inspectionReport.inspectionCategories[3],
    certificate._inspectionCheckType,
  );

  const table4 = createInspectionArticleTable(
    tableInfoArticleTableConfig.columns,
    tableInfoArticleTableConfig.inspectionArticleCellHeight,
    tableInfoArticleTableConfig.inspectionArticleCellMargin,
    certificate._inspectionReport.inspectionCategories[4],
    certificate._inspectionCheckType,
  );

  // Create a new Document
  const doc = new Document({
    styles: templateStyles,
    sections: [
      {
        headers: {
          default: createTemplateHeader(),
        },
        footers: {
          default: createTemplateFooter(),
        },
        properties: {
          page: {
            margin: {
              top: `1.57cm`,
              bottom: `0.25cm`,
              left: `1.5cm`,
              right: `1.5cm`,
              footer: `0.5cm`,
              header: `0.5cm`,
            },
          },
        },
        children: [
          new Paragraph({
            style: 'inspectionTitle',
            children: [new TextRun({ text: 'ΕΚΘΕΣΗ ΕΠΙΘΕΩΡΗΣΗΣ' })],
          }),
          ...table0,
          ...table1,
          ...table2,
          ...table3,
          ...table4,
          new Table({
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({ text: 'ΤΥΠΟΣ ΕΛΕΓΧΟΥ', bold: true, size: 16 }),
                          new TextRun({ text: 'ΑΑ: Αρχικός έλεγχος', bold: true, size: 16, break: 1 }),
                          new TextRun({ text: 'Α & Β: Επανέλεγχος', bold: true, size: 16, break: 1 }),
                        ],
                      }),
                    ],
                    borders: {
                      top: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
                      bottom: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
                      left: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
                      right: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
                    },
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({ text: 'ΕΙΔΟΣ ΕΛΕΓΧΟΥ', bold: true, size: 16 }),
                          new TextRun({
                            text: 'Ο: Οπτικός έλεγχος ή/και ανασκόπηση εγγράφων',
                            bold: true,
                            size: 16,
                            break: 1,
                          }),
                          new TextRun({ text: 'Λ: Λειτουργικός έλεγχος', bold: true, size: 16, break: 1 }),
                          new TextRun({ text: 'Α: Ανασκόπηση εγγράφων', bold: true, size: 16, break: 1 }),
                        ],
                      }),
                    ],
                    borders: {
                      top: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
                      bottom: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
                      left: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
                      right: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
                    },
                  }),
                  new TableCell({
                    children: [],
                  }),
                ],
              }),
            ],
            width: {
              size: 100,
              type: WidthType.PERCENTAGE,
            },
            columnWidths: [2000, 3600, 4000],
            borders: {
              top: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
              bottom: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
              left: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
              right: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
              insideHorizontal: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
              insideVertical: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
            },
          }),
        ],
      },
    ],
  });

  // Create a blob from the document
  const blob = await Packer.toBlob(doc);

  // Use file-saver to save the blob as a .docx file
  saveAs(blob, 'certificate-example.docx');
};
