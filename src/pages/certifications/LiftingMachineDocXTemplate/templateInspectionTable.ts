import {
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  WidthType,
  convertMillimetersToTwip,
  convertInchesToTwip,
  ILevelParagraphStylePropertiesOptions,
  HeightRule,
  ShadingType,
  AlignmentType,
} from 'docx';
import {
  InspectionCategory,
  InspectionArticleFieldValue,
  InspectionCheckType,
  InspectionArticleCategory,
  InspectionArticleField,
} from '../Certificate';
import { convertEnrichedTextToTextRuns } from './utils';

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
) => {
  const enrinchedParagraph = new Paragraph({
    children: convertEnrichedTextToTextRuns(text),
    alignment,
    style: 'tableContent',
  });
  return new TableCell({
    children: [enrinchedParagraph],
    margins: {
      top: convertInchesToTwip(0.056), // Padding in twips (1/20th of a point), so 10 points is 200 twips
      bottom: convertInchesToTwip(0.056),
      left: convertInchesToTwip(0.056),
      right: convertInchesToTwip(0.056),
    },
    rowSpan,
    columnSpan,
  });
};

export const createInspectionArticleTable = (
  inspectionArticleColumns: InspectionArticleColumns[],
  inspectionArticleCellHeight: number,
  inspectionArticleCellMargin: number,
  inspectionCategory: InspectionCategory,
  inspectionCheckType: InspectionCheckType | 'DEFAULT' = 'DEFAULT',
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
          for (const _inspectionArticle of inspectionCategory.inspectionArticles) {
            let currentColumnIndex = 0;
            let dataCells: TableCell[] = [];

            if ((_inspectionArticle as InspectionArticleCategory).articleTitle) {
              const inspectionArticleCategory = _inspectionArticle as InspectionArticleCategory;

              const rowSpan =
                inspectionArticleCategory.fields.findIndex((field) => field.articleNumber) === -1
                  ? inspectionArticleCategory.fields.length + 1
                  : 0;

              dataCells = [
                createInspectionArticleTableCell(
                  inspectionArticleCategory.articleNumber,
                  inspectionArticleColumns[currentColumnIndex].contentAlignment,
                  rowSpan,
                  0,
                ),
                createInspectionArticleTableCell(
                  inspectionArticleCategory.articleTitle,
                  AlignmentType.CENTER,
                  0,
                  inspectionArticleColumns.length - 1,
                ),
              ];

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
              currentColumnIndex = 0;
              inspectionArticleCategory.fields.forEach((field) => {
                if (field.articleNumber) {
                  dataCells.push(
                    createInspectionArticleTableCell(
                      field.articleNumber,
                      inspectionArticleColumns[currentColumnIndex].contentAlignment,
                    ),
                  );
                }

                dataCells.push(
                  createInspectionArticleTableCell(
                    field.description,
                    inspectionArticleColumns[currentColumnIndex + 1].contentAlignment,
                  ),
                  createInspectionArticleTableCell(
                    field.inspectionType,
                    inspectionArticleColumns[currentColumnIndex + 2].contentAlignment,
                  ),
                  createInspectionArticleTableCell(
                    field.inspectionKind,
                    inspectionArticleColumns[currentColumnIndex + 3].contentAlignment,
                  ),
                  createInspectionArticleTableCell(
                    field.templateValues[inspectionCheckType].value === InspectionArticleFieldValue.OK ? 'X' : '',
                    inspectionArticleColumns[currentColumnIndex + 4].contentAlignment,
                  ),
                  createInspectionArticleTableCell(
                    field.templateValues[inspectionCheckType].value === InspectionArticleFieldValue.NOT_OK ? 'X' : '',
                    inspectionArticleColumns[currentColumnIndex + 5].contentAlignment,
                  ),
                  createInspectionArticleTableCell(
                    field.templateValues[inspectionCheckType].value === InspectionArticleFieldValue.NA ? 'X' : '',
                    inspectionArticleColumns[currentColumnIndex + 6].contentAlignment,
                  ),
                  createInspectionArticleTableCell(
                    field.templateValues[inspectionCheckType].comments,
                    inspectionArticleColumns[currentColumnIndex + 7].contentAlignment,
                  ),
                );

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
              });
            } else {
              const inspectionArticle = _inspectionArticle as InspectionArticleField;

              dataCells = [
                createInspectionArticleTableCell(
                  inspectionArticle.articleNumber!,
                  inspectionArticleColumns[currentColumnIndex].contentAlignment,
                ),
                createInspectionArticleTableCell(
                  inspectionArticle.description,
                  inspectionArticleColumns[currentColumnIndex + 1].contentAlignment,
                ),
                createInspectionArticleTableCell(
                  inspectionArticle.inspectionType,
                  inspectionArticleColumns[currentColumnIndex + 2].contentAlignment,
                ),
                createInspectionArticleTableCell(
                  inspectionArticle.inspectionKind,
                  inspectionArticleColumns[currentColumnIndex + 3].contentAlignment,
                ),
                createInspectionArticleTableCell(
                  inspectionArticle.templateValues[inspectionCheckType].value === InspectionArticleFieldValue.OK
                    ? 'X'
                    : '',
                  inspectionArticleColumns[currentColumnIndex + 4].contentAlignment,
                ),
                createInspectionArticleTableCell(
                  inspectionArticle.templateValues[inspectionCheckType].value === InspectionArticleFieldValue.NOT_OK
                    ? 'X'
                    : '',
                  inspectionArticleColumns[currentColumnIndex + 5].contentAlignment,
                ),
                createInspectionArticleTableCell(
                  inspectionArticle.templateValues[inspectionCheckType].value === InspectionArticleFieldValue.NA
                    ? 'X'
                    : '',
                  inspectionArticleColumns[currentColumnIndex + 6].contentAlignment,
                ),
                createInspectionArticleTableCell(
                  inspectionArticle.templateValues[inspectionCheckType].comments,
                  inspectionArticleColumns[currentColumnIndex + 7].contentAlignment,
                ),
              ];
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
