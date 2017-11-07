import React from 'react';
import { Container } from 'flux/utils';
import ContainerConverter from '../../FluxContainerConverter';
import completedStore from '../../stores/completedStore';
import CompletedBody from '../../components/CompletedBody/CompletedBody';
import { log } from '../../../utils/webutils';

const pspid = `CompletedControlerView`;

class Completed extends React.Component {
  static getStores() {
    return [completedStore];
  }

  static calculateState() {
    return completedStore.getState();
  }

  render() {
    return <CompletedBody
      page={this.state.page}
      items={this.state.items}
      options={this.state.options} />;
  }
}
export default Container.create(ContainerConverter.convert(Completed));

