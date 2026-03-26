"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an external service or the server terminal so we can see it
    console.error("Caught in error.tsx:", error);
  }, [error]);

  return (
    <div style={{ padding: "40px", backgroundColor: "#fff0f0", color: "#a00", fontFamily: "monospace" }}>
      <h2>Something went wrong natively!</h2>
      <p><strong>Message:</strong> {error.message}</p>
      <pre style={{ whiteSpace: "pre-wrap", overflowX: "auto" }}>
        <strong>Stack:</strong>
        <br />
        {error.stack}
      </pre>
      <button onClick={() => reset()} style={{ marginTop: "20px", padding: '10px' }}>
        Try again
      </button>
    </div>
  );
}
