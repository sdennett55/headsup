import React, { Component } from "react";
import ReactNoSleep from 'react-no-sleep';
import { Link } from "react-router-dom";
import cx from "classnames";
import "./menu.scss";
import fire from './config/fire';

class Menu extends Component {
  state = {
    buttons: [],
    toggleCard: false
  };

  componentDidMount() {
    // Dynamically create state for each category
    const buttons = this.props.categories.map(cat => {
      return { name: cat.name, isActive: false, isLocked: cat.isLocked };
    });

    this.setState({ buttons: buttons });
  }

  logout = () => {
    fire.auth().signOut();
  }

  toggleBtn = cat => {
    const newBtnState = [...this.state.buttons];
    const currentBtn = newBtnState.findIndex(x => x.name === cat.name);
    newBtnState.forEach((x, i) =>
      i !== currentBtn ? (x.isActive = false) : (x.isActive = !x.isActive)
    );

    this.setState(prevState => ({
      buttons: newBtnState
    }));
  };

  getBackBtnText = cat => {
    if (cat.isLocked === 'TRUE') {
      return "Unlock!"
    } else if (cat.size === 0) {
      return "Empty";
    } else {
      return "Start";
    }
  }

  getCategoryURL = name => name.toLowerCase().trim().replace(/\s/g, '-');

  render() {
    const { getActiveCat, categories, user } = this.props;

    return (
      <div className="Menu">
        <h1 className="Menu-title">Wait Up!</h1>
        {user && user.email && <div className="">Welcome, {user.email}! <button onClick={this.logout}>Sign Out</button></div>}
        <div className="Menu-board">
          {this.state.buttons.length &&
            categories.map((cat, index) => (
              <div
                key={cat.name}
                className={cx("Menu-card", {
                  "is-flipped": this.state.buttons[index].isActive,
                  "is-locked": cat.isLocked === 'TRUE'
                })}
                onClick={() => {
                  this.toggleBtn(cat);
                }}
              >
                <div className="Menu-side Menu-side--back">
                  <p>{cat.description}</p>
                  <div className="Menu-side-btnWrap">
                  {cat.isLocked === 'TRUE' ? (
                    <Link
                      className="Menu-side-btn Menu-side-btn--go"
                      to={`/login/${this.getCategoryURL(cat.name)}`}
                    >
                      {this.getBackBtnText(cat)}
                    </Link>
                  ) : (
                    <ReactNoSleep>
                      {({enable, isOn}) => (
                        <button
                          className="Menu-side-btn Menu-side-btn--go"
                          onClick={() => {
                            getActiveCat({cat, enable, isOn, isLocked: cat.isLocked});
                          }}
                          disabled={cat.size === 0}
                        >
                          {this.getBackBtnText(cat)}
                        </button>
                      )}
                    </ReactNoSleep>
                  )}
                  </div>
                </div>
                <div
                  className={cx("Menu-side Menu-side--front", {
                    "is-disabled": cat.size === 0
                  })}
                >
                  {cat.name}
                  {cat.isLocked === 'TRUE' && (
                    <div className="Menu-side-saleFlag">
                      $0.99!
                    </div>
                  )}
                  <p className="Menu-info">{`${
                    cat.list.size
                  } cards left`}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  }
}

export default Menu;
