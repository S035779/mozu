import React from 'react';
import { Container } from 'flux/utils';
import ContainerConverter from '../../FluxContainerConverter';
import noteStore from '../../stores/noteStore';
import NoteBody from '../../components/NoteBody/NoteBody';
import { log } from '../../../utils/webutils';

const pspid = `NoteControlerView`;

class Note extends React.Component {
  static getStores() {
    return [noteStore];
  }

  static calculateState() {
    return noteStore.getState();
  }

  render() {
    return <NoteBody
      page={this.state.page}
      items={this.state.items}
      categorys={this.state.categorys}
      watch={this.state.watch}
      options={this.state.options} />;
  }
}
export default Container.create(ContainerConverter.convert(Note));

