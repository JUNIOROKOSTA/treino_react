import P from 'prop-types';
import { Component } from 'react';
import './styles.css';
export class Button extends Component {
  render() {
    const { text, eventClick, disabled = false } = this.props;
    return (
      <div className="button-container">
        <button onClick={eventClick} className="button-next" disabled={disabled}>
          {text}
        </button>
      </div>
    );
  }
}

Button.defaultProps = {
  disabled: false,
};

Button.propTypes = {
  text: P.string.isRequired,
  eventClick: P.func,
  disabled: P.bool,
};
