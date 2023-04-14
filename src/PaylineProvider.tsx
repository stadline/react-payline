import React, { useLayoutEffect, useState } from 'react';

type PropsType = {
  production?: boolean;
};

const getBaseUrl = (production: boolean) => production ? 'https://payment.payline.com' : 'https://homologation-payment.payline.com'
const getScriptUrl = (production: boolean) => `${getBaseUrl(production)}/scripts/widget-min.js`
const getStylesheetUrl = (production: boolean) => `${getBaseUrl(production)}/scripts/widget-min.css`

export const PaylineHead: React.ComponentType<PropsType> = ({ production = false }) => {
  return (
    <>
      <script src={getScriptUrl(production)} />
      <link href={getStylesheetUrl(production)} rel="stylesheet" />
    </>
  );
};

const PaylineProvider: React.ComponentType<PropsType> = ({ production = false, children }) => {
  // add script
  const scriptUrl = getScriptUrl(production);
  const [, setIsLoaded] = useState(window.Payline !== undefined);
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
  return <>{children}</>;
};

export default PaylineProvider;
