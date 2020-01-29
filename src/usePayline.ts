import { useContext } from 'react';
import { PaylineContext } from './PaylineProvider';

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

const usePayline = () => {
  const payline = useContext(PaylineContext);
  if (!payline) throw new Error('PaylineProvider is not rendered within the component tree.');

  return (window as any).Payline.Api as PaylineApi;
};

export default usePayline;
