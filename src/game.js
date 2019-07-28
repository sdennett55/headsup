import React from "react";
import Sound from "react-sound";
import { isIOS } from "react-device-detect";
import cx from "classnames";
import "./game.scss";
import aliens from "./images/aliens.jpg"
import anna from "./images/anna.jpg"
import ariel from "./images/ariel.jpg"
import aurora from "./images/aurora.jpg"
import beauty from "./images/beauty.jpg"
import buzz_lightyear from "./images/buzz_lightyear.jpg"
import captain_jack_sparrow from "./images/captain_jack_sparrow.jpg"
import christopher_robin from "./images/christopher_robin.jpg"
import cinderella from "./images/cinderella.jpg"
import daisy_duck from "./images/daisy_duck.jpg"
import doc_hudson from "./images/doc_hudson.jpg"
import donald_duck from "./images/donald_duck.jpg"
import eeyore from "./images/eeyore.jpg"
import elena from "./images/elena.jpg"
import elsa from "./images/elsa.jpg"
import fawn from "./images/fawn.jpg"
import fillmore from "./images/fillmore.jpg"
import flo from "./images/flo.jpg"
import goofy from "./images/goofy.jpg"
import guido from "./images/guido.jpg"
import hamm from "./images/hamm.jpg"
import iridessa from "./images/iridessa.jpg"
import jasmine from "./images/jasmine.jpg"
import jessie from "./images/jessie.jpg"
import kanga_and_roo from "./images/kanga_&_roo.jpg"
import lightning_mcqueen from "./images/lightning_mcqueen.jpg"
import luigi from "./images/luigi.jpg"
import mater from "./images/mater.jpg"
import merida from "./images/merida.jpg"
import mickey_mouse from "./images/mickey_mouse.jpg"
import minnie_mouse from "./images/minnie_mouse.jpg"
import mr_potato_head from "./images/mr._potato_head.jpg"
import mulan from "./images/mulan.jpg"
import olaf from "./images/olaf.jpg"
import owl from "./images/owl.jpg"
import piglet from "./images/piglet.jpg"
import pluto from "./images/pluto.jpg"
import pocahontas from "./images/pocahontas.jpg"
import rabbit from "./images/rabbit.jpg"
import ramone from "./images/ramone.jpg"
import rapunzel from "./images/rapunzel.jpg"
import rex from "./images/rex.jpg"
import rosetta from "./images/rosetta.jpg"
import sally from "./images/sally.jpg"
import sarge from "./images/sarge.jpg"
import silvermist from "./images/silvermist.jpg"
import slinky_dog from "./images/slinky_dog.jpg"
import snow_white from "./images/snow_white.jpg"
import tiana from "./images/tiana.jpg"
import tigger from "./images/tigger.jpg"
import vidia from "./images/vidia.jpg"
import winnie_the_pooh from "./images/winnie_the_pooh.jpg"
import woody from "./images/woody.jpg"

const removeUnderscores = str => str.replace(/_/g, ' ');

const hash = {
  aliens,
  anna,
  ariel,
  aurora,
  beauty,
  buzz_lightyear,
  captain_jack_sparrow,
  christopher_robin,
  cinderella,
  daisy_duck,
  doc_hudson,
  donald_duck,
  eeyore,
  elena,
  elsa,
  fawn,
  fillmore,
  flo,
  goofy,
  guido,
  hamm,
  iridessa,
  jasmine,
  jessie,
  'kanga_&_roo': kanga_and_roo,
  lightning_mcqueen,
  luigi,
  mater,
  merida,
  mickey_mouse,
  minnie_mouse,
  'mr._potato_head': mr_potato_head,
  mulan,
  olaf,
  owl,
  piglet,
  pluto,
  pocahontas,
  rabbit,
  ramone,
  rapunzel,
  rex,
  rosetta,
  sally,
  sarge,
  silvermist,
  slinky_dog,
  snow_white,
  tiana,
  tigger,
  vidia,
  winnie_the_pooh,
  woody
};

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
