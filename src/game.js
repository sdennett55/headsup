import React from "react";
import cx from "classnames";
import "./game.scss";

const Game = ({ inGameTimer, activeItem }) => {
  const lessThanTen = inGameTimer < 10;
  const timerPrefix = lessThanTen ? "0:0" : "0:";
  const timer = timerPrefix + inGameTimer;
  return (
    <>
      <div className="Staging">
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
          {timer}
        </div>
      </div>
    </>
  );
};

export default Game;
