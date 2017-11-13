import React from 'react';
import AvailableAction from '../../actions/AvailableAction';
import { log } from '../../../utils/webutils';

const pspid = `AvailableSidebarView`;

export default class AvailableSidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = Object.assign({}, props.options);
  }

  handleChangeHome(e) {
    log.info(`${pspid}> Request: handleChangeHome`);
    AvailableAction
      .incrementOpenWatch(this.props.options, 0);
  }

  handleIncrement(e) {
    log.info(`${pspid}> Request: handleIncrement`);
    AvailableAction
      .incrementOpenWatch(this.props.options, this.props.page);
  }

  handleDecrement(e) {
    log.info(`${pspid}> Request: handleDecrement`);
    AvailableAction
      .decrementOpenWatch(this.props.options, this.props.page);
  }

  render() {
    const page = this.props.page;
    const items = this.props.items ? this.props.items : null;
    return <div className="pane pane-sm sidebar">
    <nav className="nav-group">
      <h5 className="nav-group-title">Functions</h5>
      <span className="nav-group-item"
        onClick={this.handleChangeHome.bind(this)}>
        <span className="icon icon-home"></span>
        Home ({page} page)
      </span>
      <span className="nav-group-item"
        onClick={this.handleIncrement.bind(this)}>
        <span className="icon icon-right-bold"></span>
        Next
      </span>
      <span className="nav-group-item"
        onClick={this.handleDecrement.bind(this)}>
        <span className="icon icon-left-bold"></span>
        Previous
      </span>
    </nav>
    </div>;
  }
};
