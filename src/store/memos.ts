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

export const updateMemo = ({ id, patch }: Pick<Memo, 'id'> & { patch: Partial<Omit<Memo, 'id'>> }) => {
  $memos.set([...$memos.get().map(item => (item.id === id ? { ...item, ...patch } : item))]);
};

export const removeMemo = (memo: Memo) => {
  $memos.set([...$memos.get().filter(item => item.id !== memo.id)]);
};
