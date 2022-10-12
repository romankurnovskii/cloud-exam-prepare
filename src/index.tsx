import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import { App } from './App';
import { Footer } from './components/Footer';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <section className='section hero is-fullheight'>
      <div className='container'>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </div>
      <Footer />
    </section>
  </React.StrictMode>
);

reportWebVitals();
