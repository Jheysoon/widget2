export const DEV: string = 'dev';
export const PROD: string = 'prod';

export const ENV = process.env.NODE_ENV === 'production' ? PROD : DEV;
