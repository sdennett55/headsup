import React from "react";
import cx from 'classnames';
import "./modal.scss";

class Modal extends React.Component {
  componentDidMount() {
    document.body.style.cssText = 'position: fixed; top: 0;left: 0;right: 0;overflow-y: scroll;';
  }
  componentWillUnmount() {
    document.body.style.cssText = '';
  }

  render() {
    return (
      <div className="Modal">
        {this.props.children}
        <button className={cx('Modal-closeBtn', {
          'Modal-closeBtn--right': this.props.closeBtnRight
        })} onClick={this.props.handleModalClose}>&times;</button>
      </div>
    );
  }
};

export default Modal;
