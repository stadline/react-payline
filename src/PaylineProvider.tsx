import React, { useLayoutEffect, useState } from 'react';

type PropsType = {
  production?: boolean;
};

export const PaylineHead: React.ComponentType<PropsType> = ({ production = false }) => {
  const baseUrl = production ? 'https://payment.cdn.payline.com/cdn' : 'https://homologation-payment.cdn.payline.com/cdn';

  return (
    <>
      <script src={`${baseUrl}/scripts/widget-min.js`} />
      <link href={`${baseUrl}/styles/widget-min.css`} rel="stylesheet" />
    </>
  );
};

const PaylineProvider: React.ComponentType<PropsType> = ({ production = false, children }) => {
  const baseUrl = production ? 'https://payment.cdn.payline.com/cdn' : 'https://homologation-payment.cdn.payline.com/cdn';

  // add script
  const scriptUrl = `${baseUrl}/scripts/widget-min.js`;
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
  const stylesheetUrl = `${baseUrl}/styles/widget-min.css`;
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
