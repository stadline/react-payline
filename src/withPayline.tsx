import React from 'react';
import PaylineProvider from './PaylineProvider';

const withPayline = (production: boolean) => (WrappedComponent: React.ComponentType) => (props: any) => (
  <PaylineProvider production={production}>
    <WrappedComponent {...props} />
  </PaylineProvider>
);

export default withPayline;
