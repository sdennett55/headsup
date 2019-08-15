import React from 'react';
import Modal from './modal';
import { isIOS, osVersion } from "react-device-detect";

const HelpModal = ({ handleModalClose }) => {
  return (
    <Modal handleModalClose={handleModalClose}>
      <h2 className="Modal-title">Help</h2>
      <p className="Modal-subtitle">How to Install</p>
      {isIOS ? (
        <>
          {Math.floor(osVersion) >= 13 ? (
            <>
              <p className="Modal-copy">iOS 13 users, add to homescreen from Chrome, Safari will no longer register motion events.</p>
              <p className="Modal-copy">Open the app from your home screen and enjoy!</p>
            </>
          ) : (
              <>
                <p className="Modal-copy">1. Click the "Share" icon in the middle of the bottom menu bar in Safari and select "Add to Homescreen."</p>
                <p className="Modal-copy">2. Go to "Settings" on your iOS device, then to "Safari" and make sure "Motion &amp; Orientation Access" is toggled ON.</p>
                <p className="Modal-copy">3. Open the app from your home screen and enjoy!</p>
              </>
            )}
        </>
      ) : (
          <p className="Modal-copy">Tap the settings button in your browser and select "Add to Home screen." Open the app from your home screen and enjoy!</p>
        )}
      <p className="Modal-subtitle">How to Play</p>
      <p className="Modal-copy">One player, the guesser, picks a deck and then puts the phone in front of their forehead. The rest of the party has to give the guesser clues of what the current card is without saying any words from the card, or saying "it rhymes with." The guesser flips the phone down for correct and up to skip.</p>
      <p className="Modal-copy Modal-emphasis">To leave a game and return to the menu at any time carefully shake your device.</p>
      <h2 className="Modal-title">FAQS</h2>
      {isIOS && (
        <>
          <p className="Modal-subtitle">I can't advance past the first clue on my iphone/ipad?</p>
          <p className="Modal-copy">Open up settings on your device, go to "Safari" and make sure <span className="Modal-emphasis">"Motion &amp; Orientation Access" is toggled ON</span>. <em>Note: This might require you to restart your device in order for the setting to bake in.</em></p>
        </>
      )}
      <h2 className="Modal-subtitle">I can't advance past the "Place on Forehead" screen?</h2>
      <p className="Modal-copy">Make sure orientation lock on your device is OFF. If your device can't flip to landscape, the game cannot begin.</p>
      {isIOS && (
        <>
          <h2 className="Modal-subtitle">Get Updates on IOS</h2>
          <p className="Modal-copy">Hit the "Reshuffle Decks" button at the bottom of the decks to reshuffle the existing decks but to also to receive any updates to the app!</p>
        </>
      )}
      <h2 className="Modal-subtitle">Contact</h2>
      <p className="Modal-copy">For issues, feedback, inquiries or anything at all feel free to reach out at <span className="Modal-emphasis">w<span>ai</span>tupga<span>me@</span>g<span>m</span>ail.com</span>!</p>
    </Modal>
  )
}

export default HelpModal;