import { UserScope, LogtoNextConfig } from '@logto/next';
import { getEnvVariable } from '@/utils/get-env-variable';
import { createHmac } from 'node:crypto';

export const logtoConfig: LogtoNextConfig = {
  scopes: [
    UserScope.Email,
    UserScope.Profile,
    UserScope.Identities,
    UserScope.Roles,
    UserScope.CustomData,
  ],
  endpoint: getEnvVariable('LOGTO_ENDPOINT'),
  appId: getEnvVariable('LOGTO_APP_ID'),
  appSecret: getEnvVariable('LOGTO_APP_SECRET'),
  baseUrl: getEnvVariable('NEXT_PUBLIC_SITE_URL'),
  cookieSecret: getEnvVariable('LOGTO_COOKIE_SECRET'),
  cookieSecure: process.env.NODE_ENV === 'production',
};

export const verifyLogtoWebhook = async (
  signingKey: string,
  rawBody: string,
  expectedSignature: string
) => {
  const hmac = createHmac('sha256', signingKey);
  hmac.update(rawBody);
  const signature = hmac.digest('hex');
  return signature === expectedSignature;
};
