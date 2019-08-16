import React from "react";
import ReactDOM from "react-dom";
import Results from "./results";
import Menu from "./menu";
import Game from "./game";
import LoadingIcon from "./loading_icon";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ReactComponent as Gear } from './images/gear.svg';
import { ReactComponent as MickeyIcon } from './svg/mickey.svg';
import HelpModal from './help_modal';
import SettingsModal from './settings_modal';
import Login from './auth/login';
import "./app.scss";
import fire from "./config/fire";
import * as serviceWorker from './serviceWorker';
import { isIOS, isMobile } from "react-device-detect";
import ReactGA from 'react-ga';

const DEFAULT_GAME_TIMER = 60;
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
    inGameTimer: DEFAULT_GAME_TIMER,
    activeItem: "",
    orientation: "positive",
    blockRotation: false,
    isAnimating: "",
    user: {},
    isHelpModalOpen: false,
    isSettingsModalOpen: false,
    enableSoundEffects: false,
    gameClock: DEFAULT_GAME_TIMER,
    showInstallMessage: false
  };

  async componentDidMount() {
    // this.authListener();
    this.initializeReactGA();

    // Detects if device is in standalone mode
    const isInStandaloneMode = () => ('standalone' in window.navigator) && (window.navigator.standalone);

    // Checks if should display install popup notification:
    if (isIOS && !isInStandaloneMode()) {
      this.setState({ showInstallMessage: true });
    }

    this.fetchData();

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

  fetchData = async () => {
    if (localStorage.getItem('waitup-categories') && !navigator.onLine) {
      const data = JSON.parse(localStorage.getItem('waitup-categories'));
      this.onLoad(data);
    } else {
      const API_KEY = "AIzaSyAZ1DwWLQtUG4THryaQOohA1GatPSW4bKQ";
      const SHEET_ID = "1zwtuoozCw-8iGHFhJiolPz0Loy4sk17mHffVorw2z1s";
      const API = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values:batchGet?ranges=categories&majorDimension=COLUMNS&key=${API_KEY}`;
      const response = await fetch(API);
      const data = await response.json();
      localStorage.setItem('waitup-categories', JSON.stringify(data));
      this.onLoad(data);
    }
  }

  initializeReactGA = () => {
    ReactGA.initialize('UA-145119899-1');
    ReactGA.pageview('/homepage');
  }

  reshuffleDecks = () => {
    if (isIOS && navigator.onLine) {
      window.location.reload(true);
    } else {
      this.fetchData();
    }
  };

  onLoad = data => {
    let batchRowValues = data.valueRanges[0].values;
    let finalArray = [];

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

  authListener = () => {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      } else {
        this.setState({ user: null });
      }
    });
  }

  onDeviceMotion = event => {
    if (
      (this.state.isStaging || this.state.isGameInProgress) &&
      event.acceleration.x > 30
    ) {
      // Tracking
      ReactGA.event({
        category: this.state.activeCollection.name,
        action: 'Exited Game'
      });

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

  getActiveCat = ({ isOn, cat, enable }) => {
    if (!isOn && enable) {
      enable();
    }

    const newActiveCollection = { ...cat, list: new Set(cat.list) };

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
      activeCollection: { ...prevState.activeCollection, list: oldSet },
      isCountdownInProgress: false,
      inGameTimer: this.state.gameClock,
      startGameTimer: START_TIMER + 1,
      isGameInProgress: false,
      isStaging: false,
      isGameOver: false,
      isResults: true,
      isAnimating: ''
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

    // Track that a game was completed
    ReactGA.event({
      category: this.state.activeCollection.name,
      action: 'Game played'
    });

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

        // Tracking
        ReactGA.event({
          category: this.state.activeCollection.name,
          action: 'Correct guess'
        });
      } else {
        this.setState({ isAnimating: "skip" });

        // Tracking
        ReactGA.event({
          category: this.state.activeCollection.name,
          action: 'Skipped guess'
        });
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
    dupCategories.splice(dupCategories.findIndex(x => x.name === this.state.activeCollection.name), 1, { ...this.state.activeCollection, list: updatedCollection });

    this.setState(prevState => ({
      activeItem: randomItem,
      activeCollection: { ...prevState.activeCollection, list: updatedCollection },
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

  handleHelpModal = () => {
    this.setState(prevState => {
      if (prevState.isHelpModalOpen) {
        ReactGA.event({
          category: this.state.activeCollection.name,
          action: 'Opened Help Menu'
        });
      }

      return { isHelpModalOpen: !prevState.isHelpModalOpen };
    });
  }

  handleSettingsModal = () => {
    this.setState(prevState => {
      if (prevState.isSettingsModalOpen) {
        ReactGA.event({
          category: this.state.activeCollection.name,
          action: 'Opened Settings Menu'
        });
      }

      return { isSettingsModalOpen: !prevState.isSettingsModalOpen };
    });
  }

  handleSoundEffects = () => {
    this.setState(prevState => {
      ReactGA.event({
        category: this.state.activeCollection.name,
        action: `Turned sound effects ${prevState.enableSoundEffects ? 'OFF' : 'ON'}`
      });
      
      return { enableSoundEffects: !prevState.enableSoundEffects };
    });
  }

  handleGameClock = num => {
    ReactGA.event({
      category: this.state.activeCollection.name,
      action: `Set game clock to ${num}`
    });
    this.setState({ gameClock: num, inGameTimer: num });
  }

  render() {
    return (
      <Router>
        <div className="App">
          {Object.keys(this.state.categories).length ? (
            <>
              {this.state.isMenu && (
                <>
                  {this.state.isHelpModalOpen && (
                    <HelpModal handleModalClose={this.handleHelpModal} />
                  )}
                  {!isMobile && (
                    <p className="Menu-banner">Visit us on a mobile or tablet device and add to homescreen to play!</p>
                  )}
                  <div className="Menu-container">
                    {this.state.showInstallMessage && (
                      <div className="Menu-addToHomeScreenBanner">
                        Click the Share button below and tap "Add to Home Screen" to install!
                      </div>
                    )}
                    <button className="Menu-helpBtn" onClick={this.handleHelpModal}><i className="Menu-helpIcon">?</i></button>
                    <button className="Menu-settingsBtn" onClick={this.handleSettingsModal}><Gear className="hey" /></button>
                    <Menu
                      getActiveCat={this.getActiveCat}
                      categories={this.state.categories}
                      user={this.state.user}
                    />
                  </div>
                  <p className="App-followUs">Follow on instagram: <a href="https://instagram.com/waitupgame">@waitupgame</a></p>
                  <button className="Results-btn Results-btn--reshuffle" onClick={this.reshuffleDecks}>
                    <svg className="Results-shuffleIcon" height="512px" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M370.1,181.3H399v47.3l81-83.2L399,64v54h-28.9c-82.7,0-129.4,61.9-170.6,116.5c-37,49.1-69,95.4-120.6,95.4H32v63.3h46.9  c82.7,0,129.4-65.8,170.6-120.4C286.5,223.7,318.4,181.3,370.1,181.3z M153.2,217.5c3.5-4.6,7.1-9.3,10.7-14.1  c8.8-11.6,18-23.9,28-36.1c-29.6-27.9-65.3-48.5-113-48.5H32v63.3c0,0,13.3-0.6,46.9,0C111.4,182.8,131.8,196.2,153.2,217.5z   M399,330.4h-28.9c-31.5,0-55.7-15.8-78.2-39.3c-2.2,3-4.5,6-6.8,9c-9.9,13.1-20.5,27.2-32.2,41.1c30.4,29.9,67.2,52.5,117.2,52.5  H399V448l81-81.4l-81-83.2V330.4z" /></svg>
                    Reshuffle Decks
                  </button>
                  {this.state.isSettingsModalOpen && (
                    <SettingsModal
                      handleModalClose={this.handleSettingsModal}
                      handleSoundEffects={this.handleSoundEffects}
                      enableSoundEffects={this.state.enableSoundEffects}
                      handleGameClock={this.handleGameClock}
                      gameClock={this.state.gameClock}
                      closeBtnRight
                    />
                  )}
                </>
              )}
              {this.state.isGameInProgress && (
                <Game
                  activeCollection={this.state.activeCollection}
                  inGameTimer={this.state.inGameTimer}
                  activeItem={this.state.activeItem}
                  isAnimating={this.state.isAnimating}
                  removeAnimationClasses={this.removeAnimationClasses}
                  enableSoundEffects={this.state.enableSoundEffects}
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
                      <>
                        <span className="Staging-text">Place on forehead
                          <span className="Staging-smText">Please turn off orientation lock</span>
                        </span>
                      </>
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
        {this.state.isMenu && (<div className="App-mickey"><MickeyIcon /></div>)}
        <Route path="/login" component={Login} />
      </Router>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();