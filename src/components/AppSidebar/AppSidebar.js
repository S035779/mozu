import React from 'react';
import AppAction from '../../actions/AppAction';
import { log } from '../../../utils/webutils';

const pspid = `AppSidebarView`;

export default class AppSidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = Object.assign({}, props.config);
  }

  render() {
    return <div className="pane pane-sm sidebar">
    <nav className="nav-group">
      <h5 className="nav-group-title">My account</h5>
      <span className="nav-group-item">
        <span className="icon icon-key"></span>
        Application keyset
      </span>
    </nav>
    </div>;
  }
};
