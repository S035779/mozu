import React from 'react';
import { Link } from 'react-router-dom';
import NoteAction from '../../actions/NoteAction';
import { log } from '../../../utils/webutils';

const pspid = `NoteHeaderView`;

export default class NoteHeader extends React.Component {
  handleChangeHome() {
    log.info(`${pspid}>`, 'Request: handleChangeHome');
    log.trace(`${pspid}>`, this.props.options);
    NoteAction.increment(this.props.options, 0);
  }

  handleIncrement() {
    log.info(`${pspid}>`, 'Request: handleIncrement');
    log.trace(`${pspid}>`, this.props.options);
    NoteAction.increment(this.props.options, this.props.page);
  }

  handleDecrement() {
    log.info(`${pspid}> Request: handleDecrement`);
    log.trace(`${pspid}>`, this.props.options);
    NoteAction.decrement(this.props.options, this.props.page);
  }

  render() {
    const page = this.props.page;
    return <header className="toolbar toolbar-header">
      <h1 className="title">WatchNote!</h1>
      <div className="toolbar-actions">
        <button
          className="btn btn-default"
          onClick={this.handleChangeHome.bind(this)}>
          <span className="icon icon-home icon-text"></span>
          {page} page
        </button>
        <div className="btn-group">
        <button
          className="btn btn-default"
          onClick={this.handleDecrement.bind(this)}>
          <span className="icon icon-left"></span>
        </button>
        <button 
          className="btn btn-default"
          onClick={this.handleIncrement.bind(this)}>
          <span className="icon icon-right"></span>
        </button>
        </div>
        <button
          className="btn btn-default btn-dropdown pull-right">
          <span className="icon icon-megaphone"></span>
        </button>
      </div>
    </header>;
  }
}
