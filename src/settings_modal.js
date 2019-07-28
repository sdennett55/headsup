import React from 'react';
import Modal from './modal';
import { isIOS } from "react-device-detect";

const SettingsModal = ({ handleModalClose, handleSoundEffects, enableSoundEffects, closeBtnRight, handleGameClock, gameClock }) => {
  return (
    <Modal handleModalClose={handleModalClose} closeBtnRight={closeBtnRight}>
      <h2 className="Modal-title">Settings</h2>
      <div className="Modal-flexWrap">
        <p className="Modal-label">Game Clock:</p>
        <input id="game_clock_60" className="Modal-radioBtn" type="radio" name="game_clock" value="60" onChange={() => handleGameClock(60)} checked={gameClock === 60} />
        <label for="game_clock_60" className="Modal-radioLabel">60</label>
        <input id="game_clock_90" className="Modal-radioBtn" type="radio" name="game_clock" value="90" onChange={() => handleGameClock(90)} checked={gameClock === 90} />
        <label for="game_clock_90" className="Modal-radioLabel">90</label>
        <input id="game_clock_120" className="Modal-radioBtn" type="radio" name="game_clock" value="120" onChange={() => handleGameClock(120)} checked={gameClock === 120} />
        <label for="game_clock_120" className="Modal-radioLabel">120</label>
      </div>
      {!isIOS && (
        <>
          <div className="Modal-flexWrap">
            <label for="sound_effects" className="Modal-label">Enable Sound Effects:</label>
            <input id="sound_effects" className="Modal-checkBox" type="checkbox" onChange={handleSoundEffects} checked={enableSoundEffects} />
          </div>
        </>
      )}
    </Modal>
  )
}

export default SettingsModal;