import { Provider as OvermindProvider } from 'overmind-react';
import { createOvermind } from 'overmind';
import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import { config as overmindConfig } from './overmind';

const overmind = createOvermind(overmindConfig);

// @ts-ignore
window.__SL = overmind;

hydrate(
  <BrowserRouter>
    <OvermindProvider value={overmind}>
      <App />
    </OvermindProvider>
  </BrowserRouter>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept();
}
