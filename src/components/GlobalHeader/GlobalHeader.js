import React from 'react';
import { log } from '../../../utils/webutils';

const pspid = `GlobalHeaderView`;

export default class GlobalHeader extends React.Component {
  render() {
    const title = this.props.title;
    return <header className="toolbar toolbar-header">
      <h1 className="title">{title}</h1>
      <div className="toolbar-actions">
        <button
          className="btn btn-default btn-dropdown pull-right">
          <span className="icon icon-megaphone"></span>
        </button>
      </div>
    </header>;
  }
}
