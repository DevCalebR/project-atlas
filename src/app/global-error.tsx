"use client";

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en"><body><main style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: "2rem", fontFamily: "system-ui" }}><div><h1>Unable to load this page.</h1><p>Please try again.</p><button onClick={reset}>Reload</button></div></main></body></html>
  );
}

