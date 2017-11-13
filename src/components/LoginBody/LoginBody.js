import React from 'react';
import LoginSidebar from '../../components/LoginSidebar/LoginSidebar';
import LoginForm from '../../components/LoginForm/LoginForm';
import { log } from '../../../utils/webutils';

const pspid = `LoginBodyView`;

export default class LoginBody extends React.Component {
  handleChangeConfirm(obj) {
    this.props.onChangeConfirm(obj);
  }

  render() {
    return <div className="pane-group">
      <LoginSidebar />
      <LoginForm
        from={this.props.from}
        onChangeConfirm={this.handleChangeConfirm.bind(this)}/>
    </div>;
  }
};
