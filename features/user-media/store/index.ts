import { create } from 'zustand';

import { CommonAsset } from '../types';

interface CreatePostStore {
  assets: CommonAsset[] | CommonAsset;
  setAssets: (assets: CommonAsset[] | CommonAsset) => void;
  reset: () => void;
}

const initialStore = {
  assets: [],
};

export const useCreatePostStore = create<CreatePostStore>((set) => ({
  ...initialStore,
  setAssets: (assets) => set({ assets }),
  reset: () => set(initialStore),
}));
