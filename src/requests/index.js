const getTopStoriesIdList = () => {
  const url = "https://hacker-news.firebaseio.com/v0/topstories.json";
  return fetch(url)
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      throw new Error(
        "An error has occured while fetching list of IDs of top stories"
      );
    })
    .catch(error => {
      throw new Error(error);
    });
};

const getStory = storyId => {
  const url = `https://hacker-news.firebaseio.com/v0/item/${storyId}.json`;
  return fetch(url)
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      throw new Error("An error has occured while fetching a story");
    })
    .catch(error => {
      throw new Error(error);
    });
};

export { getTopStoriesIdList, getStory };
