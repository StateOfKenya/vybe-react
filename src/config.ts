// Configuration for different environments

interface Config {
  apiBaseUrl: string;
}

// Use environment variables from .env files
// These are automatically loaded by Vite based on the current environment
const config: Config = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL as string,
};

// Fallback to default values if environment variables are not set
if (!config.apiBaseUrl) {
  config.apiBaseUrl = import.meta.env.DEV 
    ? 'http://localhost:8000' 
    : 'https://api.vybe.africa';
}

export default config;