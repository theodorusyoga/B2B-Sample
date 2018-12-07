import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Input } from 'reactstrap';

import '../styles/textbox.scss';

class Textbox extends React.Component {
  componentWillMount() {
    const { type, value } = this.props;
    this.setState({
      isActive: value !== '' && value !== undefined,
      isFocused: false,
      showPassword: false,
      textType: type
    });
  }

  componentWillReceiveProps(nextProps) {
    const { value } = this.props;
    if (nextProps.value !== value) {
      this.setState({
        isActive: nextProps.value !== '' && nextProps.value !== undefined
      });
    }
  }

  onKeyUp = (e) => {
    if (e.target.value !== '') {
      this.setState({
        isActive: true,
        isFocused: true
      });
    } else {
      this.setState({
        isActive: false,
        isFocused: false
      });
    }
  }

  onFocus = (e) => {
    if (e.target.value !== '') {
      this.setState({
        isActive: true,
        isFocused: true
      });
    }
  }

  onBlur= (e, callback) => {
    this.setState({
      isFocused: false
    });

    if (e.target.value === '') {
      this.setState({
        isActive: false
      });
    } else {
      this.setState({
        isActive: true
      });
    }

    if (callback !== undefined) {
      callback();
    }
  }

  onShowPassword = () => {
    const { showPassword } = this.state;
    this.setState({
      showPassword: !showPassword,
      textType: showPassword ? 'password' : 'text'
    });
  }

  render() {
    const {
      id, label, description, touched, error,
      autocomplete, maxlength, type, onBlur, onChange, name
    } = this.props;
    const originalType = type;
    const {
      showPassword, textType, isActive,
      isFocused
    } = this.state;
    return (
      <div className={`form-group position-relative custom${touched && error ? ' error' : ''}`}>
        <label
          className={`${(isActive ? 'active' : '')
          + (isFocused ? ' focused' : '')}`}
          htmlFor={id}
        >
          {label}
        </label>
        <Input
          id={id}
          name={name}
          className={`form-control${isActive ? ' active' : ''}`}
          type={textType}
          onBlur={onBlur}
          onChange={onChange}
          onKeyUp={this.onKeyUp}
          autoComplete={autocomplete || 'off'}
          maxLength={maxlength}
        />
        {
          originalType === 'password' ? (
            <div
              onClick={this.onShowPassword}
              className="show-password"
              role="presentation"
            >
              <div className="show-password-icon">
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} size="sm" />
              </div>
            </div>
          ) : ''
        }
        {
          touched && error !== undefined ? <span className="input-error">{error}</span> : ''
        }
        {
          description !== '' ? (
            <div className="description">
              {description}
            </div>
          ) : ''
        }
      </div>
    );
  }
}

Textbox.defaultProps = {
  value: undefined,
  type: 'text',
  description: '',
  autocomplete: undefined,
  maxlength: '',
  touched: false,
  error: '',
  onBlur: () => {},
  onChange: () => {}
};

Textbox.propTypes = {
  value: PropTypes.string,
  type: PropTypes.string,
  description: PropTypes.string,
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  autocomplete: PropTypes.string,
  maxlength: PropTypes.string,
  touched: PropTypes.bool,
  error: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func
};

export default Textbox;
