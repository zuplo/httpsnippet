import type { Target } from '..';

import { native } from './native/client';

export const ruby: Target = {
  info: {
    key: 'ruby',
    title: 'Ruby',
    extname: '.rb',
    default: 'native',
  },
  clientsById: {
    native,
  },
};
