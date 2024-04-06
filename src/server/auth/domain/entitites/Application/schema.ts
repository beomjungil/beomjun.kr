import { z } from 'zod';

export const ApplicationContract = z.object({
  id: z.string(),
  client_secret: z.string(),
  client_id: z.string(),
  name: z.string(),
  website: z.string(),
  redirect_uri: z.string(),
});

export type ApplicationContract = z.infer<typeof ApplicationContract>;
