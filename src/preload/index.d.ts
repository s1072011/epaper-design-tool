export interface Api {
  ping: () => Promise<string>
}

declare global {
  interface Window {
    api: Api
  }
}
