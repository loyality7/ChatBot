import React, { useEffect, useState } from 'react';
import { checkApiKey } from '../utils/checkKeys';

const Setting = ({ modalOpen, setModalOpen }) => {
  const apiKey = window.localStorage.getItem('api-key') || '';
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const saveKey = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    const key = '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'; // Replace 'YOUR_API_KEY' with your actual API key

    await checkApiKey(key)
      .then(() => {
        window.localStorage.setItem('api-key', key);
        console.log('works');
        setModalOpen(false);
      })
      .catch(() => {
        console.log('doesnt work');
        setErrorMsg('error: incorrect keys');
      });

    setLoading(false);
  };

  const removeApiKey = () => {
    window.localStorage.removeItem('api-key');
  };

  useEffect(() => {
    if (modalOpen) {
      // setInput(apiKey); // Remove this line since we no longer use input field for API key
    }
  }, [apiKey, modalOpen]);

  return (
    <form
      onSubmit={saveKey}
      className='flex flex-col items-center justify-center gap-2'>
      <p className='text-lg font-semibold'>Use your own API-key.</p>
      <p>keys are saved in your own browser</p>
      <p className='italic'>
        Get OpenAI API key{' '}
        <a
          className='text-blue-600'
          rel='noreferrer'
          target='_blank'
          href='https://platform.openai.com/account/api-keys'>
          here
        </a>
        .
      </p>
      {/* Remove the input field for API key */}
      {/* <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        type='password'
        className='w-full max-w-xs input input-bordered'
      /> */}
      <button disabled={loading} className='w-full max-w-xs btn btn-outline'>
        {loading ? (
          <span className='w-56 progress progress-info' />
        ) : (
          'save to localStorage'
        )}
      </button>
      {apiKey && (
        <span
          onClick={removeApiKey}
          disabled={loading}
          className='w-full max-w-xs btn btn-error'>
          remove keys
        </span>
      )}
      <p>{errorMsg}</p>
    </form>
  );
};

export default Setting;
