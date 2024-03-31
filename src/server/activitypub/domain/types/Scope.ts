import { z } from 'zod';

export const Scope = z.enum(['read', 'write', 'follow', 'push']);
export type Scope = z.infer<typeof Scope>;
