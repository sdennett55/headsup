import React from "react";
import Sound from "react-sound";
import { isIOS } from "react-device-detect";
import cx from "classnames";
import "./game.scss";
import {hash} from "./images";

const removeUnderscores = str => str.replace(/_/g, ' ');

const toMMSS = s => (s - (s %= 60)) / 60 + (9 < s ? ':' : ':0') + s;

const Game = ({
  activeCollection,
  inGameTimer,
  activeItem,
  isAnimating,
  removeAnimationClasses,
  enableSoundEffects
}) => {
  const lessThanTen = inGameTimer < 10;
  const timer = toMMSS(inGameTimer);
  const soundFile =
    isAnimating === "correct"
      ? "https://uploads.codesandbox.io/uploads/user/b8f1fe91-9c56-4aa6-8e4b-be201500d8d0/oyPj-sound_correct.mp3"
      : "https://uploads.codesandbox.io/uploads/user/b8f1fe91-9c56-4aa6-8e4b-be201500d8d0/GgUH-sound_skip.mp3";
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
        {isAnimating && !isIOS && enableSoundEffects && (
          <Sound url={soundFile} playStatus={Sound.status.PLAYING} />
        )}
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
};

export default Game;
