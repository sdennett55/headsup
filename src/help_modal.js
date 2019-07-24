import React from "react";
import "./help_modal.scss";

class HelpModal extends React.Component {
  componentDidMount() {
    document.body.style.cssText = 'position: fixed; top: 0;left: 0;right: 0;overflow-y: scroll;';
  }
  componentWillUnmount() {
    document.body.style.cssText = '';
  }

  render() {
    return (
      <div className="HelpModal">
        <h2 className="HelpModal-title">Help</h2>
        <p className="HelpModal-subtitle">I can't advance past the first clue on my iphone/ipad?</p>
        <p className="HelpModal-copy">Open up settings on your device, go to "Safari" and make sure <span className="HelpModal-emphasis">"Motion &amp; Orientation Access" is toggled ON</span>. <em>Note: This might require you to restart your device in order for the setting to bake in.</em></p>
        <h2 className="HelpModal-subtitle">I can't advance past the "Place on Forehead" screen?</h2>
        <p className="HelpModal-copy">Make sure orientation lock on your device is OFF. If your device can't flip to landscape, the game cannot begin.</p>
        <h2 className="HelpModal-subtitle">Contact</h2>
        <p className="HelpModal-copy">For issues, feedback, inquiries or anything at all feel free to reach out at: <span className="HelpModal-emphasis">w<span>ai</span>tupga<span>me@</span>g<span>m</span>ail.com</span>!</p>
        <button className="HelpModal-closeBtn" onClick={this.props.handleHelpModal}>&times;</button>
      </div>
    );
  }
};

export default HelpModal;
