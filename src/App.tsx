import React from 'react';

export const App = () => {
  return (
    <div>
      <div className='columns'>
        <div className='column is-three-quarters'>
          <div className='block'>
            <h2 className='subtitle'>
              AWS Certified Developer Associate exam questions
            </h2>
          </div>
          <div className='block'> Question block </div>
          <div className='block'> description </div>

          <div className='column'>
            <div className='block'>user info</div>

            <div className='block'>progress info</div>
            <div className='block'>Statistics info</div>
          </div>
        </div>
      </div>
    </div>
  );
};
