import { TextRun, UnderlineType } from 'docx';

interface TextRunStyles {
  bold?: boolean;
  strike?: boolean;
  underline?: {
    type: typeof UnderlineType.SINGLE;
  };
}

// Function to convert enriched text (HTML string) to TextRun objects
export const convertEnrichedTextToTextRuns = (enrichedText: string) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(enrichedText, 'text/html');
  const textRuns: TextRun[] = [];

  function processNode(node: Node, styles: TextRunStyles = {}) {
    if (node.nodeType === Node.TEXT_NODE) {
      // Text node
      textRuns.push(
        new TextRun({
          text: node.textContent || '',
          ...styles,
        }),
      );
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      // Element node
      const element = node as HTMLElement;
      const newStyles = { ...styles };
      console.log(element.tagName);
      switch (element.tagName) {
        case 'B':
        case 'STRONG':
          newStyles.bold = true;
          break;
        case 'U':
          newStyles.underline = { type: UnderlineType.SINGLE };
          break;
        case 'S':
          newStyles.strike = true;
          break;
        case 'BR':
          textRuns.push(new TextRun({ text: '\n' }));
          return;
        default:
          break;
      }

      element.childNodes.forEach((childNode) => processNode(childNode, newStyles));
    }
  }

  doc.body.childNodes.forEach((node) => processNode(node));

  return textRuns;
};
