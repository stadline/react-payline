type PaylineApi = {
  endToken: (additionnalData: any, callback: Function, spinner: any, handledByMerchant: boolean) => void;
  finalizeShortCut: Function;
  getBuyerShortCut: Function;
  getCancelAndReturnUrls: Function;
  getContextInfo: (key: string) => any;
  getCssIframeWhiteList: Function;
  getFragmentedPaymentInfo: Function;
  getLanguage: Function;
  getOrderInfos: Function;
  getRecurringDetails: Function;
  getToken: Function;
  getTokenStatus: (token: string, callback: (tokenStatus: 'ALIVE' | 'EXPIRED' | 'UNKNOWN') => void) => void;
  hide: Function;
  init: Function;
  isSandBox: Function;
  reset: (token?: string, template?: string) => void;
  show: () => void;
  toggle: () => void;
  updateWebpaymentData: (token: string, data: any) => void;
};

declare global {
  interface Window {
    Payline?: { Api: PaylineApi };
  }
}

const usePayline = () => {
  if (typeof window === 'undefined') return undefined;

  if (!window.Payline)
    throw new Error('window.Payline is unavailable. Check if PaylineProvider is rendered within the component tree.');
  return window.Payline.Api;
};

export default usePayline;
