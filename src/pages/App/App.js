import React from 'react';
import { Container } from 'flux/utils';
import ContainerConverter from '../../FluxContainerConverter';
import appStore from '../../stores/appStore';
import GlobalHeader from '../../components/GlobalHeader/GlobalHeader';
import Note from '../../pages/Note/Note';
import { log } from '../../../utils/webutils';

class App extends React.Component {
  static getStores() {
    return [appStore];
  }

  static calculateState() {
    return appStore.getState();
  }

  render() {
    return <div>
      <GlobalHeader />
      <Note />
    </div>;
  }
}
export default Container.create(ContainerConverter.convert(App));
