import React, { useRef, useEffect } from 'react';
import { usePaylineApi } from './usePayline';

export type StateType =
  | 'ACTIVE_WAITING'
  | 'BROWSER_NOT_SUPPORTED'
  | 'MANAGE_WEB_WALLET'
  | 'PAYMENT_CANCELED_WITH_RETRY'
  | 'PAYMENT_CANCELED'
  | 'PAYMENT_FAILURE_WITH_RETRY'
  | 'PAYMENT_FAILURE'
  | 'PAYMENT_METHOD_NEEDS_MORE_INFOS'
  | 'PAYMENT_METHODS_LIST_SHORTCUT'
  | 'PAYMENT_METHODS_LIST'
  | 'PAYMENT_ONHOLD_PARTNER'
  | 'PAYMENT_REDIRECT_NO_RESPONSE'
  | 'PAYMENT_SUCCESS_FORCE_TICKET_DISPLAY'
  | 'PAYMENT_SUCCESS'
  | 'PAYMENT_TRANSITIONAL_SHORTCUT'
  | 'TOKEN_EXPIRED';

export type WillInitHandler = () => void;
export type WillShowHandler = () => void;
export type FinalStateHasBeenReachedHandler = (data: { state: StateType }) => false | void;
export type DidShowStateHandler = (data: { state: StateType }) => void;
export type WillDisplayMessageHandler = (data: {
  id: string;
  type: 'success' | 'info' | 'error' | 'warn';
  key: string;
  message: string;
}) => boolean | void;
export type WillRemoveMessageHandler = (data: { id: string }) => boolean | void;
export type BeforePaymentHandler = () => boolean | void;

export interface PaylineWidgetProps extends React.HTMLAttributes<HTMLDivElement> {
  token: string;
  template?: string;
  embeddedRedirectionAllowed?: boolean;
  partnerReturnUrl?: string;

  onWillInit?: WillInitHandler;
  onWillShow?: WillShowHandler;
  onFinalStateHasBeenReached?: FinalStateHasBeenReachedHandler;
  onDidShowState?: DidShowStateHandler;
  onWillDisplayMessage?: WillDisplayMessageHandler;
  onWillRemoveMessage?: WillRemoveMessageHandler;
  onBeforePayment?: BeforePaymentHandler;
};

export const PaylineWidget: React.ComponentType<PaylineWidgetProps> = ({
  token,
  template = 'column',
  embeddedRedirectionAllowed = false,
  partnerReturnUrl,
  onWillInit,
  onWillShow,
  onFinalStateHasBeenReached,
  onDidShowState,
  onWillDisplayMessage,
  onWillRemoveMessage,
  onBeforePayment,
  ...htmlAttributes
}) => {
  const eventHandlers = {
    onWillInit,
    onWillShow,
    onFinalStateHasBeenReached,
    onDidShowState,
    onWillDisplayMessage,
    onWillRemoveMessage,
    onBeforePayment,
  };
  const eventHandlersRef = useRef(eventHandlers);
  eventHandlersRef.current = eventHandlers;

  type EventHandlerNames = Array<keyof typeof eventHandlers>;

  useEffect(() => {
    const propNames = Object.keys(eventHandlersRef.current) as EventHandlerNames;

    propNames.forEach((propName) => {
      (window as any)[`Payline_${propName}`] = (...args: any) => {
        const eventHandler = eventHandlersRef.current[propName] as Function | undefined;
        if (eventHandler) {
          return eventHandler(...args);
        }
        return true;
      };
    });

    return () => {
      propNames.forEach((propName) => {
        delete (window as any)[`Payline_${propName}`];
      });
    };
  }, []);

  const payline = usePaylineApi();
  useEffect(() => {
    if (payline) {
      payline.reset();
      return () => payline.hide();
    }
  }, [payline]);

  return (
    <div
      data-token={token}
      data-template={template}
      data-embeddedredirectionallowed={embeddedRedirectionAllowed}
      data-partnerreturnurl={partnerReturnUrl}
      data-event-willinit="Payline_onWillInit"
      data-event-willshow="Payline_onWillShow"
      data-event-finalstatehasbeenreached="Payline_onFinalStateHasBeenReached"
      data-event-didshowstate="Payline_onDidShowState"
      data-event-willdisplaymessage="Payline_onWillDisplayMessage"
      data-event-willremovemessage="Payline_onWillRemoveMessage"
      data-event-beforepayment="Payline_onBeforePayment"
      {...htmlAttributes}
      id="PaylineWidget"
    />
  );
};
