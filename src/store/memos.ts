import { persistentAtom } from '@nanostores/persistent';

export interface Memo {
  description: string;
}

export const memos = persistentAtom<Memo[]>('memos', [], {
  encode: JSON.stringify,
  decode: JSON.parse,
});
