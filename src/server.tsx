import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { createOvermindSSR } from 'overmind';
import { Provider as OvermindProvider } from 'overmind-react';

import App from './App';
import { config as overmindConfig } from './overmind';

let assets: any;

const syncLoadAssets = () => {
  assets = require(process.env.RAZZLE_ASSETS_MANIFEST!);
};
syncLoadAssets();

const server = express()
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR!))
  .get('/*', (req: express.Request, res: express.Response) => {
    const overmind = createOvermindSSR(overmindConfig);

    try {
      overmind.actions.setServerMessage('set on the server!');
    } catch (e) {
      console.log('Could not setServerMessage!');
      console.error(e);
    }

    const context = {};

    const markup = renderToString(
      <StaticRouter context={context} location={req.url}>
        <OvermindProvider value={overmind}>
          <App />
        </OvermindProvider>
      </StaticRouter>
    );

    // Send overmind data down to the client
    const overmindMarkup = `window.__OVERMIND_MUTATIONS = ${JSON.stringify(overmind.hydrate())}`;

    res.send(
      `<!doctype html>
    <html lang="">
    <head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta charSet='utf-8' />
        <title>Razzle TypeScript</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        ${
          assets.client.css
            ? `<link rel="stylesheet" href="${assets.client.css}">`
            : ''
        }
          ${
            process.env.NODE_ENV === 'production'
              ? `<script src="${assets.client.js}" defer></script>`
              : `<script src="${assets.client.js}" defer crossorigin></script>`
          }
    </head>
    <body>
        <div id="root">${markup}</div>
        <script>${overmindMarkup}</script>
    </body>
</html>`
    );
  });

export default server;
