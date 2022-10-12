import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import { Footer } from './components/Footer';
import AppProviders from './context/AppProviders';
import { App } from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <AppProviders>
      <section className='section hero is-fullheight'>
        <div className='container'>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </div>
        <Footer />
      </section>
    </AppProviders>
  </React.StrictMode>
);

reportWebVitals();
