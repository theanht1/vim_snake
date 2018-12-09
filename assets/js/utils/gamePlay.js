import { createHash } from 'crypto';


export const getSnakeColor = userId => {
  const hash = createHash('sha256');
  hash.update(String(userId));
  return hash.digest('hex').slice(5, 11);
};
