import React from "react";
import ReactDOM from "react-dom";
import Results from "./results";
import Menu from "./menu";
import Game from "./game";
import LoadingIcon from "./loading_icon";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from './auth/login';
import "./app.scss";
import fire from "./config/fire";

const GAME_TIMER = 3;
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
    activeCollection: {},
    startGameTimer: START_TIMER + 1,
    inGameTimer: GAME_TIMER,
    activeItem: "",
    orientation: "positive",
    blockRotation: false,
    isAnimating: "",
    user: {}
  };

  async componentDidMount() {
    this.authListener();
    
    const API_KEY = "AIzaSyAZ1DwWLQtUG4THryaQOohA1GatPSW4bKQ";
    const SHEET_ID = "1zwtuoozCw-8iGHFhJiolPz0Loy4sk17mHffVorw2z1s";
    const API = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values:batchGet?ranges=categories&majorDimension=COLUMNS&key=${API_KEY}`;
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

  authListener = () => {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({user});
      } else {
        this.setState({user: null});
      }
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
    let finalArray = [];
    let rest;

    for (let i = 0; i < batchRowValues.length; i++) {
      let finalObj = {};
      finalObj.name = batchRowValues[i][0];
      finalObj.isLocked = batchRowValues[i][1];
      finalObj.description = batchRowValues[i][2];
      finalObj.list = new Set([...batchRowValues[i].splice(3)]);
      finalArray.push(finalObj);
    }

    this.setState({
      categories: finalArray,
      activeCollection: finalArray[0]
    });
  };

  getActiveCat = ({isOn, cat, enable}) => {
    if (!isOn && enable) {
      enable();
    }

    const newActiveCollection = {...cat, list: new Set(cat.list)};
    
    this.setState({
      activeCollection: newActiveCollection
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
    let oldSet = new Set(this.state.activeCollection.list);
    oldSet.delete(this.state.activeItem);

    // Reset all game state
    this.setState((prevState) => ({
      activeCollection: {...prevState.activeCollection, list: oldSet},
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
        this.setState(prevState => ({
          score: prevState.score + 1,
          isAnimating: "correct"
        }));
      } else {
        this.setState({ isAnimating: "skip" });
      }
    }
  };

  getRandomItem = () => {
    // Get random item
    const randomNum = Math.floor(
      Math.random() * this.state.activeCollection.list.size
    );
    const randomItem = [...this.state.activeCollection.list][randomNum];

    // Remove random item from activeCollection and the Categories object
    const updatedCollection = new Set(this.state.activeCollection.list);
    updatedCollection.delete(randomItem);

    const dupCategories = [...this.state.categories];
    dupCategories.splice(dupCategories.findIndex(x => x.name === this.state.activeCollection.name), 1, {...this.state.activeCollection, list: updatedCollection});

    this.setState(prevState => ({
      activeItem: randomItem,
      activeCollection: {...prevState.activeCollection, updatedCollection},
      categories: dupCategories
    }));
  };

  getNextItem = decision => {
    // Don't get a next item if there isn't one
    if (
      this.state.activeItem === undefined &&
      this.state.activeCollection.list.size === 0
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

  removeAnimationClasses = () => {
    this.setState({ isAnimating: "" });
  };

  render() {
    return (
      <Router>
        <div className="App">
          {Object.keys(this.state.categories).length ? (
            <>
              {this.state.isMenu && (
                <Menu
                  getActiveCat={this.getActiveCat}
                  categories={this.state.categories}
                  user={this.state.user}
                />
              )}
              {this.state.isGameInProgress && (
                <Game
                  inGameTimer={this.state.inGameTimer}
                  activeItem={this.state.activeItem}
                  isAnimating={this.state.isAnimating}
                  removeAnimationClasses={this.removeAnimationClasses}
                />
              )}
              {this.state.isResults && (
                <Results
                  score={this.state.score}
                  activeCollection={this.state.activeCollection}
                  getActiveCat={this.getActiveCat}
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
        <Route path="/login" component={Login} />
      </Router>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
