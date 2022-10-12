import React from 'react';

export const Footer = () => {
  return (
    <footer
      className='footer has-text-centered is-flex-align-items-flex-end mt-auto'
      style={{
        padding: '15px',
        fontSize: '12px',
      }}
    >
      <div className='content has-text-left mt-auto'>
        Disclaimers:
        <br /> - This website is not related to, affiliated with, endorsed or
        authorized by Amazon. All questions are got from free, public internet resources and there is no any relation to official exam questions.
        <br />- Trademarks, certification & product names are used for reference
        only and belong to Amazon.
        <div className='content has-text-centered'>
          The{' '}
          <a
            href='https://github.com/romankurnovskii/cloud-exam-prepare'
            target='_blank'
            rel='noreferrer'
          >
            source code
          </a>{' '}
          is licensed
          <a
            href='http://opensource.org/licenses/mit-license.php'
            target='_blank'
            rel='noreferrer'
          >
            {' '}
            MIT
          </a>
          . The website content is licensed{' '}
          <a
            href='http://creativecommons.org/licenses/by-nc-sa/4.0/'
            target='_blank'
            rel='noreferrer'
          >
            CC BY NC SA 4.0
          </a>
          .
        </div>
      </div>
    </footer>
  );
};
