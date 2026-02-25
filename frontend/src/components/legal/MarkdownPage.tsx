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
              className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-4 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          )}

          {title && (
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {title}
            </h1>
          )}

          {(effectiveDate || lastUpdated) && (
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
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
                <h1 className="text-3xl font-bold text-gray-900 mt-8 mb-4 first:mt-0">
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4 border-b border-gray-200 pb-2">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                  {children}
                </h3>
              ),
              h4: ({ children }) => (
                <h4 className="text-lg font-semibold text-gray-900 mt-4 mb-2">
                  {children}
                </h4>
              ),

              // Paragraphs
              p: ({ children }) => (
                <p className="text-gray-700 leading-relaxed mb-4">{children}</p>
              ),

              // Lists
              ul: ({ children }) => (
                <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
                  {children}
                </ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal pl-6 mb-4 space-y-2 text-gray-700">
                  {children}
                </ol>
              ),
              li: ({ children }) => (
                <li className="text-gray-700 leading-relaxed">{children}</li>
              ),

              // Links
              a: ({ href, children }) => (
                <a
                  href={href}
                  className="text-blue-600 hover:text-blue-800 underline"
                  target={href?.startsWith('http') ? '_blank' : undefined}
                  rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                >
                  {children}
                </a>
              ),

              // Strong/Bold
              strong: ({ children }) => (
                <strong className="font-semibold text-gray-900">{children}</strong>
              ),

              // Emphasis/Italic
              em: ({ children }) => (
                <em className="italic text-gray-700">{children}</em>
              ),

              // Blockquotes
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-blue-500 pl-4 py-2 my-4 italic text-gray-700 bg-blue-50/50">
                  {children}
                </blockquote>
              ),

              // Code
              code: ({ children, className }) => {
                const isInline = !className;
                if (isInline) {
                  return (
                    <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono text-gray-800">
                      {children}
                    </code>
                  );
                }
                return (
                  <code className="block bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm font-mono my-4">
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
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  {children}
                </th>
              ),
              td: ({ children }) => (
                <td className="px-4 py-3 text-sm text-gray-700">{children}</td>
              ),
            }}
          >
            {content}
          </ReactMarkdown>
        </div>

        {/* Print-friendly footer - documentUrl passed from server to avoid hydration mismatch */}
        {documentUrl && (
          <div className="mt-12 pt-8 border-t border-gray-200 print:block">
            <p className="text-sm text-gray-600">
              This document is available online at{' '}
              <span className="font-mono">{documentUrl}</span>
            </p>
          </div>
        )}
      </div>
    </article>
  );
}
