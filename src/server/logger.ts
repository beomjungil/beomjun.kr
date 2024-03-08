import pino from 'pino';

export const logger = pino({
  ...(import.meta.env.DEV && {
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
      },
    },
  }),
});
