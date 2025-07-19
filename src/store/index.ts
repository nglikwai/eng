import { create } from 'zustand';

import vocabularyList from '@/constants/vocubulary';

type State = {
  activeVocabulary: Record<string, boolean>;
  setActiveVocabulary: (newState: Record<string, boolean>) => void;
  count: number;
  setCount: (newCount: number) => void;
  muted: boolean;
  setMuted: (newMuted: boolean) => void;
};
export const useVocabStore = create<State>(set => ({
  activeVocabulary: Object.keys(vocabularyList).reduce(
    (acc, key) => {
      acc[key] = false; // Initialize all vocabulary as active
      return acc;
    },
    {} as Record<string, boolean>
  ),
  setActiveVocabulary: (newState: Record<string, boolean>) =>
    set({ activeVocabulary: newState }),

  count: 0,
  setCount: (newCount: number) => set({ count: newCount }),
  muted: false,
  setMuted: (newMuted: boolean) => set({ muted: newMuted }),
}));

export const useDisplayVocabulary = () => {
  const { activeVocabulary } = useVocabStore();
  const displayVocabulary = Object.entries(activeVocabulary)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .filter(([_, isActive]) => isActive)
    .map(([key]) => vocabularyList[key as keyof typeof vocabularyList])
    .flat();

  const vocubLen = displayVocabulary.length;

  return { displayVocabulary, vocubLen };
};
