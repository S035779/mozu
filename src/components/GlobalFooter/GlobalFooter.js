import React from 'react';
import { log } from '../../../utils/webutils';

const pspid = `GlobalFooterView`;

export default class GlobalFooter extends React.Component {
  handleChangeLogin() {
    this.props.onChangeLogin();
  }

  render() {
    return <footer className="toolbar toolbar-footer">
      <div className="toolbar-actions">
      <button className="btn btn-primary pull-right"
        onClick={this.handleChangeLogin.bind(this)}
      >Login</button>
      </div>
    </footer>;
  }
};
