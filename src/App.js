import React, { Component } from "react";
import { getTopStoriesIdList, getStory, getComment } from "./requests";
import Story from "./components/Story";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topStories: [],
      comments: []
    };

    this.loadTopStories = this.loadTopStories.bind(this);
    this.loadCommentsForStory = this.loadCommentsForStory.bind(this);
    this.handleStoryClick = this.handleStoryClick.bind(this);
  }

  componentDidMount() {
    this.loadTopStories();
  }

  loadTopStories() {
    getTopStoriesIdList().then(listOfIds => {
      const thirtyIds = listOfIds.slice(0, 30);

      const addStoryToState = story => {
        this.setState(prevState => ({
          topStories: [...prevState.topStories, story]
        }));
      };

      return Promise.all(thirtyIds.map(storyId => getStory(storyId))).then(
        stories => {
          stories.map(story => addStoryToState(story));
        }
      );
    });
  }

  loadCommentsForStory(commentIds) {
    const setCommentToState = comment => {
      this.setState(prevState => ({
        comments: [...prevState.comments, comment]
      }));
    };

    return Promise.all(commentIds.map(id => getComment(id))).then(comments =>
      comments.map(comment => setCommentToState(comment))
    );
  }

  handleStoryClick(commentIds) {
    this.setState({ comments: [] }, () => {
      this.loadCommentsForStory(commentIds);
    });
  }

  render() {
    const renderTopStories = () =>
      this.state.topStories.map(story => (
        <Story
          title={story.title}
          score={story.score}
          by={story.by}
          key={story.id}
          commentIds={story.kids}
          handleClick={this.handleStoryClick}
        />
      ));

    return (
      <div className="page">
        <header className="page-header">
          <h1>Hacker News - Top Stories</h1>
        </header>
        <section className="page-stories">{renderTopStories()}</section>
      </div>
    );
  }
}

export default App;
