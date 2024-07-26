export const useTruncate = () => {
  const truncateText = (text: string | null | undefined, maxLength: number) => {
    if (text === null || text === undefined) {
      return null;
    }
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };

  return {
    truncateText,
  };
};
