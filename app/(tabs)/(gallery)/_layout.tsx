import { Stack } from 'expo-router';

export default function GalleryLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="edit-selected-medias" />
    </Stack>
  );
}
