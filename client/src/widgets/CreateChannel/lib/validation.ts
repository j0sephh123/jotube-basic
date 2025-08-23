export const YT_VIDEO_ID_LENGTH = 11;

export const validateYoutubeId = (
  id: string
): { isValid: boolean; error: string | null } => {
  const trimmedId = id.trim();

  if (trimmedId.length !== YT_VIDEO_ID_LENGTH) {
    return {
      isValid: false,
      error: `YouTube ID must be exactly ${YT_VIDEO_ID_LENGTH} characters`,
    };
  }

  return {
    isValid: true,
    error: null,
  };
};
