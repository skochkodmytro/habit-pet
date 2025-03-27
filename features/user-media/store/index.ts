import { create } from 'zustand';

import { CommonAsset } from '../types';

interface CreatePostStore {
  assets: CommonAsset[] | CommonAsset;
  setAssets: (assets: CommonAsset[] | CommonAsset) => void;
}

export const useCreatePostStore = create<CreatePostStore>((set) => ({
  assets: [],
  setAssets: (assets) => set({ assets }),
}));
