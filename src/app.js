import React from "react";
import ReactDOM from "react-dom";
import Results from "./results";
import Menu from "./menu";
import Game from "./game";
import LoadingIcon from "./loading_icon";
import "./app.scss";

const GAME_TIMER = 60;
const START_TIMER = 3;

let GAME_COUNTDOWN_INTERVAL;
let START_COUNTDOWN_INTERVAL;

class App extends React.Component {
  state = {
    isMenu: true,
    isStaging: false,
    isGameInProgress: false,
    isGameOver: false,
    isResults: false,
    isCountdownInProgress: false,
    score: 0,
    finalAnswers: [],
    categories: {},
    activeCollection: new Set(),
    activeCategory: "",
    startGameTimer: START_TIMER + 1,
    inGameTimer: GAME_TIMER,
    activeItem: "",
    orientation: "positive",
    blockRotation: false
  };

  async componentDidMount() {
    const API_KEY = 'AIzaSyAZ1DwWLQtUG4THryaQOohA1GatPSW4bKQ';
    const API =
      `https://sheets.googleapis.com/v4/spreadsheets/1XcUoOxrsdH0SbB_8VKe_pJtjq3MnJHCyqcexV3j2W28/values:batchGet?ranges=categories&majorDimension=COLUMNS&key=${API_KEY}`;
    const response = await fetch(API);
    const data = await response.json();
    this.onLoad(data);

    window.addEventListener("orientationchange", this.onOrientationChange);

    window.addEventListener(
      "deviceorientation",
      event => {
        this.onDeviceOrientation(event);
      },
      true
    );

    window.addEventListener("devicemotion", event => {
      this.onDeviceMotion(event);
    });
  }

  componentDidUpdate() {
    !this.state.isMenu
      ? document.body.classList.add("u-noScroll")
      : document.body.classList.remove("u-noScroll");
  }

  componentWillUnmount() {
    window.removeEventListener("orientationchange", this.onOrientationChange);
    window.removeEventListener(
      "deviceorientation",
      event => {
        this.onDeviceOrientation(event);
      },
      true
    );
    window.removeEventListener("devicemotion", event => {
      this.onDeviceMotion(event);
    });
  }

  onDeviceMotion = event => {
    if (
      (this.state.isStaging || this.state.isGameInProgress) &&
      event.acceleration.x > 35
    ) {
      this.resetGame();
      this.backToMenu();
    }
  };

  onDeviceOrientation = event => {
    if (this.state.isGameInProgress) {
      if (Math.abs(event.gamma) <= 30 && !this.state.blockRotation) {
        if (event.gamma < 0) {
          if (this.state.orientation === "positive") {
            this.getNextItem("skip");
          } else {
            this.getNextItem("correct");
          }
        } else {
          if (this.state.orientation === "positive") {
            this.getNextItem("correct");
          } else {
            this.getNextItem("skip");
          }
        }
        this.setState({
          blockRotation: true
        });
      }
      if (Math.abs(event.gamma) >= 70) {
        this.setState({
          blockRotation: false
        });
      }
    }
  };

  onOrientationChange = () => {
    if (this.state.isStaging) {
      if (window.orientation === 90) {
        this.setState({ orientation: "positive" });
        this.startGame();
      } else if (window.orientation === -90) {
        this.setState({ orientation: "negative" });
        this.startGame();
      }
    }
  };

  onLoad = data => {
    let batchRowValues = data.valueRanges[0].values;
    let rows = {};

    for (let i = 0; i < batchRowValues.length; i++) {
      for (let j = 1, arr = []; j < batchRowValues[i].length; j++) {
        arr.push(batchRowValues[i][j]);
        rows[batchRowValues[i][0]] = new Set(arr);
      }
    }

    const firstCategory = Object.keys(rows)[0];

    this.setState({
      categories: rows,
      activeCollection: new Set(rows[firstCategory])
    });
  };

  getActiveCat = cat => {
    this.setState({
      activeCollection: new Set(this.state.categories[cat]),
      activeCategory: cat
    });

    this.goToStaging();
  };

  onInGameTimerComplete = () => {
    return new Promise(resolve => {
      GAME_COUNTDOWN_INTERVAL = setInterval(() => {
        this.setState(prevState => ({
          inGameTimer: prevState.inGameTimer - 1
        }));
        if (this.state.inGameTimer < 1 || this.state.isGameOver) {
          clearInterval(GAME_COUNTDOWN_INTERVAL);
          resolve(true);
        }
      }, 1000);
    });
  };

