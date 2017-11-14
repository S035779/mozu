import React from 'react';
import { Container } from 'flux/utils';
import ContainerConverter from '../../FluxContainerConverter';
import appStore from '../../stores/appStore';
import AppAction from '../../actions/AppAction';
import AppBody from '../../components/AppBody/AppBody';
import Note from '../../pages/Note/Note';
import Available from '../../pages/Available/Available';
import Completed from '../../pages/Completed/Completed';
import Tabs from '../../components/Tabs/Tabs';
import Contents from '../../components/Contents/Contents';
import GlobalHeader from '../../components/GlobalHeader/GlobalHeader';
import GlobalFooter from '../../components/GlobalFooter/GlobalFooter';
import { log } from '../../../utils/webutils';
import std from '../../../utils/stdutils';

const pspid = 'AppControlView';

class App extends React.Component {
  static getStores() {
    return [appStore];
  }

  static calculateState() {
    return appStore.getState();
  }

  componentWillMount() {
    const { history } = this.props;
    const hash = this.props.location.hash.split('#');
    const obj = std.decodeFormData(hash[1]);
    log.trace(`${pspid}>`, 'Tokens:', obj);
    if(obj && obj.hasOwnProperty('access_token')) {
      AppAction.fetchConfig(obj);
    } else {
      history.push('/login');
    }
  }

  handleChangeLogin() {
    const { history } = this.props;
      history.push('/login');
  }

  handleChangeTab(index, title) {
    AppAction.selectedContent(index, title);
  }

  render() {
    return <div className="window">
    <GlobalHeader title={this.state.title} />
    <Tabs selected={this.state.selected}
      onChangeTab={this.handleChangeTab.bind(this)}>
      <span label="Search of items"></span>
      <span label="Available watch items"></span>
      <span label="Completed watch items"></span>
      <span label="Preference"></span>
    </Tabs>
    <Contents selected={this.state.selected}>
      <Note />
      <Available />
      <Completed />
      <AppBody config={this.state.config}/>
    </Contents>
    <GlobalFooter
      onChangeLogin={this.handleChangeLogin.bind(this)} />
    </div>;
  }
}
export default Container.create(ContainerConverter.convert(App));
