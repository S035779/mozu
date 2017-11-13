import React from 'react';
import { log } from '../../../utils/webutils';

const pspid = `LoginFormView`;

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = Object.assign({}, props.login);
  }

  handleChangeConfirm(e) {
    log.info(`${pspid}>`, 'Request: handleChangeConfirm');
    e.preventDefault();
    this.props.onChangeConfirm(this.state);
  }

  handleChangeReset() {
    log.info(`${pspid}> Request: handleChangeReset`);
    this.setState({ agree: false });
  }

  handleChangeCheckbox(name, e) {
    let newState = {};
    newState[name] = e.target.checked;
    this.setState(newState);
  }

  render() {
    const from = this.props.from;
    return <div className="pane">
      <div id="contents" className="sign-up-page">
        <h2 id="page-title">Welcome</h2>
        <p>Welcome to WatchNote!<br />
        This page provides Yahoo! Auction application.
        You must log in to view the page at {from.pathname}.</p>
        <div id="user-sign-up">
        <div id="signup-agreement">
          <label><span className="required-mark">required</span> Agree to our terms of us and privacy policy. <input type="checkbox" name="agreement" id="agreement" onClick={this.handleChangeCheckbox.bind(this, 'agree')} />
          </label>
        </div>
        </div>
      </div>
      <form className="padded-less">
        <div className="form-actions">
        <button type="submit" className="btn btn-form btn-default btn-large"
          onClick={this.handleChangeReset.bind(this)}
        >Reset</button>
        <button type="submit" className="btn btn-form btn-positive pull-right btn-large"
          onClick={this.handleChangeConfirm.bind(this)}
        >Confirme</button>
        </div>
      </form>
    </div>;
  }
}

