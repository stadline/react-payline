import React, { PropsWithChildren } from 'react';
import PaylineProvider from './PaylineProvider';

const withPayline = (production: boolean) => <TProps,>(WrappedComponent: React.ComponentType<TProps>) => (props: PropsWithChildren<TProps>) => (
  <PaylineProvider production={production}>
    <WrappedComponent {...props} />
  </PaylineProvider>
);

export default withPayline;
