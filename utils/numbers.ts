export const generateUniqueId = (): string => {
  const timestamp = Date.now().toString();
  const random = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, '0');
  const uniqueId = timestamp.slice(-5) + random;
  return uniqueId;
};
