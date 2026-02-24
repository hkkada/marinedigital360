/**
 * Booking Provider Abstraction Layer
 *
 * This module provides a unified interface for booking/scheduling integrations.
 * Currently uses Cal.com; can be easily migrated to Calendly, SavvyCal, etc.
 *
 * IMPORTANT: Never import Cal.com or other booking SDKs directly in components.
 * Always use bookingProvider from this module.
 * Brand username fallback reads from SITE_CONFIG.sld — update constants.ts to change it.
 *
 * Pattern follows content.ts (CMS abstraction) and email.ts (email abstraction) -
 * enables provider swapping without touching business logic.
 */

import { SITE_CONFIG } from '@/lib/constants';

/**
 * Booking Provider Configuration
 */
export interface BookingConfig {
  username: string;
  defaultEventType: string;
  theme: 'light' | 'dark' | 'auto';
  brandColor: string;
  embedType: 'inline' | 'popup' | 'floating-popup';
}

/**
 * Booking Event Data (for analytics tracking)
 */
export interface BookingEventData {
  eventType: string;
  date?: string;
  time?: string;
  attendeeEmail?: string;
}

/**
 * Booking Provider Interface
 * All booking providers must implement this interface
 */
export interface BookingProvider {
  /**
   * Get booking configuration
   */
  getConfig(): BookingConfig;

  /**
   * Get embed URL for the booking widget
   */
  getEmbedUrl(eventType?: string): string;

  /**
   * Get embed script for initializing the booking widget
   */
  getEmbedScript(): string;

  /**
   * Get inline embed configuration
   */
  getInlineEmbedConfig(): Record<string, any>;

  /**
   * Track booking event (for analytics)
   */
  trackBooking?(eventData: BookingEventData): Promise<void>;
}

/**
 * Calendly Booking Provider Implementation (Example)
 * Uncomment and implement when switching to Calendly
 */
class CalendlyBookingProvider implements BookingProvider {
  private config: BookingConfig;

  constructor(config: Partial<BookingConfig> = {}) {
    this.config = {
      username: config.username || process.env.NEXT_PUBLIC_CALENDLY_USERNAME || SITE_CONFIG.sld,
      defaultEventType: config.defaultEventType || 'discovery-call',
      theme: config.theme || 'light',
      brandColor: config.brandColor || '#2563eb',
      embedType: config.embedType || 'inline',
    };
  }

  getConfig(): BookingConfig {
    return { ...this.config };
  }

  getEmbedUrl(eventType?: string): string {
    return `https://calendly.com/${this.config.username}/${eventType || this.config.defaultEventType}`;
  }

  getEmbedScript(): string {
    return `https://assets.calendly.com/assets/external/widget.js`;
  }

  getInlineEmbedConfig(): Record<string, any> {
    return {
      url: this.getEmbedUrl(),
      text_color: '#ffffff',
      color: this.config.brandColor,
    };
  }

  async trackBooking(eventData: BookingEventData): Promise<void> {
    console.log('[Booking] Calendly booking tracked:', eventData);
  }
}

/**
 * Factory function to get the configured booking provider
 * Switch providers by changing BOOKING_PROVIDER environment variable
 */
function getBookingProvider(): BookingProvider {
  const provider = process.env.BOOKING_PROVIDER || 'calendly';

  switch (provider.toLowerCase()) {
    case 'calendly':
        return new CalendlyBookingProvider();

    default:
      console.warn(`[Booking] Unknown provider "${provider}", defaulting to Calendly`);
      return new CalendlyBookingProvider();
  }
}

/**
 * Singleton booking provider instance
 * Import and use this in components that need booking functionality
 *
 * Example usage:
 * ```
 * import { bookingProvider } from '@/lib/booking';
 * const config = bookingProvider.getConfig();
 * const embedUrl = bookingProvider.getEmbedUrl();
 * ```
 */
export const bookingProvider = getBookingProvider();

/**
 * Client-side Cal.com initialization helper
 * Use this in useEffect to initialize Cal.com embed
 *
 * IMPORTANT: Only call this after confirming Cal is defined
 */
export function initializeCalCom(config: BookingConfig): void {
  if (typeof window === 'undefined') return;

  const Cal = (window as any).Cal;
  if (!Cal) {
    console.error('[Booking] Cal not defined - should not happen');
    return;
  }

  try {
    // Set UI preferences
    Cal('ui', {
      theme: config.theme,
      styles: {
        branding: {
          brandColor: config.brandColor,
        },
      },
      hideEventTypeDetails: false,
    });

    // Render the calendar inline in the specified element
    const embedUrl = `${config.username}/${config.defaultEventType}`;

    Cal('inline', {
      elementOrSelector: '#cal-booking-embed',
      calLink: embedUrl,
      layout: 'month_view',
    });

    console.log('[Booking] ✅ Cal.com calendar rendered for:', embedUrl);
  } catch (error) {
    console.error('[Booking] ❌ Failed to initialize Cal.com:', error);
  }
}
