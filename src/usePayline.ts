import { useEffect } from "react";

// See https://docs.payline.com/display/DT/API+JavaScript for full documentation of Payline API
type PaylineApi = {
  endToken: (
    additionnalData: any,
    callback: () => void,
    spinner: any,
    handledByMerchant: boolean
  ) => void;
  finalizeShortCut: () => void;
  getBuyerShortCut: () => Record<string, unknown>;
  getCancelAndReturnUrls: () => { returnUrl: string; cancelUrl: string };
  getContextInfo: (key: string) => Record<string, unknown>;
  getCssIframeWhiteList: () => string[];
  getFragmentedPaymentInfo: () => Record<string, unknown>;
  getLanguage: () => string;
  getOrderInfos: () => Record<string, unknown>;
  getRecurringDetails: () => Record<string, unknown>;
  getToken: () => string;
  getTokenStatus: (
    token: string,
    callback: (tokenStatus: 'ALIVE' | 'EXPIRED' | 'UNKNOWN') => void
  ) => void;
  hide: () => void;
  init: () => void;
  isSandBox: () => boolean;
  reset: (token?: string, template?: string) => void;
  show: () => void;
  toggle: () => void;
  updateWebpaymentData: (token: string, data: any) => void;
};

declare global {
  interface Window {
    Payline?: { Api: PaylineApi; jQuery: JQuery };
  }
}

const usePayline = () => {
  if (typeof window === 'undefined') return undefined;

  useEffect(() => {
    if (!window.Payline && !document.querySelector('script[src$="payline.com/cdn/scripts/widget-min.js"]'))
      throw new Error(
        "window.Payline is unavailable. Check if PaylineProvider is rendered within the component tree."
      );
  }, []);

  return window.Payline;
};

export const usePaylineApi = () => usePayline()?.Api;
export const usePaylineJQuery = () => usePayline()?.jQuery;
