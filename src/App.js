import React, { Component } from "react";
import { getTopStoriesIdList, getStory } from "./requests";
import Story from "./components/Story";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topStories: []
    };
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

      Promise.all(thirtyIds.map(storyId => getStory(storyId))).then(stories => {
        stories.map(story => addStoryToState(story));
      });
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
        />
      ));

    return (
      <div className="page">
        <header>
          <h1>Hacker News - Top Stories</h1>
        </header>
        <section className="page-stories">{renderTopStories()}</section>
      </div>
    );
  }
}

export default App;
