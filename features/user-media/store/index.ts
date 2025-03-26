import { create } from 'zustand';
import { Asset } from 'expo-media-library';

interface CreatePostStore {
  assets: Asset[] | Asset;
  setAssets: (assets: Asset[] | Asset) => void;
}

export const useCreatePostStore = create<CreatePostStore>((set) => ({
  assets: [],
  setAssets: (assets) => set({ assets }),
}));
