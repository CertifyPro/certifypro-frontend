import { AlignmentType, LineRuleType, UnderlineType } from 'docx';

export const templateStyles = {
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
      id: 'headerImage',
      name: 'Header Image',
      basedOn: 'Normal',
      next: 'Normal',
      run: {
        size: 6,
      },
      paragraph: {
        alignment: AlignmentType.LEFT,
        spacing: {
          line: 40,
          lineRule: LineRuleType.EXACT,
        },
      },
    },
    {
      id: 'headerContent',
      name: 'Header Content',
      basedOn: 'Normal',
      next: 'Normal',
      run: {
        size: 16,
        bold: false,
      },
      paragraph: {
        alignment: AlignmentType.LEFT,
        spacing: {
          line: 240,
          before: 40,
          after: 40,
          lineRule: LineRuleType.AUTO,
        },
      },
    },
    {
      id: 'footer',
      name: 'Footer',
      basedOn: 'Normal',
      next: 'Normal',
      run: {
        size: 16,
        bold: true,
      },
      paragraph: {
        alignment: AlignmentType.LEFT,
      },
    },
    {
      id: 'inspectionTitle',
      name: 'Inspection Title',
      basedOn: 'Normal',
      next: 'Normal',
      run: {
        size: 20,
        bold: true,
        underline: {
          type: UnderlineType.SINGLE,
        },
      },
      paragraph: {
        alignment: AlignmentType.CENTER,
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
        alignment: AlignmentType.LEFT,
      },
    },
  ],
};
