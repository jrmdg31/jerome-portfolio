// app/error.js
"use client";

import { useEffect } from 'react';

export default function Error({ error, resetError }) {
  useEffect(() => {
    console.error('Error:', error);
    console.error('Error cause:', error.cause);
  }, [error, resetError]);

  return (
    <div>
      <h2>Something went wrong!</h2>
      <p>{error.message}</p>
      <button onClick={() => resetError()}>
        Try again
      </button>
    </div>
  );
}