/**
 * Environment Configuration
 * 
 * This file provides access to environment variables and configuration settings.
 * For production, these values should be set in the hosting environment.
 * For local development, you can use a .env file.
 */

interface EnvConfig {
  // GoHighLevel API configuration
  GHL_LOCATION_ID: string;
  GHL_API_KEY: string;
}

// Default configuration with empty values
const defaultConfig: EnvConfig = {
  GHL_LOCATION_ID: '',
  GHL_API_KEY: '',
};

/**
 * Get environment configuration
 * 
 * This function retrieves configuration from environment variables
 * or falls back to default values.
 */
export function getEnvConfig(): EnvConfig {
  // In a Vite project, environment variables are exposed via import.meta.env
  // with the VITE_ prefix
  return {
    GHL_LOCATION_ID: import.meta.env.VITE_GHL_LOCATION_ID || defaultConfig.GHL_LOCATION_ID,
    GHL_API_KEY: import.meta.env.VITE_GHL_API_KEY || defaultConfig.GHL_API_KEY,
  };
}
