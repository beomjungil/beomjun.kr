import { ZSchema } from '@/server/utils/ZSchema';
import { z } from 'zod';
import { Scope } from '../../types/Scope';
import { ApplicationContract } from './schema';

const ApplicationData = z.object({
  id: z.string(),
  secret: z.string(),
  name: z.string(),
  redirectUris: z.array(z.string()),
  website: z.string(),
  scopes: z.array(Scope),
  createdAt: z.date(),
});

export class Application extends ZSchema(ApplicationData) {
  toContract(): ApplicationContract {
    return ApplicationContract.parse({
      id: this.id,
      client_secret: this.secret,
      client_id: this.id,
      name: this.name,
      website: this.website,
      redirect_uri: this.redirectUris[0],
    });
  }
}
