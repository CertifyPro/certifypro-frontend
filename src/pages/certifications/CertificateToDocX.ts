import {
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  WidthType,
  convertMillimetersToTwip,
  convertInchesToTwip,
  HeightRule,
  ShadingType,
  ILevelParagraphStylePropertiesOptions,
  AlignmentType,
  Document,
  Packer,
} from 'docx';
import { saveAs } from 'file-saver';

import Certificate from './Certificate';
import { InspectionCategory, InspectionArticleFieldValue } from './Certificate';
import { createTemplateFooter, createTemplateHeader, templateStyles } from './LiftingMachineDocXTemplate';

type InspectionArticleColumns = {
  title: string;
  width: number;
  contentAlignment: ILevelParagraphStylePropertiesOptions['alignment'];
};

// Function to create a data cell with specific width
const createInspectionArticleTableCell = (
  text: string,
  alignment: ILevelParagraphStylePropertiesOptions['alignment'],
  rowSpan?: number,
  columnSpan?: number,
) =>
  new TableCell({
    children: [new Paragraph({ text, alignment, style: 'tableContent' })],
    margins: {
      top: convertInchesToTwip(0.056), // Padding in twips (1/20th of a point), so 10 points is 200 twips
      bottom: convertInchesToTwip(0.056),
      left: convertInchesToTwip(0.056),
      right: convertInchesToTwip(0.056),
    },
    rowSpan,
    columnSpan,
  });

export const createInspectionArticleTable = (
  inspectionArticleColumns: InspectionArticleColumns[],
  inspectionArticleCellHeight: number,
  inspectionArticleCellMargin: number,
  inspectionCategory: InspectionCategory,
) => {
  // Create the table with the header row and data rows
  return [
    new Paragraph({
      style: 'tableTitle',
      children: [new TextRun({ text: inspectionCategory.name }), new TextRun({ text: ' ', break: 1, size: 8 })],
    }),
    new Table({
      rows: [
        // header row
        new TableRow({
          children: inspectionArticleColumns.map(
            (inspectionArticleColumn) =>
              new TableCell({
                children: [
                  new Paragraph({
                    text: inspectionArticleColumn.title,
                    style: 'tableHeader',
                  }),
                ],
                margins: {
                  top: convertInchesToTwip(inspectionArticleCellMargin),
                  bottom: convertInchesToTwip(inspectionArticleCellMargin),
                  left: convertInchesToTwip(inspectionArticleCellMargin),
                  right: convertInchesToTwip(inspectionArticleCellMargin),
                },
                shading: {
                  type: ShadingType.CLEAR,
                  color: 'auto',
                  fill: 'E0E0E0',
                },
              }),
          ),
          tableHeader: true,
          height: {
            value: convertInchesToTwip(inspectionArticleCellHeight),
            rule: HeightRule.ATLEAST,
          },
        }),
        ...(() => {
          const dataRows = [];
          for (const inspectionArticle of inspectionCategory.inspectionArticles) {
            let currentColumnIndex = 0;
            let dataCells = [
              createInspectionArticleTableCell(
                inspectionArticle.articleNumber,
                inspectionArticleColumns[currentColumnIndex].contentAlignment,
                inspectionArticle.fields.length,
                0,
              ),
            ];
            for (const field of inspectionArticle.fields) {
              currentColumnIndex = 1;

              if (typeof field === 'string') {
                dataCells.push(
                  createInspectionArticleTableCell(field, AlignmentType.CENTER, 0, inspectionArticleColumns.length - 1),
                );
              }

              if (typeof field === 'object') {
                dataCells.push(
                  createInspectionArticleTableCell(
                    field.description,
                    inspectionArticleColumns[currentColumnIndex].contentAlignment,
                  ),
                );
                dataCells.push(
                  createInspectionArticleTableCell(
                    field.inspectionType,
                    inspectionArticleColumns[currentColumnIndex + 1].contentAlignment,
                  ),
                );
                dataCells.push(
                  createInspectionArticleTableCell(
                    field.inspectionKind,
                    inspectionArticleColumns[currentColumnIndex + 2].contentAlignment,
                  ),
                );
                dataCells.push(
                  createInspectionArticleTableCell(
                    field.value === InspectionArticleFieldValue.OK ? 'X' : '',
                    inspectionArticleColumns[currentColumnIndex + 3].contentAlignment,
                  ),
                );
                dataCells.push(
                  createInspectionArticleTableCell(
                    field.value === InspectionArticleFieldValue.NOT_OK ? 'X' : '',
                    inspectionArticleColumns[currentColumnIndex + 4].contentAlignment,
                  ),
                );
                dataCells.push(
                  createInspectionArticleTableCell(
                    field.value === InspectionArticleFieldValue.NA ? 'X' : '',
                    inspectionArticleColumns[currentColumnIndex + 5].contentAlignment,
                  ),
                );
                dataCells.push(
                  createInspectionArticleTableCell(
                    field.comments,
                    inspectionArticleColumns[currentColumnIndex + 6].contentAlignment,
                  ),
                );
              }
              dataRows.push(
                new TableRow({
                  children: dataCells,
                  height: {
                    value: convertInchesToTwip(inspectionArticleCellHeight),
                    rule: HeightRule.ATLEAST,
                  },
                }),
              );
              dataCells = [];
            }
          }
          return dataRows;
        })(),
      ],
      width: {
        size: 100,
        type: WidthType.PERCENTAGE,
      },
      columnWidths: inspectionArticleColumns.map((inspectionColumn) =>
        convertMillimetersToTwip(inspectionColumn.width),
      ),
    }),
    new Paragraph({
      children: [new TextRun({ text: '', size: 8 })],
    }),
    new Paragraph({
      children: [new TextRun({ text: '', size: 8 })],
    }),
  ];
};

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
  );

  const table1 = createInspectionArticleTable(
    tableInfoArticleTableConfig.columns,
    tableInfoArticleTableConfig.inspectionArticleCellHeight,
    tableInfoArticleTableConfig.inspectionArticleCellMargin,
    certificate._inspectionReport.inspectionCategories[1],
  );

  const table2 = createInspectionArticleTable(
    tableInfoArticleTableConfig.columns,
    tableInfoArticleTableConfig.inspectionArticleCellHeight,
    tableInfoArticleTableConfig.inspectionArticleCellMargin,
    certificate._inspectionReport.inspectionCategories[2],
  );

  const table3 = createInspectionArticleTable(
    tableInfoArticleTableConfig.columns,
    tableInfoArticleTableConfig.inspectionArticleCellHeight,
    tableInfoArticleTableConfig.inspectionArticleCellMargin,
    certificate._inspectionReport.inspectionCategories[3],
  );

  const table4 = createInspectionArticleTable(
    tableInfoArticleTableConfig.columns,
    tableInfoArticleTableConfig.inspectionArticleCellHeight,
    tableInfoArticleTableConfig.inspectionArticleCellMargin,
    certificate._inspectionReport.inspectionCategories[4],
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
        children: [...table0, ...table1, ...table2, ...table3, ...table4],
      },
    ],
  });

  // Create a blob from the document
  const blob = await Packer.toBlob(doc);

  // Use file-saver to save the blob as a .docx file
  saveAs(blob, 'certificate-example.docx');
};
