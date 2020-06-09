import React from 'react';
import { Helmet } from 'react-helmet';

type PropsType = {
  production?: boolean;
};

export const PaylineHead: React.ComponentType<PropsType> = ({ production = false }) => {
  const baseUrl = production ? 'https://payment.payline.com' : 'https://homologation-payment.payline.com';
  return (
    <>
      <script src={`${baseUrl}/scripts/widget-min.js`} />
      <link href={`${baseUrl}/styles/widget-min.css`} rel="stylesheet" />
    </>
  );
};

const PaylineProvider: React.ComponentType<PropsType> = ({ production = false, children }) => {
  return (
    <>
      <Helmet>
        <PaylineHead production={production} />
      </Helmet>
      {children}
    </>
  );
};

export default PaylineProvider;
