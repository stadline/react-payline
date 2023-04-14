import React, { PropsWithChildren, useLayoutEffect, useState } from 'react';

type PropsType = PropsWithChildren<{
  production?: boolean;
}>;

export const PaylineHead = ({ production = true }: PropsType) => {
  const baseUrl = production ? 'https://payment.payline.com' : 'https://homologation-payment.payline.com';

  return (
    <>
      <script src={`${baseUrl}/scripts/widget-min.js`} />
      <link href={`${baseUrl}/styles/widget-min.css`} rel="stylesheet" />
    </>
  );
};

const PaylineProvider = ({ production = false, children }: PropsType) => {
  const baseUrl = production ? 'https://payment.payline.com' : 'https://homologation-payment.payline.com';

  // add script
  const scriptUrl = `${baseUrl}/scripts/widget-min.js`;
  const [, setIsLoaded] = useState(window.Payline !== undefined);
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
      if (script) script.removeEventListener('load', onLoad, false);
    };
  }, [scriptUrl]);

  // add stylesheet
  const stylesheetUrl = `${baseUrl}/styles/widget-min.css`;
  useLayoutEffect(() => {
    let stylesheet = document.querySelector<HTMLLinkElement>(`link[href="${stylesheetUrl}"]`);
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
