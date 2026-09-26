'use client';

import ReactMarkdown from 'react-markdown';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface MarkdownPageProps {
  content: string;
  title?: string;
  lastUpdated?: string;
  effectiveDate?: string;
  showBackButton?: boolean;
  /** Canonical URL for "available online at" footer. Pass from server to avoid hydration mismatch. */
  documentUrl?: string;
}

export function MarkdownPage({
  content,
  title,
  lastUpdated,
  effectiveDate,
  showBackButton = true,
  documentUrl,
}: MarkdownPageProps) {
  return (
    <article className="min-h-screen bg-white">
      {/* Header with breadcrumb */}
      <div className="bg-gradient-to-br from-slate-50 to-blue-50/30 py-8 border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {showBackButton && (
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-meta text-ink-body hover:text-ink mb-4 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          )}

          {title && (
            <h1 className="text-h1 text-ink mb-4">
              {title}
            </h1>
          )}

          {(effectiveDate || lastUpdated) && (
            <div className="flex flex-wrap gap-4 text-meta text-ink-body">
              {effectiveDate && (
                <div>
                  <span className="font-semibold">Effective Date:</span> {effectiveDate}
                </div>
              )}
              {lastUpdated && (
                <div>
                  <span className="font-semibold">Last Updated:</span> {lastUpdated}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg prose-slate max-w-none">
          <ReactMarkdown
            components={{
              // Headings
              h1: ({ children }) => (
                <h1 className="text-h2 text-ink mt-8 mb-4 first:mt-0">
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-h3 text-ink mt-8 mb-4 border-b border-gray-200 pb-2">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-h4 text-ink mt-6 mb-3">
                  {children}
                </h3>
              ),
              h4: ({ children }) => (
                <h4 className="text-body text-ink mt-4 mb-2">
                  {children}
                </h4>
              ),

              // Paragraphs
              p: ({ children }) => (
                <p className="text-body text-ink-body mb-4">{children}</p>
              ),

              // Lists
              ul: ({ children }) => (
                <ul className="list-disc pl-6 mb-4 space-y-2 text-ink-body">
                  {children}
                </ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal pl-6 mb-4 space-y-2 text-ink-body">
                  {children}
                </ol>
              ),
              li: ({ children }) => (
                <li className="text-body text-ink-body">{children}</li>
              ),

              // Links
              a: ({ href, children }) => (
                <a
                  href={href}
                  className="text-ink-accent hover:text-ink underline"
                  target={href?.startsWith('http') ? '_blank' : undefined}
                  rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                >
                  {children}
                </a>
              ),

              // Strong/Bold
              strong: ({ children }) => (
                <strong className="font-semibold text-ink">{children}</strong>
              ),

              // Emphasis/Italic
              em: ({ children }) => (
                <em className="italic text-ink-body">{children}</em>
              ),

              // Blockquotes
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-blue-500 pl-4 py-2 my-4 italic text-ink-body bg-blue-50/50">
                  {children}
                </blockquote>
              ),

              // Code
              code: ({ children, className }) => {
                const isInline = !className;
                if (isInline) {
                  return (
                    <code className="bg-gray-100 px-1.5 py-0.5 rounded text-meta font-mono text-ink">
                      {children}
                    </code>
                  );
                }
                return (
                  <code className="block bg-brand-navy text-white p-4 rounded-lg overflow-x-auto text-meta font-mono my-4">
                    {children}
                  </code>
                );
              },

              // Horizontal rule
              hr: () => <hr className="my-8 border-t border-gray-200" />,

              // Tables
              table: ({ children }) => (
                <div className="overflow-x-auto my-6">
                  <table className="min-w-full divide-y divide-gray-200 border border-gray-200">
                    {children}
                  </table>
                </div>
              ),
              thead: ({ children }) => (
                <thead className="bg-gray-50">{children}</thead>
              ),
              tbody: ({ children }) => (
                <tbody className="bg-white divide-y divide-gray-200">
                  {children}
                </tbody>
              ),
              tr: ({ children }) => <tr>{children}</tr>,
              th: ({ children }) => (
                <th className="px-4 py-3 text-left text-meta font-semibold text-ink-body uppercase tracking-wider">
                  {children}
                </th>
              ),
              td: ({ children }) => (
                <td className="px-4 py-3 text-body text-ink-body">{children}</td>
              ),
            }}
          >
            {content}
          </ReactMarkdown>
        </div>

        {/* Print-friendly footer - documentUrl passed from server to avoid hydration mismatch */}
        {documentUrl && (
          <div className="mt-12 pt-8 border-t border-gray-200 print:block">
            <p className="text-meta text-ink-body">
              This document is available online at{' '}
              <span className="font-mono break-all">{documentUrl}</span>
            </p>
          </div>
        )}
      </div>
    </article>
  );
}
