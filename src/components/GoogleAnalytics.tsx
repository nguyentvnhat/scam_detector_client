import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Google Analytics Measurement ID from environment variable
const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

// Type definitions for Google Analytics
type GtagCommand = 'js' | 'config' | 'event' | 'set';
type GtagConfigParams = {
  page_path?: string;
  page_title?: string;
  [key: string]: string | number | boolean | undefined;
};
type GtagEventParams = {
  event_category?: string;
  event_label?: string;
  value?: number;
  [key: string]: string | number | boolean | undefined;
};

// Extend Window interface for TypeScript
declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (
      command: GtagCommand,
      targetId: string | Date,
      config?: GtagConfigParams | GtagEventParams
    ) => void;
  }
}

// Initialize Google Analytics
const initGoogleAnalytics = () => {
  if (!GA_MEASUREMENT_ID || typeof window === 'undefined') {
    return;
  }

  // Check if already initialized
  if (typeof window.gtag === 'function') {
    return;
  }

  // Load Google Analytics script
  const script1 = document.createElement('script');
  script1.async = true;
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script1);

  // Initialize gtag
  window.dataLayer = window.dataLayer || [];
  const gtag = (
    command: GtagCommand,
    targetId: string | Date,
    config?: GtagConfigParams | GtagEventParams
  ) => {
    window.dataLayer.push({ command, targetId, config });
  };
  window.gtag = gtag;

  gtag('js', new Date());
  gtag('config', GA_MEASUREMENT_ID, {
    page_path: window.location.pathname,
  });
};

// Track page views on route changes
export const GoogleAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    // Initialize GA on mount
    initGoogleAnalytics();

    // Track page view on route change
    if (GA_MEASUREMENT_ID && typeof window.gtag === 'function') {
      window.gtag('config', GA_MEASUREMENT_ID, {
        page_path: location.pathname + location.search,
      });
    }
  }, [location]);

  return null;
};

// Helper function to track custom events
export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number
) => {
  if (GA_MEASUREMENT_ID && typeof window.gtag === 'function') {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

