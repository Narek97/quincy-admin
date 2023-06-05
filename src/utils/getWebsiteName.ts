export const getWebsiteName = (url: string) => {
  const parsedURL = new URL(url);
  return parsedURL.hostname;
};
