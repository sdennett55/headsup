import React from 'react';
import Modal from './modal';
import { isIOS } from "react-device-detect";

const HelpModal = ({ handleModalClose }) => {
  return (
    <Modal handleModalClose={handleModalClose}>
      <h2 className="Modal-title">Help</h2>
      <p className="Modal-subtitle">How to Play:</p>
      <p className="Modal-copy">One player, the guesser, picks a deck and then puts the phone in front of their forehead. The rest of the party has to give the guesser clues of what the current card is without saying any words from the card, or saying "it rhymes with X." The guesser flips the phone down for correct and up to skip.</p>
      <p className="Modal-subtitle">I can't advance past the first clue on my iphone/ipad?</p>
      <p className="Modal-copy">Open up settings on your device, go to "Safari" and make sure <span className="Modal-emphasis">"Motion &amp; Orientation Access" is toggled ON</span>. <em>Note: This might require you to restart your device in order for the setting to bake in.</em></p>
      <h2 className="Modal-subtitle">I can't advance past the "Place on Forehead" screen?</h2>
      <p className="Modal-copy">Make sure orientation lock on your device is OFF. If your device can't flip to landscape, the game cannot begin.</p>
      {isIOS && (
        <>
          <h2 className="Modal-subtitle">Get Updates on IOS</h2>
          <p className="Modal-copy">In order to receieve any updates to the app itself, you'll need to remove the app from the home screen, then go to Settings &rarr; Safari &rarr; Advanced &rarr; Website data &rarr; Remove All Website Data. Then, reinstall to home screen from https://waitupgame.com</p>
        </>
      )}
      <h2 className="Modal-subtitle">Contact</h2>
      <p className="Modal-copy">For issues, feedback, inquiries or anything at all feel free to reach out at <span className="Modal-emphasis">w<span>ai</span>tupga<span>me@</span>g<span>m</span>ail.com</span> or on instagram at @waitupgame.</p>
    </Modal>
  )
}

export default HelpModal;