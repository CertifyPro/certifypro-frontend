import { TextRun, UnderlineType } from 'docx';

interface TextRunStyles {
  bold?: boolean;
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
      if (element.tagName === 'B') {
        newStyles.bold = true;
      }
      if (element.tagName === 'U') {
        newStyles.underline = { type: UnderlineType.SINGLE };
      }
      element.childNodes.forEach((childNode) => processNode(childNode, newStyles));
    }
  }

  doc.body.childNodes.forEach((node) => processNode(node));

  return textRuns;
};
