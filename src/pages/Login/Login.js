import React from 'react';
import { Container } from 'flux/utils';
import ContainerConverter from '../../FluxContainerConverter';
import loginStore from '../../stores/loginStore';
import LoginAction from '../../actions/LoginAction';
import LoginBody from '../../components/LoginBody/LoginBody';
import Tabs from '../../components/Tabs/Tabs';
import Contents from '../../components/Contents/Contents';
import GlobalHeader from '../../components/GlobalHeader/GlobalHeader';
import GlobalFooter from '../../components/GlobalFooter/GlobalFooter';
import { log } from '../../../utils/webutils';
import std from '../../../utils/stdutils';

const authApi = process.env.auth;
const AppID = process.env.app_id;
const AppURL = process.env.app_url;

const fakeAuth = {
  isAuthenticated: false,
  authenticate(callback) {
    this.isAuthenticated = true;
    const options = new Object();
    options['response_type'] = 'token';
    options['client_id'] = AppID;
    options['redirect_uri'] = AppURL;
    options['bail'] = 1;
    options['scope'] = 'openid';
    options['state'] = std.makeRandStr(8);
    //options['nonce'] = std.makeRandStr(8);
    options['display'] = 'page';
    options['prompt'] = 'none';
    options['max_age'] = 3600;
    const uri = authApi + '?' + std.encodeFormData(options);
    window.location.assign(uri);
    callback('Login!!');
  },
  signout(callback) {
    this.isAuthenticated = false;
    callback('Logout!');
  }
};

class Login extends React.Component {
  static getStores() {
    return [loginStore];
  }

  static calculateState() {
    return loginStore.getState();
  }

  handleChangeLogin() {
    const { history } = this.props;
    history.push('/login');
  }

  handleChangeTab(index, title) {
    LoginAction.selectedContent(index, title);
  }

  handleChangeConfirm(obj) {
    if(obj.agree) fakeAuth.authenticate(state =>
      log.info(``, 'Auth:', state));
  }

  render() {
    const { from } = this.props.location.state ||
      { from: { pathname: '/' } };
    return <div className="window">
      <GlobalHeader title={this.state.title} />
      <Tabs selected={this.state.selected}
        onChangeTab={this.handleChangeTab.bind(this)}>
        <span label="Welcome"></span>
      </Tabs>
      <Contents selected={this.state.selected}>
        <LoginBody from={from} onChangeConfirm={
          this.handleChangeConfirm.bind(this)
        }/>
      </Contents>
      <GlobalFooter
        onChangeLogin={this.handleChangeLogin.bind(this)}/>
      </div>;
  }
};
export default Container.create(ContainerConverter.convert(Login));
