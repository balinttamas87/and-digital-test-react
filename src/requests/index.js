const request = (url, errorMessage) =>
  fetch(url).then(res => (res.ok ? res.json() : Promise.reject(errorMessage)));

const getTopStoriesIdList = () =>
  request(
    "https://hacker-news.firebaseio.com/v0/topstories.json",
    "An error has occured while fetching list of IDs of top stories"
  );

const getStory = storyId =>
  request(
    `https://hacker-news.firebaseio.com/v0/item/${storyId}.json`,
    "An error has occured while fetching list of IDs of top stories"
  );

const getComment = commentId =>
  request(
    `https://hacker-news.firebaseio.com/v0/item/${commentId}.json`,
    "An error has occured while fetching a comment"
  );

export { getTopStoriesIdList, getStory, getComment };
