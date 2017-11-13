import React from 'react';
import { log } from '../../../utils/webutils';

const pspid = `LoginSidebarView`;

export default class LoginSidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = Object.assign({}, props.config);
  }

  render() {
    return <div className="pane pane-sm sidebar">
    <nav className="nav-group">
      <h5 className="nav-group-title">Application</h5>
      <span className="nav-group-item">
        <span className="icon icon-info"></span>
        Agreement
      </span>
    </nav>
    </div>;
  }
};
