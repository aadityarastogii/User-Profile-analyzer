/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_GITHUB_TOKEN: string; // Add your environment variable here
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  