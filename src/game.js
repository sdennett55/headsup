import React from "react";
import Sound from "react-sound";
import { isIOS } from "react-device-detect";
import cx from "classnames";
import "./game.scss";

const Game = ({
  inGameTimer,
  activeItem,
  isAnimating,
  removeAnimationClasses
}) => {
  const lessThanTen = inGameTimer < 10;
  const timerPrefix = lessThanTen ? "0:0" : "0:";
  const timer = timerPrefix + inGameTimer;
  const soundFile =
    isAnimating === "correct"
      ? "https://uploads.codesandbox.io/uploads/user/b8f1fe91-9c56-4aa6-8e4b-be201500d8d0/oyPj-sound_correct.mp3"
      : "https://uploads.codesandbox.io/uploads/user/b8f1fe91-9c56-4aa6-8e4b-be201500d8d0/GgUH-sound_skip.mp3";
  return (
    <>
      <div
        className={cx("Staging", {
          "Staging--correct": isAnimating === "correct",
          "Staging--skip": isAnimating === "skip"
        })}
        onTransitionEnd={removeAnimationClasses}
      >
        {isAnimating && !isIOS && (
          <Sound url={soundFile} playStatus={Sound.status.PLAYING} />
        )}
        {activeItem !== undefined ? (
          <div className="Game-activeItem">{activeItem}</div>
        ) : (
          <p>
            Category is empty :( <br /> Tap to continue
          </p>
        )}
        <div
          className={cx("Timer", {
            "is-countdown": lessThanTen
          })}
        >
          {timer} {isAnimating}
        </div>
      </div>
    </>
  );
};

export default Game;
