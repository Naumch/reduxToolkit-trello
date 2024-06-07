export const getRequestUnsplashAPI = async () => {
  const url =
    "https://api.unsplash.com/photos/random/?topics=bo8jQKTaE0Y;count=20;orientation=landscape";

  const headers = new Headers({
    "Accept-Version": "v1",
    Authorization: `Client-ID ${process.env.REACT_APP_ACCESS_KEY}`,
  });

  const response = await fetch(url, { headers });

  if (!response.ok) {
    throw new Error(`HTTP error: Status ${response.status}`);
  }

  return response.json();
};
