import React, { Component } from "react";
import { getTopStoriesIdList, getStory } from "./requests";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topStories: []
    };
  }

  /* eslint-disable class-methods-use-this */
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

  /* eslint-disable class-methods-use-this */
  render() {
    return (
      <div className="page">
        <header>
          <h1>Hacker News - Top Stories</h1>
        </header>
        <div className="page-stories">
          {this.state.topStories.map(story => (
            <div className="story" key={story.id}>
              <div className="story-title-wrapper">
                <p className="story-title">{story.title}</p>
              </div>
              <div className="story-details-wrapper">
                <p className="story-details">details</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
