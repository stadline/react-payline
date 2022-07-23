# react-payline

_This is an unofficial repository_

This package provides a small layer between [Payline](https://docs.payline.com/pages/viewpage.action?pageId=747147012) and your React application. It removes the need of including js and css files, the use of `window.Payline` to access the API and the burden of declaring/removing global functions to use the event handlers.

And if you're a TypeScript user: this package is written in TypeScript and bundles type definitions 😘.

## How to use

**Required:** before using Payline you will need to put the PaylineProvider somewhere high in your component tree. Follow [this guide](#setup)

### PaylineWidget

Integrates the [Payline widget](https://docs.payline.com/pages/viewpage.action?pageId=747145714)

```jsx
import { PaylineWidget } from 'react-payline';

function Payment(props) {
  return (
    <PaylineWidget
      token="the token obtained in doWebPayment Response"
      template="column"
      embeddedRedirectionAllowed={false}
      onFinalStateHasBeenReached={({ state }) => {
        if (state === 'PAYMENT_SUCCESS') {
          props.onSuccess();
          return true;
        }
      }}
    />
  );
}
```

The parameter props follow the documentation, except they are camelCased and don't include the `data-` prefix. You can also use any [callback](https://docs.payline.com/display/DT/PW+-+Personnalisation+du+widget+%3A+Fonction+CallBack) but the naming is also changed, for example: `data-event-didshowstate` will be `onDidShowState`.

If you need more info, please refer to the documentation (FR): https://docs.payline.com/pages/viewpage.action?pageId=747145714

### Payline API

Integrates the [Payline API](https://docs.payline.com/display/DT/API+JavaScript)

```jsx
import { useEffect } from 'react';
import { usePayline } from 'react-payline';
import Payment from './Payment';

function PaymentWrapper(props) {
  const paylineApi = usePayline();
  useEffect(() => {
    if (props.show) {
      paylineApi.show();
    } else {
      paylineApi.hide();
    }
  }, [show]);

  return <Payment onSuccess={() => console.log('celebrate!')} />;
}
```

Every documented functions is available using the hook.

If you need more info, please refer to the documentation (FR): https://docs.payline.com/display/DT/API+JavaScript

## Setup

The package depends on `React >16.8` because it uses hooks and context. There are two ways you can embed the Payline lib

#### Using PaylineProvider

Wrap your application with the PaylineProvider component. If you omit the `production` prop, you will use the "homologation" environment.

```jsx
import { PaylineProvider } from 'react-payline';

ReactDOM.render(
  <PaylineProvider production>
    <App />
  </PaylineProvider>,
  document.getElementById('#root')
);
```

You can also use a HOC to wrap your application. The first argument of the function is the production flag.

```jsx
import { withPayline } from 'react-payline';

const EnhancedApp = withPayline(true)(App);

ReactDOM.render(<EnhancedApp />, document.getElementById('#root'));
```

Under the hood it uses `react-helmet` to add the script and stylesheet to the `document.head`.
