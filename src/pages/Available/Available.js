import React from 'react';
import { Container } from 'flux/utils';
import ContainerConverter from '../../FluxContainerConverter';
import availableStore from '../../stores/availableStore';
import AvailableBody from '../../components/AvailableBody/AvailableBody';
import { log } from '../../../utils/webutils';

const pspid = `AvailableControlerView`;

class Available extends React.Component {
  static getStores() {
    return [availableStore];
  }

  static calculateState() {
    return availableStore.getState();
  }

  render() {
    return <AvailableBody
      page={this.state.page}
      items={this.state.items}
      options={this.state.options} />;
  }
}
export default Container.create(ContainerConverter.convert(Available));

