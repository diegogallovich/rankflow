import { getEnvVariable } from '@/utils/get-env-variable';

export const PROTECTED_ROUTES = ['/dashboard', '/account', '/api/protected'];

export const ALLOWED_ORIGINS = [
  getEnvVariable('LOGTO_ENDPOINT'),
  getEnvVariable('NEXT_PUBLIC_SITE_URL'),
];
