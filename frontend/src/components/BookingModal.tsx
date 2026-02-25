'use client';

import { useEffect, useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { bookingProvider } from '@/lib/booking';
import { Loader2 } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/constants';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * BookingModal Component
 *
 * Renders Calendly booking widget inside a Sheet (side drawer) modal.
 * Loads the Calendly script on-demand when the modal opens (not globally).
 *
 * @param isOpen - Controls modal visibility
 * @param onClose - Callback when modal closes
 */
export function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const scriptSrc = bookingProvider.getEmbedScript();

    const loadScriptAndInit = () => {
      // If Calendly is already loaded, initialize directly
      if ((window as any).Calendly) {
        initWidget();
        return;
      }

      // Check if script tag already exists (from a previous open)
      if (document.querySelector(`script[src="${scriptSrc}"]`)) {
        // Script exists but hasn't loaded yet — poll for it
        pollForCalendly();
        return;
      }

      // Inject the script on-demand
      const script = document.createElement('script');
      script.src = scriptSrc;
      script.async = true;
      script.onload = () => initWidget();
      script.onerror = () => {
        setError('Unable to load booking calendar. Please try again.');
        setIsLoading(false);
      };
      document.head.appendChild(script);
    };

    let retries = 0;
    const maxRetries = 10;

    const pollForCalendly = () => {
      if ((window as any).Calendly) {
        initWidget();
        return;
      }
      if (retries < maxRetries) {
        retries++;
        setTimeout(pollForCalendly, 500);
      } else {
        setError('Unable to load booking calendar. Please try again.');
        setIsLoading(false);
      }
    };

    const initWidget = () => {
      try {
        const container = document.getElementById('calendly-embed-container');
        if (!container) return;

        (window as any).Calendly.initInlineWidget({
          url: bookingProvider.getEmbedUrl(),
          parentElement: container,
          prefill: {},
          utm: {
            utmSource: SITE_CONFIG.sld,
            utmMedium: 'website',
            utmCampaign: 'contact',
          },
        });

        setIsLoading(false);

        if (typeof window !== 'undefined' && (window as any).dataLayer) {
          (window as any).dataLayer.push({
            event: 'booking_modal_opened',
            source: 'contact',
          });
        }
      } catch (err) {
        console.error('Calendly initialization error:', err);
        setError('Unable to load booking calendar. Please try again.');
        setIsLoading(false);
      }
    };

    // Delay to ensure DOM is ready
    const timeout = setTimeout(loadScriptAndInit, 100);

    return () => {
      clearTimeout(timeout);
      setIsLoading(true);
      setError(null);
    };
  }, [isOpen]);

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-[700px] p-0 flex flex-col"
      >
        <SheetHeader className="px-6 py-4 border-b flex-shrink-0">
          <SheetTitle className="text-2xl font-bold bg-gradient-to-r from-[#1877F2] to-[#0D5DBF] bg-clip-text text-transparent">
            Schedule Your Discovery Call
          </SheetTitle>
          <SheetDescription className="text-gray-600">
            Select a time that works best for you. We'll discuss your project goals and how we can help.
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-hidden">
          {isLoading && !error && (
            <div className="flex flex-col items-center justify-center h-full gap-4">
              <Loader2 className="w-12 h-12 animate-spin text-[#1877F2]" />
              <p className="text-gray-600">Loading availability...</p>
            </div>
          )}

          {error && (
            <div className="flex flex-col items-center justify-center h-full gap-4 p-8">
              <div className="max-w-md bg-red-50 rounded-lg p-6 text-center">
                <p className="text-red-600 mb-4">{error}</p>
                <a
                  href={bookingProvider.getEmbedUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-3 bg-[#1877F2] text-white rounded-full font-semibold hover:bg-[#0D5DBF] transition-colors"
                >
                  Open Calendly in New Tab
                </a>
              </div>
            </div>
          )}

          <div
            id="calendly-embed-container"
            className={`h-full w-full ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
