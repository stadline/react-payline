import React, { ReactNode, useLayoutEffect, useState } from 'react';
import PaylineContext from './PaylineContext';

const getBaseUrl = (production: boolean) =>
  production ? 'https://payment.cdn.payline.com/cdn' : 'https://homologation-payment.cdn.payline.com/cdn'
const getScriptUrl = (production: boolean) => `${getBaseUrl(production)}/scripts/widget-min.js`;
const getStylesheetUrl = (production: boolean) => `${getBaseUrl(production)}/styles/widget-min.css`;

interface PaylineHeadProps {
  production?: boolean;
}

export function PaylineHead({ production = false }: PaylineHeadProps) {
  return (
    <>
      <script src={getScriptUrl(production)} />
      <link href={getStylesheetUrl(production)} rel="stylesheet" />
    </>
  );
}

interface PaylineProviderProps {
  production?: boolean;
  children?: ReactNode;
}

function PaylineProvider({ production = false, children }: PaylineProviderProps) {
  // add script
  const scriptUrl = getScriptUrl(production);
  const [isLoaded, setIsLoaded] = useState(window.Payline !== undefined);

  useLayoutEffect(() => {
    let script: HTMLScriptElement | null = document.querySelector(`script[src="${scriptUrl}"]`);
    if (!script) {
      script = document.createElement('script');
      script.src = scriptUrl;
      document.head.appendChild(script);
    }

    const onLoad = () => setIsLoaded(true);

    script.addEventListener('load', onLoad, false);
    return () => {
      if (script) script.removeEventListener('load', onLoad, false);
    };
  }, [scriptUrl]);

  // add stylesheet
  const stylesheetUrl = getStylesheetUrl(production);
  useLayoutEffect(() => {
    let stylesheet: HTMLLinkElement | null = document.querySelector(`link[href="${stylesheetUrl}"]`);
    if (!stylesheet) {
      stylesheet = document.createElement('link');
      stylesheet.href = stylesheetUrl;
      stylesheet.rel = 'stylesheet';
      document.head.appendChild(stylesheet);
    }
  }, [stylesheetUrl]);

  // render children
  return <PaylineContext.Provider value={{isLoaded}}>{children}</PaylineContext.Provider>;
};

export default PaylineProvider;
