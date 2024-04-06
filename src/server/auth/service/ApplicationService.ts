import { service } from '@/server/utils/service';
import { v4 as uuidv4 } from 'uuid';
export interface ApplicationService {
  createApplicationID: () => string;

  createApplicationSecret: () => string;
}

export const ApplicationServiceImpl = service<ApplicationService>(() => ({
  createApplicationID: () => {
    return uuidv4();
  },

  createApplicationSecret: () => {
    return randomHex(16);
  },
}));

function randomHex(size: number) {
  let result = '';
  const characters = '0123456789abcdef';
  for (let i = 0; i < size * 2; i++) {
    result += characters.charAt(Math.floor(Math.random() * 16));
  }
  return result;
}
