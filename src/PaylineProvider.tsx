import React, { createContext } from 'react';
import { Helmet } from 'react-helmet';

export const PaylineContext = createContext<boolean>(false);

type PropsType = {
  production?: boolean;
};

const PaylineProvider: React.ComponentType<PropsType> = ({ production = false, children }) => {
  const baseUrl = production ? 'https://payment.payline.com' : 'https://homologation-payment.payline.com';
  return (
    <PaylineContext.Provider value>
      <Helmet>
        <script src={`${baseUrl}/scripts/widget-min.js`} />
        <link href={`${baseUrl}/styles/widget-min.css`} rel="stylesheet" />
      </Helmet>
      {children}
    </PaylineContext.Provider>
  );
};

export default PaylineProvider;
