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
      error: ""
    };

    this.loadTopStories = this.loadTopStories.bind(this);
    this.loadCommentsForStory = this.loadCommentsForStory.bind(this);
    this.handleStoryClick = this.handleStoryClick.bind(this);
  }

  componentDidMount() {
    this.loadTopStories();
  }

  loadTopStories() {
    getTopStoriesIdList()
      .then(listOfIds => {
        const thirtyIds = listOfIds.slice(0, 30);

        const addStoryToState = story => {
          this.setState(prevState => ({
            topStories: [...prevState.topStories, story]
          }));
        };

        return Promise.all(thirtyIds.map(storyId => getStory(storyId)))
          .then(stories => {
            stories.map(story => addStoryToState(story));
          })
          .catch(error => this.setState({ error }));
      })
      .catch(error => this.setState({ error }));
  }

  loadCommentsForStory(commentIds) {
    const setCommentToState = comment => {
      this.setState(prevState => ({
        comments: [...prevState.comments, comment]
      }));
    };

    return Promise.all(commentIds.map(id => getComment(id)))
      .then(comments => comments.map(comment => setCommentToState(comment)))
      .catch(error => this.setState({ error }));
  }

  handleStoryClick(commentIds) {
    this.setState({ comments: [] }, () => {
      this.loadCommentsForStory(commentIds);
    });
  }

  render() {
    const { error, topStories } = this.state;

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
