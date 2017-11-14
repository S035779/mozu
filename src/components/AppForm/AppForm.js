import React from 'react';
import AppAction from '../../actions/AppAction';
import { log } from '../../../utils/webutils';

const pspid = `AppFormView`;

export default class AppForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = Object.assign({}, props.config);
  }

  handleChangeSave(e) {
    log.info(`${pspid}>`, 'Request: handleChangeSave');
    e.preventDefault();
    log.trace(`${pspid}>`, this.state);
    AppAction.writeConfig(this.state);
  }

  handleChangeText(name, e) {
    let newState = {};
    newState[name] = e.target.value;
    this.setState(newState);
  }

  render() {
    return <div className="pane">
    <form className="padded-less">
      <div className="form-group">
      <label>Application ID</label>
      <input type="text"
        className="form-control"
        placeholder="Application ID"
        value={this.state.appid}
        onChange={
          this.handleChangeText.bind(this, 'appid')} />
      </div>
      <div className="form-group">
      <label>Access Token</label>
      <textarea
        className="form-control"
        placeholder="Token"
        value={this.state.access_token}
        onChange={
          this.handleChangeText.bind(this, 'access_token')} />
      </div>
      <div className="form-group">
      <label>ID Token</label>
      <textarea
        className="form-control"
        placeholder="Token"
        value={this.state.id_token}
        onChange={
          this.handleChangeText.bind(this, 'id_token')} />
      </div>
      <div className="form-group">
      <label>Refresh Token / Code</label>
      <input type="text"
        className="form-control"
        placeholder="Token"
        value={this.state.refresh_token}
        onChange={
          this.handleChangeText.bind(this, 'refresh_token')} />
      </div>
      <div className="form-group">
      <label>Expires Time</label>
      <input type="text"
        className="form-control"
        placeholder="second"
        value={this.state.expires_in}
        onChange={
          this.handleChangeText.bind(this, 'expires_in')} />
      </div>
      <div className="form-group">
      <label>Find API URL</label>
      <input type="text"
        className="form-control"
        placeholder="URL"
        value={this.state.findApi}
        onChange={
          this.handleChangeText.bind(this, 'findApi')} />
      </div>
      <div className="form-group">
      <label>Item API URL</label>
      <input type="text"
        className="form-control"
        placeholder="URL"
        value={this.state.itemApi}
        onChange={
          this.handleChangeText.bind(this, 'itemApi')} />
      </div>
      <div className="form-group">
      <label>Bids API URL</label>
      <input type="text"
        className="form-control"
        placeholder="URL"
        value={this.state.bidsApi}
        onChange={
          this.handleChangeText.bind(this, 'bidsApi')} />
      </div>
      <div className="form-group">
      <label>Watch API v1 URL</label>
      <input type="text"
        className="form-control"
        placeholder="URL"
        value={this.state.watchApi1}
        onChange={
          this.handleChangeText.bind(this, 'watchApi1')} />
      </div>
      <div className="form-group">
      <label>Watch API v2 URL</label>
      <input type="text"
        className="form-control"
        placeholder="URL"
        value={this.state.watchApi2}
        onChange={
          this.handleChangeText.bind(this, 'watchApi2')} />
      </div>
      <div className="form-group">
      <label>Auth API URL</label>
      <input type="text"
        className="form-control"
        placeholder="URL"
        value={this.state.authApi}
        onChange={
          this.handleChangeText.bind(this, 'authApi')} />
      </div>
      <div className="form-actions">
      <button type="submit" 
        className="btn btn-large btn-form btn-primary"
        onClick={this.handleChangeSave.bind(this)}>Save
      </button>
      </div>
    </form>
    </div>;
  }
}

