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
    log.trace(`${pspid}>`, this.props.config);
    e.preventDefault();
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
      <label>Application Key ID</label>
      <input type="text"
        className="form-control"
        placeholder="Key ID"
        value={this.state.appid}
        onChange={
          this.handleChangeText.bind(this, 'appid')} />
      </div>
      <div className="form-group">
      <label>User Token</label>
      <textarea
        className="form-control"
        placeholder="Token"
        value={this.state.token}
        onChange={
          this.handleChangeText.bind(this, 'token')} />
      </div>
      <div className="form-group">
      <label>Finding API URL</label>
      <input type="text"
        className="form-control"
        placeholder="URL"
        value={this.state.findingApi}
        onChange={
          this.handleChangeText.bind(this, 'findingApi')} />
      </div>
      <div className="form-group">
      <label>Trading API URL</label>
      <input type="text"
        className="form-control"
        placeholder="URL"
        value={this.state.tradingApi}
        onChange={
          this.handleChangeText.bind(this, 'tradingApi')} />
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

