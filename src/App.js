import React, { Component } from "react";
import { getTopStoriesIdList, getStory, getComment } from "./requests";
import Story from "./components/Story";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topStories: [],
      comments: [],
      error: "",
      loading: false
    };

    this.loadTopStories = this.loadTopStories.bind(this);
    this.loadCommentsForStory = this.loadCommentsForStory.bind(this);
    this.handleStoryClick = this.handleStoryClick.bind(this);
  }

  componentDidMount() {
    this.loadTopStories();
  }

  loadTopStories() {
    this.setState({ loading: true });

    getTopStoriesIdList()
      .then(listOfIds => {
        const thirtyIds = listOfIds.slice(0, 30);

        const addStoryToState = story => {
          this.setState(prevState => ({
            topStories: [...prevState.topStories, story],
            loading: false
          }));
        };

        return Promise.all(thirtyIds.map(storyId => getStory(storyId)))
          .then(stories => {
            stories.map(story => addStoryToState(story));
          })
          .catch(error => this.setState({ error, loading: false }));
      })
      .catch(error => this.setState({ error, loading: false }));
  }

  loadCommentsForStory(commentIds) {
    this.setState({ loading: true });

    const setCommentToState = comment => {
      this.setState(prevState => ({
        comments: [...prevState.comments, comment],
        loading: false
      }));
    };

    return Promise.all(commentIds.map(id => getComment(id)))
      .then(comments => comments.map(comment => setCommentToState(comment)))
      .catch(error => this.setState({ error, loading: false }));
  }

  handleStoryClick(commentIds) {
    this.setState({ comments: [] }, () => {
      this.loadCommentsForStory(commentIds);
    });
  }

  render() {
    const { error, loading, topStories } = this.state;

    const renderTopStories = () =>
      topStories.map(story => (
        <Story
          title={story.title}
          score={story.score}
          by={story.by}
          key={story.id}
          onClick={() => this.handleStoryClick(story.kids)}
        />
      ));

    return (
      <div className="page">
        <header className="page-header">
          <h1>Hacker News - Top Stories</h1>
        </header>
        {loading && <div>Loading...</div>}
        {error ? (
          <div>Oops an error has occured. Please refresh the page.</div>
        ) : (
          <section className="page-stories">{renderTopStories()}</section>
        )}
      </div>
    );
  }
}

export default App;
