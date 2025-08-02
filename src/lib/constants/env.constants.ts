export const ENV = {
  BACKEND_URL: import.meta.env.VITE_BACKEND_URL,
  MOCK_DATA_ENABLED: import.meta.env.VITE_MOCK_DATA_ENABLED === "true"
}

Object.freeze(ENV)