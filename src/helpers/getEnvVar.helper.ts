import { secrets } from 'docker-secret';

export const getEnvVar: (n: string) => string = (n) =>
  process.env[n]?.length > 0 ? process.env[n] : secrets[`discord_${n}`];