  resetGame = () => {
    clearInterval(START_COUNTDOWN_INTERVAL);
    clearInterval(GAME_COUNTDOWN_INTERVAL);
    // If times runs out, lets log that active item as skipped
    if (this.state.activeItem !== undefined) {
      this.setState(prevState => ({
        finalAnswers: [
          ...prevState.finalAnswers,
          { name: this.state.activeItem, status: "skip" }
        ]
      }));
    }

    // Delete the active item, as we already saw it
    let oldSet = new Set(this.state.activeCollection);
    oldSet.delete(this.state.activeItem);

    // Reset all game state
    this.setState(() => ({
      activeCollection: oldSet,
      isCountdownInProgress: false,
      inGameTimer: GAME_TIMER,
      startGameTimer: START_TIMER + 1,
      isGameInProgress: false,
      isStaging: false,
      isGameOver: false,
      isResults: true
    }));
  };

  startGame = async () => {
    await this.onStartCountdownComplete();
    this.setState({
      isCountdownInProgress: false,
      startGameTimer: START_TIMER + 1,
      isGameInProgress: true,
      isMenu: false,
      isResults: false,
      isStaging: false
    });
    this.getNextItem();
    await this.onInGameTimerComplete();
    this.resetGame();
  };

  makeDecision = decision => {
    if (decision) {
      this.setState(prevState => ({
        finalAnswers: [
          ...prevState.finalAnswers,
          { name: this.state.activeItem, status: decision }
        ]
      }));
      if (decision === "correct") {
        this.setState(prevState => ({ score: prevState.score + 1 }));
      }
    }
  };

  getRandomItem = () => {
    // Get random item
    const randomNum = Math.floor(
      Math.random() * this.state.activeCollection.size
    );
    const randomItem = [...this.state.activeCollection][randomNum];

    // Remove random item from activeCollection and the Categories object
    const updatedCollection = new Set(this.state.activeCollection);
    updatedCollection.delete(randomItem);
    const newCategories = { ...this.state.categories };
    newCategories[this.state.activeCategory] = updatedCollection;

    this.setState({
      activeItem: randomItem,
      activeCollection: updatedCollection,
      categories: newCategories
    });
  };

  getNextItem = decision => {
    // Don't get a next item if there isn't one
    if (
      this.state.activeItem === undefined &&
      this.state.activeCollection.size === 0
    ) {
      this.setState({ isGameOver: true });
      return;
    }

    // Did we mark it as correct or skip
    this.makeDecision(decision);

    // Get a random item from the collection
    this.getRandomItem();
  };

  onStartCountdownComplete = () => {
    return new Promise(resolve => {
      START_COUNTDOWN_INTERVAL = setInterval(() => {
        this.setState(prevState => ({
          isCountdownInProgress: true,
          startGameTimer: prevState.startGameTimer - 1
        }));
        if (this.state.startGameTimer < 1) {
          clearInterval(START_COUNTDOWN_INTERVAL);
          resolve(true);
        }
      }, 1000);
    });
  };

  backToMenu = () => {
    this.setState({
      isMenu: true,
      isResults: false,
      isStaging: false,
      score: 0,
      finalAnswers: []
    });
  };

  goToStaging = () => {
    this.setState(
      {
        isStaging: true,
        isResults: false,
        isMenu: false,
        score: 0,
        finalAnswers: []
      },
      () => {
        this.onOrientationChange();
      }
    );
  };

  render() {
    return (
      <div className="App">
        {Object.keys(this.state.categories).length ? (
          <>
            {this.state.isMenu && (
              <Menu
                getActiveCat={this.getActiveCat}
                categories={this.state.categories}
              />
            )}
            {this.state.isGameInProgress && (
              <Game
                inGameTimer={this.state.inGameTimer}
                activeItem={this.state.activeItem}
              />
            )}
            {this.state.isResults && (
              <Results
                score={this.state.score}
                activeCollection={this.state.activeCollection}
                getActiveCat={this.getActiveCat}
                activeCategory={this.state.activeCategory}
                backToMenu={this.backToMenu}
                finalAnswers={this.state.finalAnswers}
              />
            )}
            {this.state.isStaging && (
              <div className="Staging">
                {this.state.isCountdownInProgress ? (
                  <span className="Staging-timerText">
                    {this.state.startGameTimer}
                  </span>
                ) : (
                  <span className="Staging-text">Place on forehead</span>
                )}
              </div>
            )}
          </>
        ) : (
          <>
            <LoadingIcon />
          </>
        )}
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
