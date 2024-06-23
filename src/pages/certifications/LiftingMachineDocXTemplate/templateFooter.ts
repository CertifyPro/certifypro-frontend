import {
  Paragraph,
  TextRun,
  Footer,
  ImageRun,
  PageNumber,
  HorizontalPositionRelativeFrom,
  VerticalPositionRelativeFrom,
  Tab,
  TabStopType,
  TabStopPosition,
} from 'docx';

import { esydLogoB64 } from './assets';

export const createTemplateFooter = () => {
  return new Footer({
    children: [
      new Paragraph({
        style: 'footer',
        children: [
          new ImageRun({
            data: esydLogoB64,
            transformation: {
              width: 65,
              height: 35,
            },
            floating: {
              lockAnchor: true,
              horizontalPosition: {
                relative: HorizontalPositionRelativeFrom.PAGE,
                offset: 523152,
              },
              verticalPosition: {
                relative: VerticalPositionRelativeFrom.PAGE,
                offset: 9974936,
              },
            },
          }),
          new TextRun({ text: '', break: 3, size: 16 }),
          new TextRun({ text: '\u00A0\u00A0\u00A0\u00A0\u00A0' }),
          new TextRun({
            text: 'Έλεγχος',
            bold: true,
            italics: true,
            size: 14,
          }),
          new TextRun({
            text: 'Αρ. Πιστ.103-5',
            break: 1,
            bold: true,
            italics: true,
            size: 14,
          }),
          new TextRun({
            children: [new Tab(), 'σελ. ', PageNumber.CURRENT, ' από ', PageNumber.TOTAL_PAGES],
          }),
        ],
        tabStops: [
          {
            type: TabStopType.RIGHT,
            position: TabStopPosition.MAX + 1120,
          },
        ],
      }),
    ],
  });
};
