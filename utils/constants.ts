import { getEnvVariable } from '@/utils/get-env-variable';

export const PROTECTED_ROUTES = ['/dashboard', '/account'];

export const ALLOWED_ORIGINS = [
  getEnvVariable('LOGTO_ENDPOINT'),
  getEnvVariable('NEXT_PUBLIC_SITE_URL'),
];

export const LOGTO_API_RESOURCES = [
  `${getEnvVariable('NEXT_PUBLIC_SITE_URL')}/sites`,
  `${getEnvVariable('NEXT_PUBLIC_SITE_URL')}/collections`,
];

export const LOGTO_API_SCOPES = ['read', 'write', 'delete'];
