'use client'

import React from 'react'
import { PayloadRichText, RichTextNode } from './richTextUtils'

interface RichTextProps {
  content: PayloadRichText | string
  className?: string
}

export const RichText: React.FC<RichTextProps> = ({ content, className = '' }) => {
  if (!content) return null

  // If content is a string, render it as a paragraph
  if (typeof content === 'string') {
    return <p className={className}>{content}</p>
  }

  const richText = content as PayloadRichText
  if (!richText.root || !richText.root.children) return null

  // Render a node based on its type
  const renderNode = (node: RichTextNode, index: number): React.ReactNode => {
    // Handle text nodes
    if (node.text) {
      // Check for text formatting
      const format = (node as any).format || 0
      const isBold = format & 1 // Bit 1 is for bold
      const isItalic = format & 2 // Bit 2 is for italic
      const isUnderline = format & 4 // Bit 3 is for underline
      const isStrikethrough = format & 8 // Bit 4 is for strikethrough
      const isCode = format & 16 // Bit 5 is for code

      // Apply formatting using nested elements
      let textNode: React.ReactNode = node.text

      if (isCode) {
        textNode = <code>{textNode}</code>
      }
      if (isStrikethrough) {
        textNode = <s>{textNode}</s>
      }
      if (isUnderline) {
        textNode = <u>{textNode}</u>
      }
      if (isItalic) {
        textNode = <em>{textNode}</em>
      }
      if (isBold) {
        textNode = <strong>{textNode}</strong>
      }

      return <React.Fragment key={index}>{textNode}</React.Fragment>
    }

    // Handle paragraph nodes
    if (node.type === 'paragraph') {
      return (
        <p key={index} className={className ? `rich-text-paragraph ${className}` : 'rich-text-paragraph'}>
          {node.children?.map((child, childIndex) => renderNode(child, childIndex))}
        </p>
      )
    }

    // Handle heading nodes
    if (node.type === 'heading') {
      const tag = (node as any).tag || 'h2'

      switch (tag) {
        case 'h1':
          return (
            <h1 key={index}>
              {node.children?.map((child, childIndex) => renderNode(child, childIndex))}
            </h1>
          )
        case 'h2':
          return (
            <h2 key={index}>
              {node.children?.map((child, childIndex) => renderNode(child, childIndex))}
            </h2>
          )
        case 'h3':
          return (
            <h3 key={index}>
              {node.children?.map((child, childIndex) => renderNode(child, childIndex))}
            </h3>
          )
        case 'h4':
          return (
            <h4 key={index}>
              {node.children?.map((child, childIndex) => renderNode(child, childIndex))}
            </h4>
          )
        case 'h5':
          return (
            <h5 key={index}>
              {node.children?.map((child, childIndex) => renderNode(child, childIndex))}
            </h5>
          )
        case 'h6':
          return (
            <h6 key={index}>
              {node.children?.map((child, childIndex) => renderNode(child, childIndex))}
            </h6>
          )
        default:
          return (
            <h2 key={index}>
              {node.children?.map((child, childIndex) => renderNode(child, childIndex))}
            </h2>
          )
      }
    }

    // Handle list nodes
    if (node.type === 'list') {
      const listType = (node as any).listType || 'unordered'

      if (listType === 'ordered') {
        return (
          <ol key={index}>
            {node.children?.map((child, childIndex) => renderNode(child, childIndex))}
          </ol>
        )
      }

      return (
        <ul key={index}>
          {node.children?.map((child, childIndex) => renderNode(child, childIndex))}
        </ul>
      )
    }

    // Handle list item nodes
    if (node.type === 'listitem') {
      return (
        <li key={index}>
          {node.children?.map((child, childIndex) => renderNode(child, childIndex))}
        </li>
      )
    }

    // Handle link nodes
    if (node.type === 'link') {
      const url = (node as any).url || '#'
      const target = (node as any).newTab ? '_blank' : undefined
      const rel = target === '_blank' ? 'noopener noreferrer' : undefined

      return (
        <a key={index} href={url} target={target} rel={rel}>
          {node.children?.map((child, childIndex) => renderNode(child, childIndex))}
        </a>
      )
    }

    // Handle quote nodes
    if (node.type === 'quote') {
      return (
        <blockquote key={index}>
          {node.children?.map((child, childIndex) => renderNode(child, childIndex))}
        </blockquote>
      )
    }

    // Handle horizontal rule
    if (node.type === 'horizontalrule') {
      return <hr key={index} />
    }

    // Handle upload/media nodes
    if (node.type === 'upload') {
      const { value, relationTo } = node as any
      if (value && typeof value === 'object' && 'url' in value) {
        const { url, alt, caption } = value
        if (url) {
          return (
            <figure key={index} className="rich-text-media">
              <img src={url} alt={alt || ''} />
              {caption && <figcaption>{caption}</figcaption>}
            </figure>
          )
        }
      }
      return null
    }

    // Fallback for any other node types with children
    if (node.children && node.children.length > 0) {
      return (
        <React.Fragment key={index}>
          {node.children.map((child, childIndex) => renderNode(child, childIndex))}
        </React.Fragment>
      )
    }

    // Return null for unhandled node types
    return null
  }

  // Map through top-level children
  return (
    <div className={`rich-text ${className}`}>
      {richText.root.children.map((node, index) => renderNode(node, index))}
    </div>
  )
}

export default RichText
