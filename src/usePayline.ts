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
  show: Function;
  toggle: Function;
  updateWebpaymentData: (token: string, data: any) => void;
};

type WindowType = {
  Payline?: {
    Api: PaylineApi;
  }
}

const usePayline = () => {
  const Payline = (window as WindowType).Payline;
  if (!Payline) throw new Error('PaylineProvider is not rendered within the component tree.');

  return Payline.Api;
};

export default usePayline;
