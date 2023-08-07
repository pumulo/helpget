import './index.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';
import App from './App';
import { Helmet } from 'react-helmet';

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'pega-embed': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
            & {
                action: string,
                pageID: string,
                pageClass: string,
                casePage: string,
                appAlias: string,
                pegaServerUrl: string,
                staticContentUrl: string,
                authService: string,
                clientId: string
            }
        }
    }
}

const el = document.getElementById('root');
if (!el) throw new Error('Failed to find the root element');
const root = createRoot(el);

root.render(
    <Provider store={store}>
            <Helmet>
                <script src='https://prod-cdn.constellation.pega.io/8.9.0-dev-13319/react/prod/pega-embed.js' ></script>
            </Helmet>
        < App />
    </Provider>
  );