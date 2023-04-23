import React, { PropsWithChildren, useLayoutEffect, useState } from 'react';
import PaylineContext from './PaylineContext';

type PropsType = PropsWithChildren<{
  production?: boolean;
}>;

const getBaseUrl = (production: boolean) => production ? 'https://payment.payline.com' : 'https://homologation-payment.cdn.payline.com/cdn'
const getScriptUrl = (production: boolean) => `${getBaseUrl(production)}/scripts/widget-min.js`
const getStylesheetUrl = (production: boolean) => `${getBaseUrl(production)}/styles/widget-min.css`

export const PaylineHead = ({ production = false }: PropsType) => {
  return (
    <>
      <script src={getScriptUrl(production)} />
      <link href={getStylesheetUrl(production)} rel="stylesheet" />
    </>
  );
};

const PaylineProvider = ({ production = false, children }: PropsType) => {
  // add script
  const scriptUrl = getScriptUrl(production);
  const [isLoaded, setIsLoaded] = useState(window.Payline !== undefined);
  useLayoutEffect(() => {
    let script = document.querySelector<HTMLScriptElement>(`script[src="${scriptUrl}"]`);
    if (!script) {
      script = document.createElement('script');
      script.src = scriptUrl;
      document.head.appendChild(script);
    }

    const onLoad = () => setIsLoaded(true);

    script.addEventListener('load', onLoad, false);
    return () => {
      if (script) {
        script.removeEventListener('load', onLoad, false);
        document.head.removeChild(script)
      }
    };
  }, [scriptUrl]);

  // add stylesheet
  const stylesheetUrl = getStylesheetUrl(production);
  useLayoutEffect(() => {
    let stylesheet = document.querySelector<HTMLLinkElement>(`link[href="${stylesheetUrl}"]`);
    if (!stylesheet) {
      stylesheet = document.createElement('link');
      stylesheet.href = stylesheetUrl;
      stylesheet.rel = 'stylesheet';
      document.head.appendChild(stylesheet);
    }

    return () => {
      if (stylesheet) document.head.removeChild(stylesheet)
    }
  }, [stylesheetUrl]);

  // render children
  return <PaylineContext.Provider value={{isLoaded}}>{children}</PaylineContext.Provider>;
};

export default PaylineProvider;
