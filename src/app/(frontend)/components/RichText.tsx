import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { PayloadRichText, RichTextNode } from './richTextUtils'

interface RichTextProps {
  content: PayloadRichText | string
  className?: string
}

// Lexical text format bitmask (see lexical's TEXT_TYPE_TO_FORMAT)
const FORMAT_BOLD = 1
const FORMAT_ITALIC = 2
const FORMAT_STRIKETHROUGH = 4
const FORMAT_UNDERLINE = 8
const FORMAT_CODE = 16
const FORMAT_SUBSCRIPT = 32
const FORMAT_SUPERSCRIPT = 64

// Where internal document links resolve on the frontend
const INTERNAL_LINK_PREFIXES: Record<string, string> = {
  posts: '/posts',
  projects: '/projects',
  consulting: '/consulting',
}

interface LinkFields {
  linkType?: 'custom' | 'internal'
  url?: string
  newTab?: boolean
  doc?: {
    relationTo?: string
    value?: number | { slug?: string | null }
  } | null
}

interface UploadValue {
  url?: string | null
  alt?: string | null
  width?: number | null
  height?: number | null
}

const resolveLinkHref = (fields: LinkFields | undefined): string | null => {
  if (!fields) return null
  if (fields.linkType === 'internal' && fields.doc) {
    const prefix = INTERNAL_LINK_PREFIXES[fields.doc.relationTo || '']
    const value = fields.doc.value
    if (prefix && value && typeof value === 'object' && value.slug) {
      return `${prefix}/${value.slug}`
    }
    return null
  }
  return fields.url || null
}

// Block-level alignment set by Lexical's AlignFeature (element `format` is a string)
const blockStyle = (node: RichTextNode): React.CSSProperties | undefined => {
  const format = (node as { format?: unknown }).format
  if (format === 'center' || format === 'right' || format === 'justify') {
    return { textAlign: format }
  }
  return undefined
}

export const RichText: React.FC<RichTextProps> = ({ content, className = '' }) => {
  if (!content) return null

  // If content is a string, render it as a paragraph
  if (typeof content === 'string') {
    return <p className={className}>{content}</p>
  }

  const richText = content as PayloadRichText
  if (!richText.root || !richText.root.children) return null

  const renderChildren = (node: RichTextNode) =>
    node.children?.map((child, childIndex) => renderNode(child, childIndex))

  // Render a node based on its type
  const renderNode = (node: RichTextNode, index: number): React.ReactNode => {
    // Line breaks (Shift+Enter) carry no text or children
    if (node.type === 'linebreak') {
      return <br key={index} />
    }

    // Handle text nodes (tab nodes are text nodes carrying "\t")
    if (node.text !== undefined && (node.type === 'text' || node.type === 'tab')) {
      const format = typeof node.format === 'number' ? node.format : 0

      let textNode: React.ReactNode = node.text

      if (format & FORMAT_CODE) textNode = <code>{textNode}</code>
      if (format & FORMAT_SUBSCRIPT) textNode = <sub>{textNode}</sub>
      if (format & FORMAT_SUPERSCRIPT) textNode = <sup>{textNode}</sup>
      if (format & FORMAT_STRIKETHROUGH) textNode = <s>{textNode}</s>
      if (format & FORMAT_UNDERLINE) textNode = <u>{textNode}</u>
      if (format & FORMAT_ITALIC) textNode = <em>{textNode}</em>
      if (format & FORMAT_BOLD) textNode = <strong>{textNode}</strong>

      return <React.Fragment key={index}>{textNode}</React.Fragment>
    }

    // Handle paragraph nodes
    if (node.type === 'paragraph') {
      return (
        <p
          key={index}
          style={blockStyle(node)}
          className={className ? `rich-text-paragraph ${className}` : 'rich-text-paragraph'}
        >
          {renderChildren(node)}
        </p>
      )
    }

    // Handle heading nodes. CMS h1s render as h2 so pages keep a single h1.
    if (node.type === 'heading') {
      const tag = (node as { tag?: string }).tag || 'h2'
      const Tag = (tag === 'h1' ? 'h2' : tag) as 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
      return (
        <Tag key={index} style={blockStyle(node)}>
          {renderChildren(node)}
        </Tag>
      )
    }

    // Handle list nodes. Lexical listType is 'number' | 'bullet' | 'check'.
    if (node.type === 'list') {
      const listType = (node as { listType?: string }).listType
      if (listType === 'number') {
        return <ol key={index}>{renderChildren(node)}</ol>
      }
      return (
        <ul key={index} className={listType === 'check' ? 'rich-text-checklist' : undefined}>
          {renderChildren(node)}
        </ul>
      )
    }

    // Handle list item nodes (checklist items carry a `checked` boolean)
    if (node.type === 'listitem') {
      const checked = (node as { checked?: boolean }).checked
      if (typeof checked === 'boolean') {
        return (
          <li key={index} className="rich-text-checklist-item">
            <input type="checkbox" checked={checked} disabled aria-hidden="true" tabIndex={-1} />{' '}
            {renderChildren(node)}
          </li>
        )
      }
      return <li key={index}>{renderChildren(node)}</li>
    }

    // Handle link and autolink nodes. Payload stores link data under `fields`.
    if (node.type === 'link' || node.type === 'autolink') {
      const fields = (node as { fields?: LinkFields }).fields
      const href = resolveLinkHref(fields)

      if (!href) {
        // Unresolvable (e.g. unpopulated internal doc) — keep the text, drop the anchor
        return <React.Fragment key={index}>{renderChildren(node)}</React.Fragment>
      }

      const newTab = Boolean(fields?.newTab)
      const isInternal = href.startsWith('/')

      if (isInternal && !newTab) {
        return (
          <Link key={index} href={href}>
            {renderChildren(node)}
          </Link>
        )
      }

      return (
        <a
          key={index}
          href={href}
          target={newTab ? '_blank' : undefined}
          rel={newTab ? 'noopener noreferrer' : undefined}
        >
          {renderChildren(node)}
        </a>
      )
    }

    // Handle quote nodes
    if (node.type === 'quote') {
      return <blockquote key={index}>{renderChildren(node)}</blockquote>
    }

    // Handle horizontal rule
    if (node.type === 'horizontalrule') {
      return <hr key={index} />
    }

    // Handle upload/media nodes
    if (node.type === 'upload') {
      const value = (node as { value?: UploadValue | number }).value
      if (value && typeof value === 'object' && value.url) {
        return (
          <figure key={index} className="rich-text-media">
            {value.width && value.height ? (
              <Image src={value.url} alt={value.alt || ''} width={value.width} height={value.height} />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={value.url} alt={value.alt || ''} />
            )}
          </figure>
        )
      }
      return null
    }

    // Fallback for any other node types with children
    if (node.children && node.children.length > 0) {
      return <React.Fragment key={index}>{renderChildren(node)}</React.Fragment>
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
