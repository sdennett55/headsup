import React from "react";
import correctSound from './sounds/sound_correct.mp3';
import skipSound from './sounds/sound_skip.mp3';
import cx from "classnames";
import "./game.scss";
import { hash } from "./images";

const removeUnderscores = str => str.replace(/_/g, ' ');

const toMMSS = s => (s - (s %= 60)) / 60 + (9 < s ? ':' : ':0') + s;

class Game extends React.Component {

  componentDidUpdate(prevProps) {
    if (this.props.enableSoundEffects && prevProps.activeItem !== this.props.activeItem && prevProps.activeItem !== "") {
      if (prevProps.isAnimating === "correct") {
        this.props.soundFile.src = correctSound;
        this.props.soundFile.play();
      } else {
        this.props.soundFile.src = skipSound;
        this.props.soundFile.play();
      }
    }
  }

  render() {
    const {
      activeCollection,
      inGameTimer,
      activeItem,
      isAnimating,
      removeAnimationClasses,
      enableSoundEffects
    } = this.props;

    const lessThanTen = inGameTimer < 10;
    const timer = toMMSS(inGameTimer);
    const statusText = isAnimating === "correct" ? "Correct!" : "Skip!";

    const getActiveItem = () => activeCollection.name.toLowerCase().includes('kids') ? <img src={hash[activeItem]} alt={removeUnderscores(activeItem)} className="Game-image" /> : activeItem;

    return (
      <>
        <div
          className={cx("Staging", {
            "Staging--correct": isAnimating === "correct",
            "Staging--skip": isAnimating === "skip"
          })}
          onTransitionEnd={removeAnimationClasses}
        >
          {activeItem !== undefined ? (
            <div className="Game-activeItem">
              {isAnimating !== "" ? statusText : getActiveItem()}
            </div>
          ) : (
              <p>
                Category is empty :( <br /> Carefully shake device to return to menu.
          </p>
            )}
          <div
            className={cx("Timer", {
              "is-countdown": lessThanTen
            })}
          >
            {timer}
          </div>
        </div>
      </>
    );
  }
};

export default Game;
