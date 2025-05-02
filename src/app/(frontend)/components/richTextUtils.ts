// Define types for rich text structure
export interface RichTextNode {
  type: string
  children?: RichTextNode[]
  text?: string
}

export interface PayloadRichText {
  root: { children: RichTextNode[]; [key: string]: any }
  [key: string]: any
}

// Function to extract plain text from rich text structure
export const extractTextFromRichText = (richText: PayloadRichText): string => {
  const extractFromNode = (node: RichTextNode): string => {
    if (node.text) {
      return node.text
    }

    if (node.children && node.children.length > 0) {
      return node.children.map((child) => extractFromNode(child)).join('')
    }

    return ''
  }

  if (!richText || !richText.root || !richText.root.children) {
    return ''
  }

  return richText.root.children.map((node) => extractFromNode(node)).join(' ')
}
