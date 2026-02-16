/**
 * Markdown Utilities
 *
 * Functions for reading and processing markdown files from the public/legal directory.
 */

import fs from 'fs';
import path from 'path';
import {
  SITE_CONFIG,
  CONTACT_EMAIL,
  PRIVACY_EMAIL,
  LEGAL_EMAIL,
  BILLING_EMAIL,
} from './constants';

export interface MarkdownMetadata {
  title?: string;
  lastUpdated?: string;
  effectiveDate?: string;
}

/**
 * Read markdown content from a file in the public/legal directory
 * @param filename - The filename relative to the legal directory (e.g., 'privacy-policy.md')
 * @returns The markdown content as a string
 */
export async function getMarkdownContent(filename: string): Promise<string> {
  try {
    const filePath = path.join(process.cwd(), 'public', 'legal', filename);
    const content = await fs.promises.readFile(filePath, 'utf8');
    return content;
  } catch (error) {
    console.error(`Error reading markdown file: ${filename}`, error);
    throw new Error(`Failed to load content from ${filename}`);
  }
}

/**
 * Extract metadata from markdown content (looks for dates in the first few lines)
 * @param content - The markdown content
 * @returns Metadata object with extracted information
 */
export function extractMarkdownMetadata(content: string): MarkdownMetadata {
  const metadata: MarkdownMetadata = {};

  // Extract title (first H1)
  const titleMatch = content.match(/^#\s+(.+)$/m);
  if (titleMatch) {
    metadata.title = titleMatch[1];
  }

  // Extract effective date
  const effectiveDateMatch = content.match(/\*\*Effective Date:\*\*\s*(.+)/i);
  if (effectiveDateMatch) {
    metadata.effectiveDate = effectiveDateMatch[1].trim();
  }

  // Extract last updated date
  const lastUpdatedMatch = content.match(/\*\*Last Updated:\*\*\s*(.+)/i);
  if (lastUpdatedMatch) {
    metadata.lastUpdated = lastUpdatedMatch[1].trim();
  }

  return metadata;
}

/**
 * Get file modification time
 * @param filename - The filename relative to the legal directory
 * @returns ISO date string of last modification
 */
export async function getFileModificationDate(filename: string): Promise<string> {
  try {
    const filePath = path.join(process.cwd(), 'public', 'legal', filename);
    const stats = await fs.promises.stat(filePath);
    return stats.mtime.toISOString();
  } catch (error) {
    console.error(`Error getting file stats: ${filename}`, error);
    return new Date().toISOString();
  }
}

/**
 * Build template variables map from constants
 */
export function getTemplateVariables(): Record<string, string> {
  return {
    COMPANY_NAME: SITE_CONFIG.company.name,
    LEGAL_NAME: SITE_CONFIG.company.legalName,
    SITE_URL: SITE_CONFIG.url,
    CONTACT_EMAIL,
    PRIVACY_EMAIL,
    LEGAL_EMAIL,
    BILLING_EMAIL,
    PHONE: SITE_CONFIG.company.phone,
    CITY: SITE_CONFIG.company.address.city,
    STATE: SITE_CONFIG.company.address.state,
  };
}

/**
 * Replace {{KEY}} placeholders in markdown content with values from a variables map
 */
export function processMarkdownTemplate(
  content: string,
  variables: Record<string, string>
): string {
  return content.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    return variables[key] ?? match;
  });
}
