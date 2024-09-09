import { getEnvVariable } from '@/utils/get-env-variable';

export const logtoConfig = {
  endpoint: getEnvVariable('LOGTO_ENDPOINT'),
  appId: getEnvVariable('LOGTO_APP_ID'),
  appSecret: getEnvVariable('LOGTO_APP_SECRET'),
  baseUrl: getEnvVariable('NEXT_PUBLIC_SITE_URL'),
  cookieSecret: getEnvVariable('LOGTO_COOKIE_SECRET'),
  cookieSecure: process.env.NODE_ENV === 'production',
};
