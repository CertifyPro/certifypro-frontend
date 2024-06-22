import {
  Header,
  Paragraph,
  ImageRun,
  TextRun,
  HorizontalPositionRelativeFrom,
  VerticalPositionRelativeFrom,
  ExternalHyperlink,
  TabStopPosition,
  TabStopType,
  Tab,
} from 'docx';

import { moodyLogob64 } from './assets';

export const createTemplateHeader = () => {
  return new Header({
    children: [
      new Paragraph({
        style: 'headerImage',
        children: [
          new ImageRun({
            data: moodyLogob64,
            transformation: {
              width: 94,
              height: 99,
            },
            floating: {
              lockAnchor: true,
              horizontalPosition: {
                relative: HorizontalPositionRelativeFrom.PAGE,
                offset: 550000,
              },
              verticalPosition: {
                relative: VerticalPositionRelativeFrom.PAGE,
                offset: 100000,
              },
            },
          }),
        ],
      }),
      new Paragraph({
        style: 'headerContent',
        children: [
          new TextRun({ text: '\u00A0'.repeat(23) + 'MOODY HELLAS A.E.', bold: true, size: 28 }),
          new TextRun({
            text: '\u00A0'.repeat(40) + 'Ελβετίας 21,\u00A0Αγία Παρασκευή,\u00A0ΤΚ 15342,\u00A0Aθήνα',
            break: 1,
          }),
          new TextRun({ text: '\u00A0'.repeat(40) + 'Τηλ. : 210-6009040  Fax : 210-6009091,', break: 1 }),
          new TextRun({ text: '\u00A0'.repeat(40) + 'e-mail:\u00A0', break: 1 }),
          new ExternalHyperlink({
            children: [
              new TextRun({
                text: 'info@moodyhellas.gr',
                style: 'Hyperlink',
              }),
            ],
            link: 'info@moodyhellas.gr',
          }),
          new TextRun({ text: ',\u00A0' }),
          new ExternalHyperlink({
            children: [
              new TextRun({
                text: 'www.moodyhellas.gr',
                style: 'Hyperlink',
              }),
            ],
            link: 'http://www.moodyhellas.gr',
          }),
        ],
      }),
      new Paragraph({ text: '', run: { size: 30 } }),
      new Paragraph({
        style: 'headerContent',
        children: [
          new TextRun(' '),
          new TextRun({ text: '\u00A0'.repeat(4) + 'ΕΣΠ-ΔΕ-08', size: 20 }),
          new TextRun({
            children: [new Tab(), 'ΑΡ. ΠΙΣΤΟΠΟΙΗΤΙΚΟΥ: #####/##.###.####/##-####'],
            italics: true,
          }),
          new TextRun({ text: '', break: 1 }),
          new TextRun({ text: '\u00A0'.repeat(6) + 'ΑΝΑΘ. 08', size: 20 }),
          new TextRun({
            children: [new Tab(), 'ΗΜΕΡΟΜΗΝΙΑ: DD/MM/YYYY'],
            italics: true,
          }),
        ],
        tabStops: [
          {
            type: TabStopType.RIGHT,
            position: TabStopPosition.MAX + 1120,
          },
          {
            type: TabStopType.RIGHT,
            position: TabStopPosition.MAX + 1120,
          },
        ],
      }),
      new Paragraph({ text: '', run: { size: 22 } }),
    ],
  });
};
