import { persistentAtom } from '@nanostores/persistent';

export interface Memo {
  id: number;
  description: string;
}

export type NewMemo = Omit<Memo, 'id'>;

export const $memos = persistentAtom<Memo[]>('memos', [], {
  encode: JSON.stringify,
  decode: JSON.parse,
});

export const addMemo = (memo: NewMemo) => {
  $memos.set([{ id: Date.now(), ...memo }, ...$memos.get()]);
};
