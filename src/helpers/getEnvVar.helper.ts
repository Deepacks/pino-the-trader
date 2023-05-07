import { secrets } from 'docker-secret'

export const getEnvVar: (n: string) => string = (n) =>
  process.env.NODE_ENV === 'development'
    ? process.env[n]
    : secrets[`DISCORD_BOT_${n}`]
