import { TextRun, UnderlineType } from 'docx';

interface TextRunStyles {
  bold?: boolean;
  strike?: boolean;
  italics?: boolean;
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
      const trimmedText = (node.textContent || '').trim();
      if (trimmedText.length > 0) {
        textRuns.push(
          new TextRun({
            text: node.textContent || '',
            ...styles,
          }),
        );
      }
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      // Element node
      const element = node as HTMLElement;
      const newStyles = { ...styles };

      switch (element.tagName) {
        case 'B':
        case 'STRONG':
          newStyles.bold = true;
          break;
        case 'I':
        case 'EM': // Handle both <i> and <em> as italic text
          newStyles.italics = true;
          break;
        case 'U':
          newStyles.underline = { type: UnderlineType.SINGLE };
          break;
        case 'S':
          newStyles.strike = true;
          break;
        case 'P': {
          // Process the children of the paragraph
          const initialLength = textRuns.length; // Check the length of textRuns before processing the <p> content
          element.childNodes.forEach((childNode) => processNode(childNode, newStyles));

          // If content was added during <p> processing, add a newline
          if (textRuns.length > initialLength) {
            textRuns.push(new TextRun({ text: '\n' }));
          }
          return;
        }
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

  // Remove the last TextRun if it's just a newline (i.e., avoid trailing newline)
  type lastRunInteral = {
    root: { root: string[] }[];
  };
  if (textRuns.length > 0) {
    const lastRun = textRuns[textRuns.length - 1];
    if (lastRun instanceof TextRun && (lastRun as unknown as lastRunInteral).root[1].root[1] === '\n') {
      textRuns.pop();
    }
  }

  return textRuns;
};
