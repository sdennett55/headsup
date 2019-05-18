import React, { Component } from "react";
import ReactNoSleep from 'react-no-sleep';
import cx from "classnames";
import "./menu.scss";

class Menu extends Component {
  state = {
    buttons: [],
    toggleCard: false
  };

  componentDidMount() {
    // Dynamically create state for each category
    const buttons = Object.keys(this.props.categories).map(cat => {
      return { name: cat, isActive: false };
    });

    this.setState({ buttons: buttons });
  }

  toggleBtn = cat => {
    const newBtnState = [...this.state.buttons];
    const currentBtn = newBtnState.findIndex(x => x.name === cat);
    newBtnState.forEach((x, i) =>
      i !== currentBtn ? (x.isActive = false) : (x.isActive = !x.isActive)
    );

    this.setState(prevState => ({
      buttons: newBtnState
    }));
  };

  render() {
    const { getActiveCat, categories } = this.props;

    return (
      <>
        <div className="Menu">
          <h1 className="Menu-title">Heads Up!</h1>
          <div className="Menu-board">
            {this.state.buttons.length &&
              Object.keys(categories).map((cat, index) => (
                <div
                  key={cat}
                  className={cx("Menu-card", {
                    "is-flipped": this.state.buttons[index].isActive
                  })}
                  onClick={() => {
                    this.toggleBtn(cat);
                  }}
                >
                  <div className="Menu-side Menu-side--back">
                    <p>About {cat} 'n stuff</p>
                    <div className="Menu-side-btnWrap">
                    <ReactNoSleep>
                      {({enable, isOn}) => (
                        <button
                          className="Menu-side-btn Menu-side-btn--go"
                          onClick={() => {
                            getActiveCat({cat, enable, isOn});
                          }}
                          disabled={categories[cat].size === 0}
                        >
                          {categories[cat].size === 0 ? "Empty" : "Start"}
                        </button>
                      )}
                    </ReactNoSleep>
                    </div>
                  </div>
                  <div
                    className={cx("Menu-side Menu-side--front", {
                      "is-disabled": categories[cat].size === 0
                    })}
                  >
                    {cat}{" "}
                    <p className="Menu-info">{`${
                      categories[cat].size
                    } items left`}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </>
    );
  }
}

export default Menu;
