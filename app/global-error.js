// app/global-error.js
"use client";

import { useEffect } from 'react';

export default function GlobalError({ error, resetError }) {
  useEffect(() => {
    console.error('Global Error:', error);
    console.error('Global Error cause:', error.cause);
  }, [error, resetError]);

  return (
    <div>
      <h2>Something went wrong in the layout!</h2>
      <p>{error.message}</p>
      <button onClick={() => resetError()}>
        Try again
      </button>
    </div>
  );
}