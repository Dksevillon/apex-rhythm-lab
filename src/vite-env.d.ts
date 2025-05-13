
/// <reference types="vite/client" />

// Add support for importing audio files
declare module '*.wav' {
  const src: string;
  export default src;
}
